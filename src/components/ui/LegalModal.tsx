import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Cookie } from 'lucide-react';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'terms' | 'privacy' | 'cookies' | null;
}

export const LegalModal = ({ isOpen, onClose, type }: LegalModalProps) => {
    const getContent = () => {
        switch (type) {
            case 'terms':
                return {
                    title: 'Terms of Service',
                    icon: <FileText className="text-indigo-600" />,
                    content: (
                        <div className="space-y-4 text-slate-600">
                            <p className="font-bold text-slate-900">1. Acceptance of Terms</p>
                            <p>By accessing and using the Havenx website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                            <p className="font-bold text-slate-900">2. Use License</p>
                            <p>Permission is granted to temporarily download one copy of the materials on Havenx's website for personal, non-commercial transitory viewing only.</p>
                            <p className="font-bold text-slate-900">3. Disclaimer</p>
                            <p>The materials on Havenx's website are provided on an 'as is' basis. Havenx makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
                        </div>
                    )
                };
            case 'privacy':
                return {
                    title: 'Privacy Policy',
                    icon: <Shield className="text-indigo-600" />,
                    content: (
                        <div className="space-y-4 text-slate-600">
                            <p className="font-bold text-slate-900">1. Information Collection</p>
                            <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
                            <p className="font-bold text-slate-900">2. Use of Information</p>
                            <p>We use the information we collect to provide, maintain, and improve our services, and to communicate with you about your account or our services.</p>
                            <p className="font-bold text-slate-900">3. Data Security</p>
                            <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.</p>
                        </div>
                    )
                };
            case 'cookies':
                return {
                    title: 'Cookie Settings',
                    icon: <Cookie className="text-indigo-600" />,
                    content: (
                        <div className="space-y-4 text-slate-600">
                            <p className="font-bold text-slate-900">1. What are Cookies?</p>
                            <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They help us make your experience better.</p>
                            <p className="font-bold text-slate-900">2. How We Use Cookies</p>
                            <p>We use cookies to understand how you use our site and to remember your preferences. This helps us provide a more personalized experience.</p>
                            <p className="font-bold text-slate-900">3. Managing Cookies</p>
                            <p>You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies through your browser settings.</p>
                        </div>
                    )
                };
            default:
                return null;
        }
    };

    const data = getContent();
    if (!data) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-white w-full max-w-2xl rounded-[2.5rem] relative shadow-2xl border border-white/20 flex flex-col overflow-hidden max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="px-8 pt-10 pb-6 border-b border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                                    {data.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">{data.title}</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                            {data.content}
                        </div>
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all active:scale-95"
                            >
                                Understood
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
