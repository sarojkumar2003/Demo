import { Button } from '../ui/Button';

export const InfoSection = () => {
    return (
        <section className="py-24 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                            Global Architectural Excellence and Innovation
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            From concept to construction, we design spaces that inspire. Our portfolio spans residential, commercial, and public projects across the globe, redefining skylines and lifestyles.
                        </p>
                        <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-12 text-base">
                            Our Philosophy
                        </Button>
                    </div>

                    <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
                        {/* Placeholder for the image seen in bottom right of design - using a gradient/placeholder for now as no asset was provided for this specifically, or we can reuse one */}
                        <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                            <img
                                src="/hero-house-villa.png"
                                alt="Real Estate Meeting"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
