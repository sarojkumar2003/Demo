import { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { Star, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '../ui/Card';

const projects = [
    {
        id: 1,
        image: "/project-1.png",
        title: "The Glass House",
        rating: 4.9,
        type: "Modern Villa",
        location: "Beverly Hills, CA",
        year: "2024",
        description: "A light-filled villa shaped around open-plan living, clean concrete lines, and warm evening views."
    },
    {
        id: 2,
        image: "/project-2.png",
        title: "Azure Horizon",
        rating: 4.8,
        type: "Residential Complex",
        location: "Miami, FL",
        year: "2023",
        description: "A coastal residential concept with layered balconies, soft glass reflections, and calm shared spaces."
    },
    {
        id: 3,
        image: "/project-3.png",
        title: "Urban Loft",
        rating: 4.9,
        type: "Interior Renovation",
        location: "New York, NY",
        year: "2024",
        description: "A compact city interior redesigned with custom storage, warm materials, and crisp architectural lighting."
    },
    {
        id: 4,
        image: "/hero-house-villa.png",
        title: "Forest Retreat",
        rating: 5.0,
        type: "Eco Sanctuary",
        location: "Portland, OR",
        year: "2025",
        description: "A quiet retreat that blends natural textures, deep overhangs, and sustainable planning into the landscape."
    },
    {
        id: 5,
        image: "/feature-house-v2.png",
        title: "Skyline Tower",
        rating: 4.7,
        type: "Commercial Hub",
        location: "Austin, TX",
        year: "2023",
        description: "A mixed-use tower focused on flexible workspaces, public movement, and a sharp urban presence."
    },
    {
        id: 6,
        image: "/project-1.png",
        title: "Desert Oasis",
        rating: 4.8,
        type: "Luxury Resort",
        location: "Phoenix, AZ",
        year: "2024",
        description: "A resort experience built around shaded courtyards, indoor-outdoor rooms, and sculptural desert forms."
    }
];

// 3D Tilt Card Component
const TiltProjectCard = ({ project, onClick }: { project: any, onClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const dragX = e.clientX - rect.left - width / 2;
        const dragY = e.clientY - rect.top - height / 2;
        x.set(dragX);
        y.set(dragY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
    const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

    return (
        <motion.div
            ref={ref}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-full"
        >
            <Card hoverEffect={false} className="group border-none shadow-lg shadow-slate-200/50 h-full flex flex-col bg-white overflow-hidden transform-gpu">
                <motion.div
                    className="relative h-72 overflow-hidden cursor-pointer"
                    layoutId={`image-container-${project.id}`}
                    onClick={onClick}
                    style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                >
                    <motion.img
                        layoutId={`image-${project.id}`}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-sm font-bold text-slate-800 z-10">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {project.rating}
                    </div>
                </motion.div>

                <div className="p-6 flex-1 flex flex-col" style={{ transform: "translateZ(30px)" }}>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{project.title}</h3>
                    <p className="text-slate-500 text-sm mb-6">{project.type} in {project.location}</p>

                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">Completion</span>
                            <span className="text-slate-900 font-bold text-lg">{project.year}</span>
                        </div>
                        <Button
                            variant="primary"
                            size="sm"
                            className="rounded-xl px-6"
                            onClick={onClick}
                        >
                            View Details
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export const Projects = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const selectedProject = projects.find(project => project.id === selectedId);

    return (
        <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Featured Portfolio</span>
                        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-slate-900">
                            Our Selected Works
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {projects.map((project) => (
                        <TiltProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => setSelectedId(project.id)}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        {/* Interactive Content */}
                        <motion.div
                            className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl"
                            layoutId={`image-container-${selectedProject.id}`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, rotateX: 10 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            exit={{ scale: 0.9, rotateX: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="relative h-[60vh] md:h-[70vh]">
                                <motion.img
                                    layoutId={`image-${selectedProject.id}`}
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close project details"
                                    className="absolute top-6 right-6 z-20 p-3 bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-2xl shadow-black/40 ring-1 ring-black/10 transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-8 md:p-12 text-white">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl md:text-5xl font-bold mb-2"
                                    >
                                        {selectedProject.title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-lg text-slate-200"
                                    >
                                        {selectedProject.type} / {selectedProject.location}
                                    </motion.p>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-4 max-w-2xl text-base leading-relaxed text-slate-100 md:text-lg"
                                    >
                                        {selectedProject.description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-6 flex flex-wrap gap-3"
                                    >
                                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md">Completed {selectedProject.year}</span>
                                        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur-md">Rating {selectedProject.rating}</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
