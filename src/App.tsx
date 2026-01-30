import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { QuizPage } from './pages/QuizPage';

function App() {
  return (
    <QuizProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/quiz/aula-1" replace />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/quiz/aula-1" replace />} />
        </Routes>
      </BrowserRouter>
    </QuizProvider>
  );
}

export default App;
