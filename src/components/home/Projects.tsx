import { useState, useRef } from 'react';
import { Button } from '../ui/Button';
import { Star, X, ChevronLeft, ChevronRight, Calendar, MapPin, Layers } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from '../ui/Card';

// Import images from assets
import img1 from '../../assets/Images/1.png';
import img2 from '../../assets/Images/2.png';
import img3 from '../../assets/Images/3.png';
import img4 from '../../assets/Images/4.png';
import img5 from '../../assets/Images/5.png';
import img6 from '../../assets/Images/6.png';
import img7 from '../../assets/Images/7.png';
import img8 from '../../assets/Images/8.png';
import img9 from '../../assets/Images/9.png';
import img10 from '../../assets/Images/10.jpg';
import img11 from '../../assets/Images/11.jpg';
import img12 from '../../assets/Images/12.jpg';
import img13 from '../../assets/Images/13.jpg';
import img14 from '../../assets/Images/14.jpg';
import img15 from '../../assets/Images/15.png';
import img16 from '../../assets/Images/16.png';
import img17 from '../../assets/Images/17.png';
import img18 from '../../assets/Images/18.png';
import img19 from '../../assets/Images/19.png';
import img20 from '../../assets/Images/20.png';
import img21 from '../../assets/Images/21.png';
import img22 from '../../assets/Images/22.png';

const projects = [
    {
        id: 1,
        image: img1,
        title: "Residence, Sector 14 Gurugram",
        rating: 4.9,
        type: "4500 Sft Residence",
        category: "Architecture",
        location: "Sector 14, Gurugram",
        year: "2024",
        description: "Residential design project from the CAP portfolio with planning and architectural development for a 4500 Sft site.",
        gallery: [img1]
    },
    {
        id: 2,
        image: img2,
        title: "Residence, Sector 14 Noida",
        rating: 4.8,
        type: "1450 Sft Residence",
        category: "Architecture",
        location: "Sector 14, Noida",
        year: "2023",
        description: "Compact residential planning and design project focused on efficient spatial organization and client-specific requirements.",
        gallery: [img2]
    },
    {
        id: 3,
        image: img3,
        title: "Residence, Sector 06 Gurugram",
        rating: 4.9,
        type: "4500 Sft Residence",
        category: "Architecture",
        location: "Sector 06, Gurugram",
        year: "2024",
        description: "Residential architecture assignment developed through site planning, design development, and technical coordination.",
        gallery: [img3]
    },
    {
        id: 4,
        image: img4,
        title: "Residence, Sector 15 Gurugram",
        rating: 5.0,
        type: "2700 Sft Residence",
        category: "Architecture",
        location: "Sector 15, Gurugram",
        year: "2025",
        description: "Private residence project balancing functional planning, architectural form, and practical construction detailing.",
        gallery: [img4]
    },
    {
        id: 5,
        image: img5,
        title: "Residence, Sector 91 Faridabad",
        rating: 4.7,
        type: "1500 Sft Residence",
        category: "Architecture",
        location: "Sector 91, Faridabad",
        year: "2023",
        description: "Residential design project in Faridabad shaped around efficient site use and coordinated design documentation.",
        gallery: [img5]
    },
    {
        id: 6,
        image: img6,
        title: "Commercial, Karol Bagh",
        rating: 4.8,
        type: "1575 Sft Commercial",
        category: "Architecture",
        location: "Karol Bagh, New Delhi",
        year: "2024",
        description: "Commercial project in Karol Bagh planned with architectural, services, and execution requirements in mind.",
        gallery: [img6]
    },
    {
        id: 7,
        image: img7,
        title: "Residence, Nirvana Country",
        rating: 4.9,
        type: "4500 Sft Residence",
        category: "Architecture",
        location: "Nirvana Country, Sector 50, Gurgaon",
        year: "2024",
        description: "Residential project in Gurgaon developed for a 4500 Sft site with CAP's integrated architecture workflow.",
        gallery: [img7]
    },
    {
        id: 8,
        image: img8,
        title: "Residence, Sector 50 Gurgaon",
        rating: 4.8,
        type: "1035 Sft Residence",
        category: "Architecture",
        location: "Sector 50, Gurgaon",
        year: "2023",
        description: "Residential project with compact planning, client coordination, and technical design support.",
        gallery: [img8]
    },
    {
        id: 9,
        image: img9,
        title: "Residence, Sector 90 Faridabad",
        rating: 4.7,
        type: "1000 Sft Residence",
        category: "Architecture",
        location: "Sector 90, Faridabad",
        year: "2024",
        description: "A Faridabad residence planned for everyday functionality, efficient layout, and project-ready documentation.",
        gallery: [img9]
    },
    {
        id: 10,
        image: img10,
        title: "Commercial, Kannauj",
        rating: 4.8,
        type: "1535 Sft Commercial",
        category: "Architecture",
        location: "Kannauj, Uttar Pradesh",
        year: "2024",
        description: "Commercial project in Uttar Pradesh supported by planning, architectural design, and technical coordination.",
        gallery: [img10]
    },
    {
        id: 11,
        image: img11,
        title: "Small Residence, Sector 91 Faridabad",
        rating: 4.9,
        type: "100 Sft Residence",
        category: "Architecture",
        location: "Sector 91, Faridabad",
        year: "2023",
        description: "A compact residential assignment requiring careful planning, detailing, and efficient use of available area.",
        gallery: [img11]
    },
    {
        id: 12,
        image: img12,
        title: "Jewellers Showroom",
        rating: 4.7,
        type: "Interior Design",
        category: "Interiors",
        location: "Naiwala, Karol Bagh, Delhi",
        year: "2024",
        description: "Interior design for a jewellers showroom at 3rd floor, Block-NN, Naiwala, Karol Bagh, Delhi.",
        gallery: [img12]
    },
    {
        id: 13,
        image: img13,
        title: "Hospital Commercial Project",
        rating: 4.8,
        type: "1535 Sft Hospital Commercial",
        category: "Architecture",
        location: "Kannauj, Uttar Pradesh",
        year: "2024",
        description: "Hospital and commercial project in Kannauj coordinated through CAP's architectural and technical service process.",
        gallery: [img13]
    },
    {
        id: 14,
        image: img14,
        title: "Krishan Lal And Sons Jewellers",
        rating: 4.9,
        type: "Retail Interior",
        category: "Interiors",
        location: "Karol Bagh, New Delhi",
        year: "2023",
        description: "Jewellery retail project at Krishan Lal Complex, Mata Rameshwari Nehru Nagar, Karol Bagh, New Delhi.",
        gallery: [img14]
    },
    {
        id: 15,
        image: img15,
        title: "Nathdwara Project",
        rating: 5.0,
        type: "Commercial / Hospitality",
        category: "Architecture",
        location: "N. H. 8, Nathdwara, Rajasthan",
        year: "2025",
        description: "Project located near Police Station, Nathdwara, Rajasthan, developed with CAP's integrated design approach.",
        gallery: [img15]
    },
    {
        id: 16,
        image: img16,
        title: "Residential Design Studies",
        rating: 4.9,
        type: "Residential Portfolio",
        category: "Architecture",
        location: "Delhi NCR",
        year: "2024",
        description: "Residential design work across Delhi NCR, including planning, 3D visualization, and design development.",
        gallery: [img16]
    },
    {
        id: 17,
        image: img17,
        title: "Commercial Design Studies",
        rating: 4.8,
        type: "Commercial Portfolio",
        category: "Architecture",
        location: "Delhi NCR and Uttar Pradesh",
        year: "2024",
        description: "Commercial design explorations covering retail, workplace, and service-led built environments.",
        gallery: [img17]
    },
    {
        id: 18,
        image: img18,
        title: "Interior Space Planning",
        rating: 4.7,
        type: "Interior Design",
        category: "Interiors",
        location: "Delhi NCR",
        year: "2023",
        description: "Interior layouts supported by space planning, furniture schedules, material selection, and specifications.",
        gallery: [img18]
    },
    {
        id: 19,
        image: img19,
        title: "Signage & Wayfinding",
        rating: 4.8,
        type: "Interior Design",
        category: "Interiors",
        location: "Delhi NCR",
        year: "2024",
        description: "Interior design support for signage, wayfinding, and art direction as part of complete space experiences.",
        gallery: [img19]
    },
    {
        id: 20,
        image: img20,
        title: "Material Selection",
        rating: 4.9,
        type: "Interior Design",
        category: "Interiors",
        location: "Delhi NCR",
        year: "2024",
        description: "Material specifications and finish coordination that connect visual quality with buildability and budget.",
        gallery: [img20]
    },
    {
        id: 21,
        image: img21,
        title: "Engineering Coordination",
        rating: 4.8,
        type: "Technical Services",
        category: "Architecture",
        location: "India",
        year: "2023",
        description: "Structural, civil, electrical, plumbing, sanitary, air-conditioning, FDV, and fire-fighting coordination.",
        gallery: [img21]
    },
    {
        id: 22,
        image: img22,
        title: "Project Management",
        rating: 4.7,
        type: "Delivery Services",
        category: "Architecture",
        location: "India",
        year: "2024",
        description: "Budgeting, scheduling, quantity surveying, estimating, bidding, negotiation, and construction administration.",
        gallery: [img22]
    }
].sort((a, b) => {
    // Architecture comes before Interiors
    if (a.category !== b.category) {
        return a.category === 'Architecture' ? -1 : 1;
    }
    // Within same category, higher rating first
    return b.rating - a.rating;
});

// 3D Tilt Card Component
const TiltProjectCard = ({ project, onClick }: { project: typeof projects[0], onClick: () => void }) => {
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
    const [activeImgIndex, setActiveImgIndex] = useState(0);
    const [isFullScreenView, setIsFullScreenView] = useState(false);
    const [filter, setFilter] = useState<'All' | 'Architecture' | 'Interiors'>('All');
    const [showAll, setShowAll] = useState(false);
    
    const selectedProject = projects.find(project => project.id === selectedId);

    const filteredProjects = projects.filter(project => {
        if (filter === 'All') return true;
        return project.category === filter;
    });

    const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

    return (
        <section id="projects" className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div>
                        <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">CAP Portfolio</span>
                        <h2 className="mt-3 text-3xl md:text-5xl font-bold text-slate-900">
                            Projects & Capabilities
                        </h2>
                    </div>

                    {/* Category Filter Tabs */}
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200/50">
                        {(['All', 'Architecture', 'Interiors'] as const).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setFilter(cat);
                                    setShowAll(false);
                                }}
                                className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide transition-all duration-200 ${
                                    filter === cat
                                        ? 'bg-slate-900 text-white shadow'
                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    <AnimatePresence mode="popLayout">
                        {displayedProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="h-full"
                            >
                                <TiltProjectCard
                                    project={project}
                                    onClick={() => {
                                        setSelectedId(project.id);
                                        setActiveImgIndex(0);
                                    }}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show More / Show Less Pagination Button */}
                {filteredProjects.length > 6 && (
                    <div className="flex justify-center mt-16 relative z-10">
                        <Button
                            onClick={() => setShowAll(!showAll)}
                            className="rounded-full px-8 py-3.5 bg-slate-950 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 font-bold tracking-wide transition-all duration-200 active:scale-95 flex items-center gap-2"
                        >
                            <span>{showAll ? 'Show Less' : 'Show More Projects'}</span>
                        </Button>
                    </div>
                )}
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
                            className="relative w-full max-w-6xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[90vh] lg:h-[80vh]"
                            layoutId={`image-container-${selectedProject.id}`}
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, rotateX: 10 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            exit={{ scale: 0.9, rotateX: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {/* Left Column: Image Slideshow */}
                            <div className="relative w-full lg:w-7/12 h-[45vh] lg:h-full bg-slate-950 flex flex-col justify-between overflow-hidden group/gallery">
                                <div 
                                    className="relative flex-1 w-full h-full cursor-zoom-in"
                                    onClick={() => setIsFullScreenView(true)}
                                >
                                    <motion.img
                                        key={activeImgIndex}
                                        layoutId={activeImgIndex === 0 ? `image-${selectedProject.id}` : undefined}
                                        initial={activeImgIndex === 0 ? undefined : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={activeImgIndex === 0 ? undefined : { opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        src={selectedProject.gallery[activeImgIndex]}
                                        alt={`${selectedProject.title} view ${activeImgIndex + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    
                                    {/* Left and Right navigation arrows */}
                                    {selectedProject.gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveImgIndex((prev) => (prev === 0 ? selectedProject.gallery.length - 1 : prev - 1));
                                                }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm border border-white/10 transition-all active:scale-90"
                                                aria-label="Previous image"
                                            >
                                                <ChevronLeft size={20} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveImgIndex((prev) => (prev === selectedProject.gallery.length - 1 ? 0 : prev + 1));
                                                }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white backdrop-blur-sm border border-white/10 transition-all active:scale-90"
                                                aria-label="Next image"
                                            >
                                                <ChevronRight size={20} />
                                            </button>
                                        </>
                                    )}

                                    {/* Rating badge */}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-md text-sm font-bold text-slate-800 z-20">
                                        <Star size={14} className="fill-amber-400 text-amber-400" />
                                        {selectedProject.rating}
                                    </div>
                                </div>

                                {/* Thumbnail Strip at bottom of image section */}
                                {selectedProject.gallery.length > 1 && (
                                    <div className="absolute bottom-4 inset-x-0 z-30 flex justify-center gap-2 px-4 py-2 bg-gradient-to-t from-black/50 to-transparent">
                                        {selectedProject.gallery.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImgIndex(idx)}
                                                className={`w-14 h-10 rounded-lg overflow-hidden border-2 transition-all duration-200 active:scale-95 ${
                                                    activeImgIndex === idx ? 'border-white scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                            >
                                                <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Project Details */}
                            <div className="w-full lg:w-5/12 h-auto lg:h-full overflow-y-auto no-scrollbar p-8 md:p-10 lg:p-12 flex flex-col justify-between bg-white relative">
                                <button
                                    onClick={() => setSelectedId(null)}
                                    aria-label="Close project details"
                                    className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-full transition-colors active:scale-95 z-20"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex-1">
                                    <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-3 block">
                                        {selectedProject.type}
                                    </span>
                                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-950 mb-6 leading-tight">
                                        {selectedProject.title}
                                    </h3>
                                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                                        {selectedProject.description}
                                    </p>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8 mt-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <Calendar size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Year</p>
                                                <p className="text-slate-900 font-extrabold">{selectedProject.year}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <MapPin size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
                                                <p className="text-slate-900 font-extrabold truncate">{selectedProject.location}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <Layers size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
                                                <p className="text-slate-900 font-extrabold">{selectedProject.type.split(' ')[1] || 'Design'}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
                                                <Star size={18} className="fill-indigo-50 text-indigo-600" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</p>
                                                <p className="text-slate-900 font-extrabold">{selectedProject.rating} / 5.0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-10 border-t border-slate-100 pt-6">
                                    <Button
                                        onClick={() => setSelectedId(null)}
                                        className="w-full justify-center rounded-2xl bg-slate-950 text-white hover:bg-slate-800 py-3.5 text-base font-semibold shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98]"
                                    >
                                        Close Details
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Full Screen Image Viewer */}
            <AnimatePresence>
                {isFullScreenView && selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center cursor-zoom-out p-4 md:p-8"
                        onClick={() => setIsFullScreenView(false)}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsFullScreenView(false);
                            }}
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-50 border border-white/10 active:scale-95"
                            aria-label="Close full image"
                        >
                            <X size={24} />
                        </button>
                        
                        <motion.img
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            src={selectedProject.gallery[activeImgIndex]}
                            alt={selectedProject.title}
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
