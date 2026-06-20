import { ClipboardCheck, FileText, Hammer, MessageSquare } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: "Pre-design",
        description: "Programming, site and building evaluation, project cost and feasibility, planning, and zoning regulation review.",
        color: "text-amber-500",
        bg: "bg-amber-100/50"
    },
    {
        icon: FileText,
        title: "Design Development",
        description: "Schematic design, engineering systems, code coordination, construction documents, and material specifications.",
        color: "text-emerald-500",
        bg: "bg-emerald-100/50"
    },
    {
        icon: Hammer,
        title: "Construction Phase",
        description: "Bidding, negotiation, construction administration, observation, and field coordination through execution.",
        color: "text-indigo-500",
        bg: "bg-indigo-100/50"
    },
    {
        icon: ClipboardCheck,
        title: "Practice Management",
        description: "General project management, business operations, leadership, service, scheduling, and team supervision.",
        color: "text-sky-500",
        bg: "bg-sky-100/50"
    }
];

export const Process = () => {
    return (
        <section id="process" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-indigo-600 font-medium tracking-wide uppercase text-sm">Our Workflow</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
                        From Programming to Project Management
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-start p-6 rounded-3xl transition-all duration-300 hover:bg-slate-50">
                            <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center mb-6`}>
                                <step.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
