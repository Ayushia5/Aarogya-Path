import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';

const KPICard = ({ title, value, trend, icon, iconBgColor = 'bg-blue-500/10', iconColor = 'text-blue-500', isCurrency = false }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const numericValue = typeof value === 'number' ? value : parseFloat(value.replace(/[^0-9.]/g, ''));
        const controls = animate(0, numericValue, {
            duration: 1.2,
            onUpdate: (latest) => setDisplayValue(latest),
        });
        return () => controls.stop();
    }, [value]);

    const formattedValue = isCurrency
        ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(displayValue)
        : Math.floor(displayValue).toString();

    const isTrendPositive = trend?.startsWith('↑') || trend?.startsWith('+');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="card-premium p-6 flex items-start justify-between"
        >
            <div>
                <p className="text-xs font-bold text-health-text-muted uppercase tracking-widest mb-2">{title}</p>
                <div className="flex items-baseline space-x-2">
                    <h3 className="text-3xl font-bold text-primary-navy tabular-nums">
                        {formattedValue}
                    </h3>
                    {trend && (
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${isTrendPositive ? 'bg-health-success/10 text-health-success' : 'bg-primary-teal/10 text-primary-teal'
                            }`}>
                            {trend}
                        </span>
                    )}
                </div>
            </div>

            <div className={`p-3 rounded-2xl ${iconBgColor} ${iconColor}`}>
                {icon}
            </div>
        </motion.div>
    );
};

export default KPICard;
