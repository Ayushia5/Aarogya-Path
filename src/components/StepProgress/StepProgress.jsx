import React from 'react';
import { motion } from 'framer-motion';

const StepProgress = ({ currentStep, totalSteps, title, nextTitle }) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-3">
                <div>
                    <p className="text-[10px] font-bold text-primary-teal uppercase tracking-widest mb-1">
                        Step {currentStep} of {totalSteps}
                    </p>
                    <h2 className="text-2xl font-bold text-primary-navy">{title}</h2>
                </div>
                {nextTitle && currentStep < totalSteps && (
                    <p className="text-sm font-medium text-health-text-muted">
                        Next: <span className="text-health-text-secondary">{nextTitle}</span>
                    </p>
                )}
            </div>

            <div className="h-2 w-full bg-health-border rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-primary-teal rounded-full"
                />
            </div>
        </div>
    );
};

export default StepProgress;
