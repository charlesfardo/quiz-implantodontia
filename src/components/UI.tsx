import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

// --- BUTTON ---
interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'whatsapp';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyle = "font-heading font-bold uppercase tracking-wide py-4 px-8 rounded-xl transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-gradient-to-r from-primary to-[#FBBF24] text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
        secondary: "bg-secondary text-white hover:bg-[#134b61] shadow-lg shadow-secondary/20",
        outline: "border-2 border-primary/50 text-primary hover:bg-primary hover:text-white backdrop-blur-sm",
        whatsapp: "bg-[#25D366] text-white hover:bg-[#1da851] shadow-lg shadow-[#25D366]/20"
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyle} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

// --- INPUT ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', ...props }) => {
    return (
        <div className="w-full mb-5">
            {label && <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">{label}</label>}
            <div className="relative group">
                <input
                    className={`w-full bg-[#121212] border border-gray-800 text-white rounded-xl px-5 py-4 focus:border-primary focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all placeholder:text-gray-600 ${className}`}
                    {...props}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500 blur-md -z-10" />
            </div>
        </div>
    );
};

// --- CARD ---
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`glass-card rounded-2xl p-6 md:p-10 ${className}`}
        >
            {children}
        </motion.div>
    );
};

// --- PROGRESS BAR ---
export const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
    const progress = ((current) / total) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                <span>Progresso</span>
                <span className="text-primary">{current} / {total}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <motion.div
                    className="bg-gradient-to-r from-primary to-[#FBBF24] h-full rounded-full shadow-[0_0_10px_rgba(247,147,30,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

// --- LAYOUT ---
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Global Header */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/50 border-b border-white/5">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div>
                        <div className="mb-1">
                            <span className="bg-white/10 text-white/90 text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider border border-white/10">
                                Exclusivo para Implantodontistas
                            </span>
                        </div>
                        <h1 className="text-white font-bold text-xs md:text-sm uppercase tracking-wider">O Novo Plano da Implantodontia</h1>
                        <p className="text-primary text-[10px] md:text-xs font-medium">02 a 08 de Fev • Sempre às 20h</p>
                    </div>
                    <Button
                        variant="outline"
                        className="!py-2 !px-4 !text-xs !font-bold whitespace-nowrap"
                        onClick={() => window.open('https://hi.switchy.io/n-ks', '_blank')}
                    >
                        INSCRIÇÃO GRATUITA
                    </Button>
                </div>
            </header>

            <div className="flex-1 flex items-center justify-center p-4 md:p-6">
                <div className="w-full max-w-lg relative">
                    {/* Glow effect background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[120px] rounded-full -z-10" />
                    {children}
                </div>
            </div>
        </div>
    );
};
