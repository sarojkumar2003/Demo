import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/utils';

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    hoverEffect?: boolean;
}

export const Card = ({ children, className, hoverEffect = false, ...props }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
            className={cn(
                'bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden',
                hoverEffect && 'hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};
