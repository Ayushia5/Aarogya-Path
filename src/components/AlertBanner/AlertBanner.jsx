import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const AlertBanner = ({ type = 'info', title, message, children }) => {
    const styles = {
        info: {
            bg: 'bg-primary-teal/5',
            border: 'border-primary-teal',
            text: 'text-primary-navy',
            iconColor: 'text-primary-teal',
            icon: <Info size={20} />,
        },
        success: {
            bg: 'bg-health-success/5',
            border: 'border-health-success',
            text: 'text-primary-navy',
            iconColor: 'text-health-success',
            icon: <CheckCircle size={20} />,
        },
        warning: {
            bg: 'bg-health-warning/5',
            border: 'border-health-warning',
            text: 'text-primary-navy',
            iconColor: 'text-health-warning',
            icon: <AlertTriangle size={20} />,
        },
        danger: {
            bg: 'bg-health-danger/5',
            border: 'border-health-danger',
            text: 'text-primary-navy',
            iconColor: 'text-health-danger',
            icon: <AlertCircle size={20} />,
        },
    };

    const { bg, border, text, iconColor, icon } = styles[type] || styles.info;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${bg} border-l-4 ${border} p-4 rounded-r-xl flex items-start space-x-3 shadow-sm`}
        >
            <div className={`${iconColor} mt-0.5`}>
                {icon}
            </div>
            <div className="flex-1">
                {title && <h4 className={`font-bold ${text} text-sm mb-1`}>{title}</h4>}
                {message && <p className="text-health-text-secondary text-sm leading-relaxed">{message}</p>}
                {children && <div className="mt-2 text-sm">{children}</div>}
            </div>
        </motion.div>
    );
};

export default AlertBanner;
