import { Building2, DraftingCompass, Flame, PaintBucket, Ruler, Snowflake, Wrench, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

const services = [
    {
        icon: DraftingCompass,
        title: "Architecture & Urban Design",
        description: "Conceptual design, design development, site planning, facility planning, graphics, and data-driven design for built environments.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Building2,
        title: "Town Planning",
        description: "Context-led planning and zoning support for residential, commercial, institutional, industrial, and infrastructure projects.",
        color: "bg-indigo-100 text-indigo-600"
    },
    {
        icon: PaintBucket,
        title: "Interior Design",
        description: "Space planning, furniture schedules, signage, wayfinding, art direction, and tailored interiors that balance style with function.",
        color: "bg-purple-100 text-purple-600"
    },
    {
        icon: Wrench,
        title: "Structural & Civil Engineering",
        description: "Technical coordination, code analysis, construction support, and practical engineering inputs from concept through delivery.",
        color: "bg-emerald-100 text-emerald-600"
    },
    {
        icon: Zap,
        title: "Electrical Services",
        description: "Electrical planning and service coordination integrated with architectural and interior design requirements.",
        color: "bg-amber-100 text-amber-600"
    },
    {
        icon: Snowflake,
        title: "Air-conditioning & FDV",
        description: "Air-conditioning, FDV, plumbing, and sanitary systems coordinated with the wider project design.",
        color: "bg-cyan-100 text-cyan-600"
    },
    {
        icon: Flame,
        title: "Fire Fighting Systems",
        description: "Fire-safety service planning and coordination aligned with applicable codes, building use, and project constraints.",
        color: "bg-rose-100 text-rose-600"
    },
    {
        icon: Ruler,
        title: "Estimating & Project Management",
        description: "Quantity surveying, estimating, budgeting, scheduling, bidding, negotiation, and construction administration.",
        color: "bg-slate-100 text-slate-600"
    }
];

export const Services = () => {
    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">What We Offer</span>
                    <h2 className="mt-3 text-3xl md:text-5xl font-bold text-slate-900">
                        CAP Services
                    </h2>
                    <p className="mt-4 text-slate-600 text-lg">
                        Integrated consultancy across architecture, interiors, planning, engineering, services, and project delivery.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <Card key={index} hoverEffect className="p-8 border-none shadow-lg shadow-slate-200/50">
                            <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
                                <service.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
