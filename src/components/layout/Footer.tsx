import { useState } from 'react';
import { LegalModal } from '../ui/LegalModal';

export const Footer = () => {
    const [legalType, setLegalType] = useState<'terms' | 'privacy' | 'cookies' | null>(null);

    const openLegal = (e: React.MouseEvent, type: 'terms' | 'privacy' | 'cookies') => {
        e.preventDefault();
        setLegalType(type);
    };

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                                {/* Reusing the logo logic from Header manually or could import if it was a component, for now simple text/icon placeholder */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rocket text-white"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
                            </div>
                            <span className="font-bold text-xl text-slate-900 tracking-tight">Havenx</span>
                        </div>
                        <p className="text-slate-500 max-w-sm mb-6">
                            Designing sustainable and innovative spaces for tomorrow. Join our journey to redefine architecture.
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer text-slate-500">
                                <span className="font-bold">fb</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer text-slate-500">
                                <span className="font-bold">in</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors cursor-pointer text-slate-500">
                                <span className="font-bold">tw</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Expertise</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Residential</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Commercial</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Urban Planning</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Interior</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
                            <li><a href="#" onClick={(e) => openLegal(e, 'terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                            <li><a href="#" onClick={(e) => openLegal(e, 'privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Status</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 Havenx Inc. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" onClick={(e) => openLegal(e, 'privacy')} className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                        <a href="#" onClick={(e) => openLegal(e, 'terms')} className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                        <a href="#" onClick={(e) => openLegal(e, 'cookies')} className="hover:text-indigo-600 transition-colors">Cookie Settings</a>
                    </div>
                </div>
            </div>

            <LegalModal
                isOpen={legalType !== null}
                onClose={() => setLegalType(null)}
                type={legalType}
            />
        </footer>
    );
};
