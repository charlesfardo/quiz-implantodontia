import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { quizzes } from '../data/quizzes';
import type { Quiz, QuizId, ResultRange } from '../data/quizzes';
import { saveQuizResult } from '../services/googleSheets';

interface UserData {
    name: string;
    whatsapp: string;
}

type QuizStep = 'intro' | 'menu' | 'question' | 'result';

interface QuizContextType {
    quizId: QuizId | null;
    quiz: Quiz | null;
    step: QuizStep;
    currentQuestionIndex: number;
    user: UserData;
    answers: Record<number, number>; // questionId -> points
    score: number;
    result: ResultRange | null;
    // Actions
    initQuiz: (id: QuizId) => void;
    setUserData: (data: UserData) => void;
    answerQuestion: (questionId: number, points: number) => void;
    nextQuestion: () => void;
    restartQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [quizId, setQuizId] = useState<QuizId | null>(null);
    const [step, setStep] = useState<QuizStep>('intro');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Initialize user from localStorage to persist session
    const [user, setUser] = useState<UserData>(() => {
        const saved = localStorage.getItem('quiz_user');
        return saved ? JSON.parse(saved) : { name: '', whatsapp: '' };
    });

    // Persist user changes
    useEffect(() => {
        localStorage.setItem('quiz_user', JSON.stringify(user));
    }, [user]);

    const [answers, setAnswers] = useState<Record<number, number>>({});

    const quiz = quizId ? quizzes[quizId] : null;

    const score = Object.values(answers).reduce((acc, curr) => acc + curr, 0);

    const getResult = (): ResultRange | null => {
        if (!quiz) return null;
        return quiz.results.find(r => score >= r.min && score <= r.max) || quiz.results[0];
    };

    const initQuiz = (id: QuizId) => {
        setQuizId(id);
        // Se já tiver usuário, vai direto pro menu, senão intro
        if (user.name && user.whatsapp) {
            setStep('menu');
        } else {
            setStep('intro');
        }
        setCurrentQuestionIndex(0);
        setAnswers({});
    };

    const answerQuestion = (questionId: number, points: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: points }));
    };

    const nextQuestion = () => {
        if (!quiz) return;

        if (step === 'intro') {
            setStep('menu');
            return;
        }

        if (step === 'menu') {
            setStep('question');
            return;
        }

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    const restartQuiz = () => {
        setStep('intro');
        setCurrentQuestionIndex(0);
        setAnswers({});
    };

    // Effect para salvar quando entrar no step 'result'
    useEffect(() => {
        if (step === 'result' && quiz && user.name) {
            const currentScore = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
            const currentResult = quiz.results.find(r => currentScore >= r.min && currentScore <= r.max) || quiz.results[0];

            saveQuizResult({
                timestamp: new Date().toISOString(),
                name: user.name,
                whatsapp: user.whatsapp,
                quizId: quiz.id,
                answers: answers,
                score: currentScore,
                percentage: Math.round((currentScore / 18) * 100),
                resultStatus: currentResult.status
            });
        }
    }, [step]); // Executa apenas quando step muda para result. Removemos deps desnecessárias para evitar multiplos envios se user/answers não mudarem.

    const value = {
        quizId,
        quiz,
        step,
        currentQuestionIndex,
        user,
        answers,
        score,
        result: step === 'result' ? getResult() : null,
        initQuiz,
        setUserData: setUser,
        answerQuestion,
        nextQuestion,
        restartQuiz
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within a QuizProvider');
    }
    return context;
};
