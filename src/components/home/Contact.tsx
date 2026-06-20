import { Mail, MapPin, Phone } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <span className="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                    Let's Plan <br className="hidden md:block" /> Your Next <span className="text-indigo-500">Project.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
                    Reach City Architects & Planning in New Delhi for architecture, planning, interiors, engineering, and project-management consultancy.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-indigo-500/30">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <MapPin size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Visit Us</h4>
                        <p className="text-slate-400 leading-relaxed">H. No. 25/A, Ground Floor<br />G. No. 9, Gagan Vihar, Mithapur<br />Badarpur, New Delhi - 110044</p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-indigo-500/30">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Mail size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Email Us</h4>
                        <p className="text-slate-400 leading-relaxed">sharmaraushan685@gmail.com<br /></p>
                    </div>

                    <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors group cursor-pointer border border-white/5 hover:border-indigo-500/30">
                        <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-indigo-400 mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/20">
                            <Phone size={28} />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Call Us</h4>
                        <p className="text-slate-400 leading-relaxed">+91-9818381406<br />+91-9540666691</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
