import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Hero3D } from './Hero3D';

export const Hero = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">

            {/* Main Rounded Background */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[95%] h-[85vh] rounded-[40px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0" />

            {/* Accent Overlay */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[95%] h-[85vh] rounded-[40px] bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-cyan-500/20 z-0" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-40">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-20     items-center min-h-screen">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="mb-6">
                            <p className="text-indigo-400 font-bold tracking-[0.2em] text-sm uppercase">
                                Architecture & Design Studio
                            </p>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                            Crafting Visionary <br />
                            Spaces
                        </h1>

                        <p className="text-base text-slate-300 mb-10 leading-relaxed max-w-lg">
                            We merge artistic vision with structural precision to
                            create sustainable, modern environments that inspire
                            and endure.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact">
                                <Button className="rounded-full bg-indigo-600 text-white hover:bg-indigo-700 px-12 h-14 text-base shadow-2xl shadow-indigo-600/50">
                                    Start Your Project
                                </Button>
                            </a>

                            <a href="#projects">
                                <Button
                                    variant="outline"
                                    className="rounded-full border-2 border-slate-400 text-white hover:bg-white/10 px-12 h-14 text-base"
                                >
                                    See Our Work
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* 3D Model */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex items-center justify-center -mt-[20vh] min-h-[500px]"
                    >
                        <Hero3D />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};