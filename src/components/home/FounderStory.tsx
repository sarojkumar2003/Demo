import { motion, AnimatePresence } from 'framer-motion';
import { X, Quote, Calendar, Award } from 'lucide-react';

export const FounderStory = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        className="bg-white w-full max-w-6xl h-[90vh] md:h-[80vh] rounded-[3rem] relative shadow-2xl overflow-hidden flex flex-col md:flex-row"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 md:top-10 md:right-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all text-slate-900 z-50 border border-slate-100 active:scale-90"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="md:w-5/12 h-64 md:h-full relative overflow-hidden bg-slate-100">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                alt="Alexander Haven - Founder"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 font-sans"
                            />
                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-900/80 to-transparent text-white">
                                <h3 className="text-3xl font-bold">Alexander Haven</h3>
                                <p className="text-indigo-300 font-medium">Principal Architect & Founder</p>
                            </div>
                        </div>

                        {/* Text Section */}
                        <div className="md:w-7/12 h-full overflow-y-auto no-scrollbar p-8 md:p-20 flex flex-col pt-16 md:pt-24">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8">
                                    <Quote size={28} />
                                </div>
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                                    Building the <span className="text-indigo-600">Future</span> <br />
                                    Legacy of Design.
                                </h2>

                                <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
                                    <p>
                                        My journey began with a simple sketch and a profound belief: that the spaces we inhabit define the lives we lead. For two decades, I've dedicated my craft to merging sculptural art with functional precision.
                                    </p>
                                    <p>
                                        Architecture isn't just about steel and concrete; it's about the light that hits a wall at dawn, the way a corridor breathes, and the silent conversation between a structure and its environment.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Founded</p>
                                            <p className="text-slate-900 font-bold">2009 in NY</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                            <Award size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Recognition</p>
                                            <p className="text-slate-900 font-bold">Pritzker Nominee</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
