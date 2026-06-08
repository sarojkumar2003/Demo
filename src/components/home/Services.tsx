import { Home, Building2, PaintBucket, TreePine } from 'lucide-react';
import { Card } from '../ui/Card';

const services = [
    {
        icon: Home,
        title: "Residential Architecture",
        description: "Bespoke home designs that reflect your personality and lifestyle. From modern villas to sustainable cottages, we create sanctuaries.",
        color: "bg-blue-100 text-blue-600"
    },
    {
        icon: Building2,
        title: "Commercial Design",
        description: "Innovative office spaces, retail environments, and hospitality structures designed to enhance productivity and brand presence.",
        color: "bg-indigo-100 text-indigo-600"
    },
    {
        icon: PaintBucket,
        title: "Interior Design",
        description: "Curating harmonious interiors with a focus on materials, lighting, and spatial flow to create cohesive living and working environments.",
        color: "bg-purple-100 text-purple-600"
    },
    {
        icon: TreePine,
        title: "Landscape Architecture",
        description: "Integrating built environments with nature. We design sustainable landscapes that complement our architectural structures.",
        color: "bg-emerald-100 text-emerald-600"
    }
];

export const Services = () => {
    return (
        <section id="services" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">What We Offer</span>
                    <h2 className="mt-3 text-3xl md:text-5xl font-bold text-slate-900">
                        Our Architectural Services
                    </h2>
                    <p className="mt-4 text-slate-600 text-lg">
                        Comprehensive design solutions tailored to every scale and sector.
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
