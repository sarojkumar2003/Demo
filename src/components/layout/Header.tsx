import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Rocket, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/utils';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
];

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 inset-x-0 z-50 transition-all duration-300',
                scrolled ? 'glass py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2 relative z-50">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                            <Rocket size={20} fill="currentColor" className="text-white" />
                        </div>
                        <span className="font-bold text-xl text-slate-900 tracking-tight">Havenx</span>
                    </div>

                    {/* Desktop Search Overlay */}
                    <AnimatePresence>
                        {searchOpen ? (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute inset-x-0 top-0 h-screen bg-white/95 backdrop-blur-md flex flex-col pt-32 items-center z-40"
                                onClick={() => setSearchOpen(false)}
                            >
                                <div
                                    className="w-full max-w-3xl px-4"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center border-b-2 border-slate-200 focus-within:border-indigo-600 transition-colors pb-4">
                                        <Search className="text-slate-400 mr-6" size={28} />
                                        <input
                                            type="text"
                                            placeholder="Search projects, services, or ideas..."
                                            className="w-full bg-transparent outline-none text-3xl font-medium text-slate-800 placeholder:text-slate-300"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => setSearchOpen(false)}
                                            className="ml-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                                        >
                                            <X size={24} className="text-slate-600" />
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-4">Suggested Searches</p>
                                        <div className="flex flex-wrap gap-3">
                                            {['Modern Villas', 'Sustainable Design', 'Urban Planning', 'Interior Renovation', 'Commercial Complexes', 'Landscape Architecture'].map((term) => (
                                                <button
                                                    key={term}
                                                    className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors text-sm font-medium"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <nav className="hidden md:flex items-center gap-8">
                                {['About', 'Services', 'Projects'].map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                                    >
                                        {item}
                                    </a>
                                ))}
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="text-slate-400 hover:text-indigo-600 transition-colors"
                                >
                                    <Search size={18} />
                                </button>
                            </nav>
                        )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-6 relative z-50">
                        {/* 'Other services' removed here */}
                        <a href="#contact">
                            <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-6 h-10 text-sm">
                                Contact us
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block text-base font-medium text-slate-700 hover:text-indigo-600 py-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center rounded-xl h-12 text-base">Contact Us</Button>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
