import { useState } from 'react';
import { Button } from '../ui/Button';
import { TeamTree } from './TeamTree';
import { FounderStory } from './FounderStory';
import aboutImg from '../../assets/Images/9.png';

export const About = () => {
    const [isTeamOpen, setIsTeamOpen] = useState(false);
    const [isStoryOpen, setIsStoryOpen] = useState(false);
    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="relative h-[360px] sm:h-[420px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
                            <img
                                src={aboutImg}
                                alt="Architectural Studio"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-slate-100 rounded-full -z-10 hidden lg:block" />

                        {/* Stats card highlight */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-2.75rem] bg-white p-6 rounded-[2rem] shadow-xl max-w-xs border border-slate-100 lg:left-auto lg:translate-x-0 lg:bottom-[-1.5rem] lg:-right-6 lg:p-8">
                            <p className="text-5xl font-bold text-indigo-600 mb-2">2019</p>
                            <p className="text-slate-600 font-medium text-lg">Founded with a vision to rethink structure and planning in India.</p>
                        </div>
                    </div>

                    <div className="max-w-xl mx-auto lg:mx-0 order-1 lg:order-2">
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-4 block">Who We Are</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                            City Architects & Planning
                        </h2>
                        <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                            <p>
                                City Architects & Planning is a multidisciplinary design practice dedicated to sustainable, functional, and aesthetically inspiring built environments.
                            </p>
                            <p>
                                Our work spans architecture, urban design, town planning, structural and civil engineering, MEP coordination, interiors, estimating, and project management.
                            </p>
                            <p>
                                Every project responds to its cultural, social, and environmental context while staying practical, collaborative, and future-ready.
                            </p>
                        </div>

                        <div className="mt-10 flex gap-4">
                            <Button
                                onClick={() => setIsStoryOpen(true)}
                                className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 text-base shadow-lg shadow-slate-900/20 active:scale-95 transition-all"
                            >
                                Read Our Story
                            </Button>
                            <Button
                                variant="outline"
                                className="rounded-full px-8 h-12 text-base border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
                                onClick={() => setIsTeamOpen(true)}
                            >
                                View Team
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <TeamTree isOpen={isTeamOpen} onClose={() => setIsTeamOpen(false)} />
            <FounderStory isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
        </section>
    );
};
