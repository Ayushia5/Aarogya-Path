import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProcedureChip = ({ name, isSelected, onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={onClick}
            className={`px-4 py-2.5 rounded-full border-2 flex items-center space-x-2 transition-colors focus:outline-none ${isSelected
                    ? 'bg-primary-teal/10 border-primary-teal text-primary-teal'
                    : 'bg-white border-health-border text-health-text-secondary hover:border-health-text-muted'
                }`}
        >
            <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-primary-teal scale-100' : 'bg-transparent scale-0'
                }`}>
                {isSelected && <Check size={12} className="text-white" />}
            </div>
            <span className={`text-sm font-semibold ${isSelected ? 'text-primary-teal' : 'text-health-text-secondary'}`}>
                {name}
            </span>
        </motion.button>
    );
};

export default ProcedureChip;
