import { MessageSquare, FileText, Target } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: "Consultation & Planning",
        description: "We understand your vision, needs, and site requirements to establish a solid foundation.",
        color: "text-amber-500",
        bg: "bg-amber-100/50"
    },
    {
        icon: FileText,
        title: "Design & Visualization",
        description: "We create detailed 3D models and blueprints to help you visualize your future space.",
        color: "text-emerald-500",
        bg: "bg-emerald-100/50"
    },
    {
        icon: Target,
        title: "Construction & Delivery",
        description: "We oversee the construction process to ensure every detail matches the design.",
        color: "text-indigo-500",
        bg: "bg-indigo-100/50"
    }
];

export const Process = () => {
    return (
        <section id="process" className="py-24 bg-white relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-indigo-600 font-medium tracking-wide uppercase text-sm">Our Workflow</span>
                    <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">
                        From Vision to Reality
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
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
