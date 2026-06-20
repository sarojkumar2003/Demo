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
                    title: 'Terms & Conditions',
                    icon: <FileText className="text-indigo-600" />,
                    content: (
                        <div className="space-y-4 text-slate-600">
                            <p className="font-bold text-slate-900">1. Website Use</p>
                            <p>By using the City Architects & Planning website, you agree to use the information on this site for lawful, personal, and project-enquiry purposes only.</p>
                            <p className="font-bold text-slate-900">2. Project Information</p>
                            <p>Service descriptions, portfolio details, images, and project information are provided for general reference. Final scope, fees, timelines, deliverables, and responsibilities are confirmed only through a written agreement or proposal.</p>
                            <p className="font-bold text-slate-900">3. Intellectual Property</p>
                            <p>All website content, including text, layouts, project descriptions, drawings, design material, photographs, and graphics, belongs to City Architects & Planning or its respective rights holders. It may not be copied, reused, or distributed without permission.</p>
                            <p className="font-bold text-slate-900">4. Limitation of Liability</p>
                            <p>The website is maintained with care, but City Architects & Planning does not guarantee that all information is always complete, current, or error-free. The firm is not liable for decisions made solely from website content without direct consultation.</p>
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
                            <p>City Architects & Planning may collect details you voluntarily provide through phone, email, enquiry forms, or direct project communication, such as your name, contact details, project location, requirements, and related documents.</p>
                            <p className="font-bold text-slate-900">2. Use of Information</p>
                            <p>We use this information to respond to enquiries, understand project requirements, prepare proposals, coordinate services, maintain client communication, and improve our website and consultancy process.</p>
                            <p className="font-bold text-slate-900">3. Data Security</p>
                            <p>We take reasonable steps to protect personal and project information from unauthorized access, misuse, or disclosure. However, no online or electronic communication method can be guaranteed as completely secure.</p>
                            <p className="font-bold text-slate-900">4. Sharing of Information</p>
                            <p>Information may be shared with consultants, vendors, engineers, or project partners only when required for enquiry handling, proposal preparation, or project execution. We do not sell personal information.</p>
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
                            <p>Cookies are small text files stored by your browser when you visit a website. They help the site remember basic preferences and understand general usage.</p>
                            <p className="font-bold text-slate-900">2. How We Use Cookies</p>
                            <p>The City Architects & Planning website may use essential cookies for site functionality and analytics cookies to understand page performance, visitor flow, and content usefulness.</p>
                            <p className="font-bold text-slate-900">3. Managing Cookies</p>
                            <p>You can block, delete, or manage cookies through your browser settings. Some parts of the website may not work as smoothly if essential cookies are disabled.</p>
                            <p className="font-bold text-slate-900">4. Third-party Services</p>
                            <p>If analytics, maps, embedded media, or external links are used, those services may set their own cookies according to their respective policies.</p>
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
