import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import type { QuizId } from '../data/quizzes';
import { Button, Input, Card, Layout, ProgressBar } from '../components/UI';
import { CheckCircle, AlertTriangle, Share2, Lock, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuizPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { quiz, step, initQuiz } = useQuiz();

    useEffect(() => {
        if (id) {
            const map: Record<string, QuizId> = {
                'aula-1': 'quiz-1',
                'aula-2': 'quiz-2',
                'aula-3': 'quiz-3',
                'diagnostico-1': 'quiz-1',
                'diagnostico-2': 'quiz-2',
                'diagnostico-3': 'quiz-3',
            };

            const quizId = map[id];
            if (quizId) {
                initQuiz(quizId);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!quiz) return <div className="text-white text-center p-10 font-bold animate-pulse">Carregando quiz...</div>;

    return (
        <Layout>
            <div className="w-full pb-32">
                <div className="text-center mb-8">
                    <h1 className="text-primary text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-3 animate-pulse">
                        O Novo Plano da Implantodontia
                    </h1>
                    <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg p-2">
                        {quiz.title}
                    </h2>
                </div>

                <Card>
                    <AnimatePresence mode="wait">
                        {step === 'intro' && <IntroStep key="intro" />}
                        {step === 'menu' && <MenuStep key="menu" />}
                        {step === 'question' && <QuestionStep key="question" />}
                        {step === 'result' && <ResultStep key="result" />}
                    </AnimatePresence>
                </Card>

                <div className="text-center mt-8 space-y-2">
                    <p className="text-xs text-gray-500 font-medium">
                        🔒 Seus dados estão 100% seguros
                    </p>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto rounded-full" />
                </div>
            </div>

            {/* FooterSchedule: Visual only, clean & modern */}
            <FooterSchedule />
        </Layout>
    );
};

const IntroStep: React.FC = () => {
    const { quiz, setUserData, nextQuestion } = useQuiz();
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && phone.length >= 10) {
            setUserData({ name, whatsapp: phone });
            nextQuestion();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
        >
            <div className="text-center">
                <p className="text-gray-300 text-lg font-light leading-relaxed">{quiz?.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                    label="Nome Completo"
                    placeholder="Ex: Dr. João Silva"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Input
                    label="WhatsApp"
                    placeholder="(00) 00000-0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    type="tel"
                    required
                />
                <Button fullWidth type="submit" className="mt-4">
                    Iniciar Diagnóstico
                </Button>
            </form>
        </motion.div>
    );
};

const MenuStep: React.FC = () => {
    const { nextQuestion, quiz } = useQuiz();
    const [lockedMessage, setLockedMessage] = React.useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
        >
            <div className="text-center mb-6">
                <h3 className="text-white text-lg font-bold">Diagnóstico Liberado</h3>
                <p className="text-gray-400 text-sm">Complete o Passo 1 para desbloquear os próximos.</p>
            </div>

            {/* Quiz 1 */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border rounded-xl p-5 cursor-pointer shadow-[0_0_15px_rgba(247,147,30,0.15)] group transition-all ${quiz?.id === 'quiz-1' ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-primary/50' : 'bg-white/5 border-white/10 hover:border-primary/30'}`}
                onClick={() => quiz?.id === 'quiz-1' ? nextQuestion() : window.location.href = '/aula-1'}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${quiz?.id === 'quiz-1' ? 'text-primary' : 'text-gray-400'}`}>Passo 01 • Disponível</span>
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Diagnóstico de Dependência</h4>
                <p className="text-gray-400 text-xs mb-4">Descubra o que te impede de ver outras opções além do enxerto.</p>
                <Button fullWidth variant="primary" className="py-3 text-sm">
                    {quiz?.id === 'quiz-1' ? 'INICIAR AGORA' : 'ACESSAR'}
                </Button>
            </motion.div>

            {/* Quiz 2 */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border rounded-xl p-5 cursor-pointer shadow-[0_0_15px_rgba(247,147,30,0.15)] group transition-all ${quiz?.id === 'quiz-2' ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-primary/50' : 'bg-white/5 border-white/10 hover:border-primary/30'}`}
                onClick={() => quiz?.id === 'quiz-2' ? nextQuestion() : window.location.href = '/aula-2'}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${quiz?.id === 'quiz-2' ? 'text-primary' : 'text-gray-400'}`}>Passo 02 • Disponível (Teste)</span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Mapa dos 3 Pilares</h4>
                <p className="text-gray-400 text-xs mb-4">Avalie a estrutura óssea e gengival com precisão.</p>
                <Button fullWidth variant="primary" className="py-3 text-sm">
                    {quiz?.id === 'quiz-2' ? 'INICIAR AGORA' : 'ACESSAR'}
                </Button>
            </motion.div>

            {/* Quiz 3 */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border rounded-xl p-5 cursor-pointer shadow-[0_0_15px_rgba(247,147,30,0.15)] group transition-all ${quiz?.id === 'quiz-3' ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-primary/50' : 'bg-white/5 border-white/10 hover:border-primary/30'}`}
                onClick={() => quiz?.id === 'quiz-3' ? nextQuestion() : window.location.href = '/aula-3'}
            >
                <div className="flex justify-between items-center mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${quiz?.id === 'quiz-3' ? 'text-primary' : 'text-gray-400'}`}>Passo 03 • Disponível (Teste)</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
                <h4 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">Termômetro dos 5 Erros</h4>
                <p className="text-gray-400 text-xs mb-4">Identifique falhas críticas no planejamento.</p>
                <Button fullWidth variant="primary" className="py-3 text-sm">
                    {quiz?.id === 'quiz-3' ? 'INICIAR AGORA' : 'ACESSAR'}
                </Button>
            </motion.div>

            {/* Locked Modal */}
            <AnimatePresence>
                {lockedMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setLockedMessage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-gray-900 border border-white/10 p-6 rounded-2xl max-w-sm w-full text-center shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setLockedMessage(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-white p-2"
                            >
                                ✕
                            </button>

                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                                <Lock size={24} />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">Acesso Restrito</h3>
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                {lockedMessage}
                            </p>
                            <Button fullWidth onClick={() => setLockedMessage(null)}>
                                Entendi
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const QuestionStep: React.FC = () => {
    const { quiz, currentQuestionIndex, answerQuestion, nextQuestion } = useQuiz();
    const question = quiz?.questions[currentQuestionIndex];

    if (!question) return null;

    const handleSelect = (points: number) => {
        answerQuestion(question.id, points);
        nextQuestion();
    };

    return (
        <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
        >
            <ProgressBar current={currentQuestionIndex + 1} total={quiz!.questions.length} />

            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
                {question.text}
            </h3>

            <div className="space-y-4">
                {question.options.map((opt, idx) => (
                    <motion.button
                        key={opt.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleSelect(opt.points)}
                        className="w-full text-left p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(247,147,30,0.3)] transition-all group flex items-start gap-4"
                    >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-500 group-hover:border-primary mt-0.5 transition-colors" />
                        <span className="text-gray-200 group-hover:text-white font-medium text-lg transition-colors">{opt.text}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

const ResultStep: React.FC = () => {
    const { result, score, quiz } = useQuiz();

    if (!result) return null;

    // Mapping colors and icons
    const getStatusStyle = () => {
        if (result.status.includes('Risco')) return { color: 'text-status-risk', bg: 'bg-status-risk', icon: <AlertTriangle size={64} className="text-status-risk drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" /> };
        if (result.status.includes('Desenvolvimento')) return { color: 'text-status-dev', bg: 'bg-status-dev', icon: <AlertTriangle size={64} className="text-status-dev drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" /> };
        return { color: 'text-status-ready', bg: 'bg-status-ready', icon: <CheckCircle size={64} className="text-status-ready drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> };
    };

    const style = getStatusStyle();
    const percentage = Math.round((score / 18) * 100);

    // Logic for next class reminder
    const getNextClassInfo = () => {
        if (!quiz) return { title: 'PRÓXIMA AULA', link: '#' };
        if (quiz.id === 'quiz-1') return { title: 'ATIVAR LEMBRETE AULA 02', link: 'https://www.youtube.com/playlist?list=PLD3Ug5RpISSxBVX0-nJZYTxFe-965qY7N' };
        if (quiz.id === 'quiz-2') return { title: 'ATIVAR LEMBRETE AULA 03', link: '#' };
        // Fallback for Quiz 3 or others
        return { title: 'ACESSAR COMUNIDADE', link: '#' };
    };

    const nextClass = getNextClassInfo();

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8"
        >
            <div className="flex justify-center mb-6 animate-bounce-slow">
                {style.icon}
            </div>

            <div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
                    Resultado Final: {percentage}%
                </h3>
                <h2 className={`text-3xl md:text-4xl font-black mb-6 ${style.color}`}>
                    {result.status}
                </h2>

                {/* Termômetro */}
                <div className="w-full bg-gray-800 h-6 rounded-full p-1 mb-8 shadow-inner">
                    <motion.div
                        className={`h-full rounded-full ${style.bg} shadow-lg`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                    />
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                    {result.description}
                </p>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <p className="text-xs text-gray-400 font-bold uppercase mb-2 tracking-wider">Próximo Passo Estratégico</p>
                <p className="text-primary font-bold text-lg">
                    {result.nextStep}
                </p>
            </div>

            <div className="pt-4 space-y-3">
                {/* Primary Button: Activate Reminder */}
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => window.open(nextClass.link, '_blank')}
                >
                    <span className="flex items-center justify-center gap-3">
                        <Share2 size={24} className="rotate-180" />
                        {nextClass.title}
                    </span>
                </Button>

                {/* Secondary Button: Replay Aula 01 */}
                <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.open('https://youtu.be/t8jj7yqAshM?si=BqEjlo6DEVq139A9', '_blank')}
                >
                    <span className="flex items-center justify-center gap-3">
                        <PlayCircle size={20} />
                        REPLAY AULA 1
                    </span>
                </Button>

                {/* Secondary Button: Official Group */}
                <Button
                    variant="whatsapp"
                    fullWidth
                    className="!bg-[#121212] !border !border-[#25D366] !text-[#25D366] hover:!bg-[#25D366] hover:!text-white"
                    onClick={() => window.open('https://sndflw.com/i/P8zAlkUCVgbHma2u7Tk2', '_blank')}
                >
                    <span className="flex items-center justify-center gap-3">
                        ENTRAR NO GRUPO OFICIAL
                    </span>
                </Button>

                <p className="text-gray-500 text-xs font-medium">
                    *Fique atento ao grupo para não perder nada.
                </p>
            </div>
        </motion.div>
    );
};

const FooterSchedule: React.FC = () => {
    const [status, setStatus] = React.useState([
        { label: 'AULA 01', date: '02/fev', time: '20H', release: new Date('2026-02-02T20:00:00-03:00'), unlocked: false },
        { label: 'AULA 02', date: '04/fev', time: '20H', release: new Date('2026-02-04T20:00:00-03:00'), unlocked: false },
        { label: 'AULA 03', date: '05/fev', time: '20H', release: new Date('2026-02-05T20:00:00-03:00'), unlocked: false },
        { label: 'AULA 04', date: '08/fev', time: '20H', release: new Date('2026-02-08T20:00:00-03:00'), unlocked: false },
    ]);

    React.useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            setStatus(prev => prev.map(item => ({
                ...item,
                unlocked: now >= item.release
            })));
        };

        checkTime();
        const interval = setInterval(checkTime, 60000); // Check every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-6 pointer-events-none flex justify-center">
            <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-full px-10 py-5 flex items-center gap-10 shadow-[0_0_30px_rgba(0,0,0,0.7)]">
                {status.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <span className={`text-[14px] font-bold tracking-widest mb-1 ${item.unlocked ? 'text-[#25D366]' : 'text-gray-500'}`}>
                            {item.label}
                        </span>

                        {item.unlocked ? (
                            <span className="text-[12px] font-bold uppercase tracking-wide text-[#25D366] animate-pulse drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]">
                                ● AULA LIBERADA
                            </span>
                        ) : (
                            <span className="text-[12px] font-medium uppercase tracking-wide text-gray-400">
                                {item.date} • {item.time}
                            </span>
                        )}

                        {/* Vertical Separator (except last) */}
                        {index < status.length - 1 && (
                            <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-[1px] h-4 bg-white/10 block" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


