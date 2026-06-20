import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Crown, Mail, Sparkles, Users, X } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    email: string;
    focus?: string;
    image?: string;
    children?: TeamMember[];
}

const teamData: TeamMember = {
    id: '1',
    name: 'R.K. Sharma',
    role: 'Principal Architect',
    email: 'info@cityarchitectsplanning.in',
    focus: 'Design Leadership',
    children: [
        {
            id: '2',
            name: 'Architecture Studio',
            role: 'Design & Planning Team',
            email: 'architecture@cityarchitectsplanning.in',
            focus: 'Concept & Planning',
            children: [
                { id: '4', name: 'Residential & Commercial', role: 'Architecture Projects', email: 'projects@cityarchitectsplanning.in', focus: 'Built Form' },
                { id: '5', name: 'Interior Design Division', role: 'Space Planning & Finishes', email: 'interiors@cityarchitectsplanning.in', focus: 'Experience' }
            ]
        },
        {
            id: '3',
            name: 'Technical Services',
            role: 'Engineering & Delivery Team',
            email: 'technical@cityarchitectsplanning.in',
            focus: 'Systems',
            children: [
                { id: '6', name: 'Structural & Civil', role: 'Engineering Coordination', email: 'structure@cityarchitectsplanning.in', focus: 'Technical' },
                { id: '7', name: 'MEP & Project Management', role: 'Services, Estimating & Scheduling', email: 'pm@cityarchitectsplanning.in', focus: 'Delivery' }
            ]
        }
    ]
};

const getInitials = (name: string) => name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const getLevelStyle = (level: number) => {
    if (level === 0) {
        return {
            card: 'w-80 bg-slate-950 text-white border-slate-800 shadow-2xl shadow-slate-900/30',
            avatar: 'bg-gradient-to-br from-indigo-500 to-sky-400 text-white shadow-lg shadow-indigo-500/30',
            role: 'text-indigo-100',
            focus: 'bg-white/10 text-white border-white/10',
            icon: <Crown size={16} />
        };
    }

    if (level === 1) {
        return {
            card: 'w-72 bg-white text-slate-900 border-indigo-100 shadow-xl shadow-indigo-100/70',
            avatar: 'bg-gradient-to-br from-indigo-100 to-sky-100 text-indigo-700',
            role: 'text-indigo-600',
            focus: 'bg-indigo-50 text-indigo-700 border-indigo-100',
            icon: <Sparkles size={16} />
        };
    }

    return {
        card: 'w-64 bg-white text-slate-900 border-slate-100 shadow-lg shadow-slate-200/70',
        avatar: 'bg-gradient-to-br from-orange-100 to-sky-100 text-slate-700',
        role: 'text-slate-600',
        focus: 'bg-slate-50 text-slate-600 border-slate-100',
        icon: <Users size={16} />
    };
};

const MemberNode = ({ member, level = 0 }: { member: TeamMember; level?: number }) => {
    const [isExpanded, setIsExpanded] = useState(Boolean(member.children?.length));
    const hasChildren = Boolean(member.children?.length);
    const styles = getLevelStyle(level);

    return (
        <div className="flex flex-col items-center">
            <motion.div
                layout
                onClick={() => hasChildren && setIsExpanded(!isExpanded)}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`${styles.card} relative z-10 rounded-3xl border p-5 text-left transition-all ${hasChildren ? 'cursor-pointer' : ''} ${isExpanded ? 'ring-2 ring-indigo-500/20' : ''}`}
            >
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-black ${styles.avatar}`}>
                        {getInitials(member.name)}
                    </div>

                    <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold ${styles.focus}`}>
                        {styles.icon}
                        {member.focus}
                    </div>
                </div>

                <h4 className="text-xl font-bold tracking-tight">{member.name}</h4>
                <p className={`mt-1 text-sm font-semibold ${styles.role}`}>{member.role}</p>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-current/10 pt-4">
                    <a
                        href={`mailto:${member.email}`}
                        className="inline-flex min-w-0 items-center gap-2 rounded-full bg-current/5 px-3 py-2 text-xs font-semibold text-inherit transition-colors hover:bg-current/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Mail size={16} />
                        <span className="truncate">{member.email}</span>
                    </a>

                    {hasChildren && (
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown size={18} />
                        </div>
                    )}
                </div>
            </motion.div>

            <AnimatePresence>
                {isExpanded && hasChildren && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="relative mt-12 flex w-full flex-col items-center"
                    >
                        {/* Vertical line from parent */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            className="absolute top-[-48px] left-1/2 h-12 w-[2px] origin-top bg-gradient-to-b from-indigo-400/70 to-sky-300/50"
                        />

                        {/* Horizontal connector bar */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute left-[20%] right-[20%] top-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-300/70 to-transparent"
                        />

                        <div className="flex w-full justify-center gap-10">
                            {member.children?.map((child) => (
                                <div key={child.id} className="relative pt-12">
                                    {/* Vertical line to child */}
                                    <motion.div
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        className="absolute left-1/2 top-0 h-12 w-[2px] origin-top bg-gradient-to-b from-indigo-300/70 to-sky-200/60"
                                    />
                                    <MemberNode member={child} level={level + 1} />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const TeamTree = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-3 md:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl md:max-h-[calc(100vh-3rem)] md:rounded-[3rem]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Section */}
                        <div className="relative shrink-0 border-b border-slate-100 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 pb-5 pt-7 text-white md:px-10 md:pb-7 md:pt-8">
                            <button
                                onClick={onClose}
                                className="absolute right-5 top-5 z-50 rounded-full border border-white/20 bg-white p-3 text-slate-900 shadow-2xl shadow-black/30 transition-colors hover:bg-slate-100 md:right-8 md:top-8"
                            >
                                <X size={24} />
                            </button>

                            <div className="max-w-3xl">
                                <span className="mb-3 block text-xs font-bold uppercase tracking-wider text-sky-200 md:text-sm">Organizational Structure</span>
                                <h2 className="pr-16 text-3xl font-bold tracking-tight md:text-5xl">Our Integrated Team</h2>
                                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                                    Research, design, architecture, structure, services, sustainability, and project management work together under one roof.
                                </p>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                                    <p className="text-xl font-bold md:text-2xl">07</p>
                                    <p className="text-xs text-slate-300 md:text-sm">Core leaders</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                                    <p className="text-xl font-bold md:text-2xl">03</p>
                                    <p className="text-xs text-slate-300 md:text-sm">Decision layers</p>
                                </div>
                                <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                                    <p className="text-xl font-bold md:text-2xl">02</p>
                                    <p className="text-xs text-slate-300 md:text-sm">Specialized tracks</p>
                                </div>
                            </div>
                        </div>

                        {/* Content Section - Scrollable with proper spacing */}
                        <div className="min-h-0 flex-1 overflow-auto bg-gradient-to-b from-slate-50 to-white px-6 py-8 md:px-10 md:py-10">
                            <div className="flex min-w-max justify-center pb-20">
                                <div className="pt-4">
                                    <MemberNode member={teamData} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
