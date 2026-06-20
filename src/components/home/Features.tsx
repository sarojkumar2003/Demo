import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import featureImg from '../../assets/Images/8.png';

const features = [
    "Sustainable & Eco-friendly Designs",
    "Smart Home Technology Integration",
    "3D Visualization & VR Tours",
    "End-to-End Project Management",
    "Award-winning Design Team"
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200">
                            <img
                                src={featureImg}
                                alt="Modern home exterior with car"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Box behind */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-orange-50/50 rounded-[2.5rem]" />
                    </motion.div>

                    <div className="order-1 lg:order-2">
                        <span className="text-indigo-600 font-medium tracking-wide uppercase text-sm">Why Choose Us</span>
                        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Crafting <br />
                            Visionary Spaces
                        </h2>

                        <div className="space-y-4">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mt-0.5">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                    <p className="text-slate-700 text-lg">{feature}</p>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold shadow-xl shadow-slate-900/10 hover:bg-slate-800 transition-colors"
                        >
                            Start Your Project
                        </motion.button>
                    </div>

                </div>
            </div>
        </section>
    );
};
