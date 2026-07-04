import { useState } from 'react';
import { LegalModal } from '../ui/LegalModal';
import logo from '../../assets/Images/logo.png';

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
                        <a href="#" className="flex items-center gap-3 mb-4" aria-label="City Architects & Planning home">
                            <img
                                src={logo}
                                alt="City Architects & Planning logo"
                                className="w-14 h-14 rounded-xl object-contain shadow-lg shadow-slate-900/10"
                            />
                            <span className="font-bold text-xl text-slate-900 tracking-tight">City Architects & Planning</span>
                        </a>
                        <p className="text-slate-500 max-w-sm mb-6">
                            Multidisciplinary architecture, planning, interiors, engineering, and project-management consultancy based in New Delhi.
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
                            <li><a href="#services" className="hover:text-indigo-600 transition-colors">Architecture</a></li>
                            <li><a href="#services" className="hover:text-indigo-600 transition-colors">Town Planning</a></li>
                            <li><a href="#services" className="hover:text-indigo-600 transition-colors">Interior Design</a></li>
                            <li><a href="#services" className="hover:text-indigo-600 transition-colors">Project Management</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li><a href="#about" className="hover:text-indigo-600 transition-colors">About</a></li>
                            <li><a href="#process" className="hover:text-indigo-600 transition-colors">Process</a></li>
                            <li><a href="#projects" className="hover:text-indigo-600 transition-colors">Projects</a></li>
                            <li><a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-4">Registered Office</h4>
                        <ul className="space-y-3 text-slate-600">
                            <li>H. No. 25/A, Gagan Vihar</li>
                            <li>Mithapur, Badarpur</li>
                            <li>New Delhi - 110044</li>
                            <li>+91-9818381406</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2026 City Architects & Planning. All rights reserved.</p>
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
