export interface QuizSubmission {
    timestamp: string;
    name: string;
    whatsapp: string;
    quizId: string;
    answers: Record<number, number>; // questionId: points
    score: number;
    percentage: number;
    resultStatus: string;
}

// URL do Web App do Google Apps Script (será substituída pelo usuário)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyC_WPh6rY9yRH_06M3a94WCMZRqMMmo4iVgnh6gTf4OQKxDyj3pOAu1UK9XOf7xzN_/exec';

export const saveQuizResult = async (data: QuizSubmission): Promise<boolean> => {
    try {
        // Usamos 'no-cors' para evitar problemas de CORS com Google scripts, 
        // mas isso significa que não podemos ler a resposta. 
        // Assumimos sucesso se não der erro de rede.
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return true;
    } catch (error) {
        console.error('Error saving to sheets:', error);
        return false;
    }
};
