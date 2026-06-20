import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Hero3D } from './Hero3D';

export const Hero = () => {
    return (
        <section className="relative h-[760px] overflow-hidden lg:h-[700px]">

            {/* Main Rounded Background */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[92%] h-[640px] rounded-[34px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 z-0 lg:top-20 lg:w-[95%] lg:h-[520px] lg:rounded-[40px]" />

            {/* Accent Overlay */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[92%] h-[640px] rounded-[34px] bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-cyan-500/20 z-0 lg:top-20 lg:w-[95%] lg:h-[520px] lg:rounded-[40px]" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-40">
                <div className="grid h-[760px] grid-rows-[auto_1fr] items-start gap-4 px-2 pt-32 lg:h-[700px] lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-12 lg:px-0 lg:pt-0 xl:gap-20">

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <div className="mb-4 lg:mb-6">
                            <p className="text-indigo-400 font-bold tracking-[0.18em] text-xs uppercase lg:text-sm lg:tracking-[0.2em]">
                                City Architects & Planning
                            </p>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-5 leading-[1.08] lg:mb-6 lg:leading-[1.1]">
                            Crafting <br />
                            Visionary Spaces
                        </h1>

                        <p className="text-sm text-slate-300 mb-8 leading-relaxed max-w-lg sm:text-base lg:mb-10">
                            A multidisciplinary practice shaping residential,
                            commercial, institutional, industrial, and urban
                            planning projects across India.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="#contact">
                                <Button className="w-full rounded-full bg-indigo-600 text-white hover:bg-indigo-700 px-8 h-14 text-sm shadow-2xl shadow-indigo-600/50 sm:w-auto sm:px-12 sm:text-base">
                                    Discuss a Project
                                </Button>
                            </a>

                            <a href="#projects">
                                <Button
                                    variant="outline"
                                    className="w-full rounded-full border-2 border-slate-400 text-white hover:bg-white/10 px-8 h-14 text-sm sm:w-auto sm:px-12 sm:text-base"
                                >
                                    View Projects
                                </Button>
                            </a>
                        </div>
                    </motion.div>

                    {/* 3D Model */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 0.9, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex h-[220px] items-end justify-center overflow-hidden lg:h-auto lg:items-center lg:justify-center lg:-ml-[20vh] lg:mt-[8vh] lg:overflow-visible"
                    >
                        <Hero3D />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
