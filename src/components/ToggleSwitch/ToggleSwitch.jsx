import React from 'react';
import { motion } from 'framer-motion';

const ToggleSwitch = ({ isOn, onToggle, label, description }) => {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex flex-col">
                {label && <span className="text-sm font-bold text-primary-navy">{label}</span>}
                {description && <span className="text-xs text-health-text-secondary">{description}</span>}
            </div>
            <button
                type="button"
                onClick={onToggle}
                className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${isOn ? 'bg-primary-teal' : 'bg-health-border'
                    }`}
            >
                <motion.div
                    animate={{ x: isOn ? 24 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
