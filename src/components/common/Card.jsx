import { cn } from '../../utils/cn';

export const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={cn(
                'bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ className, children, ...props }) => {
    return (
        <div className={cn('p-6', className)} {...props}>
            {children}
        </div>
    );
};

export const CardTitle = ({ className, children, ...props }) => {
    return (
        <h3
            className={cn(
                'text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-white',
                className
            )}
            {...props}
        >
            {children}
        </h3>
    );
};

export const CardContent = ({ className, children, ...props }) => {
    return (
        <div className={cn('p-6 pt-0', className)} {...props}>
            {children}
        </div>
    );
};
