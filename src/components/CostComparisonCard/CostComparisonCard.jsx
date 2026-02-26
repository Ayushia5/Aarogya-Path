import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';

const CostComparisonCard = ({ type, priceRange, isBestValue }) => {
    const isPublic = type === 'public';

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative p-6 rounded-2xl border-2 flex flex-col transition-all overflow-hidden ${isBestValue
                    ? 'border-primary-teal bg-white shadow-xl'
                    : 'border-health-border bg-health-bg/30'
                }`}
        >
            {isBestValue && (
                <div className="absolute top-0 right-0 bg-primary-teal text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Best Value
                </div>
            )}

            <div className="flex items-center justify-between mb-4">
                <h4 className={`text-sm font-bold uppercase tracking-widest ${isPublic ? 'text-primary-teal' : 'text-primary-navy'
                    }`}>
                    {isPublic ? 'Public Health System' : 'Private Healthcare'}
                </h4>
                <Info size={16} className="text-health-text-muted" />
            </div>

            <div className="mb-6">
                <p className="text-xs text-health-text-secondary mb-1">Estimated Total Cost</p>
                <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-primary-navy tabular-nums">{priceRange}</span>
                </div>
            </div>

            <div className="space-y-3 mt-auto">
                <div className="flex justify-between text-xs">
                    <span className="text-health-text-secondary">Expected Wait Time</span>
                    <span className="font-semibold text-primary-navy">{isPublic ? '3 - 6 Months' : '1 - 2 Weeks'}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-health-text-secondary">Provider Choice</span>
                    <span className="font-semibold text-primary-navy">{isPublic ? 'Assigned' : 'Unlimited'}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-health-text-secondary">Facility Quality</span>
                    <span className="font-semibold text-primary-navy">{isPublic ? 'Standard' : 'Premium'}</span>
                </div>
            </div>

            <div className={`mt-6 pt-4 border-t ${isBestValue ? 'border-primary-teal/20' : 'border-health-border'}`}>
                <button className={`w-full py-2.5 rounded-xl font-bold transition-all ${isBestValue
                        ? 'bg-primary-teal text-white shadow-lg shadow-primary-teal/20'
                        : 'bg-white border border-health-border text-health-text-secondary hover:border-primary-teal hover:text-primary-teal'
                    }`}>
                    Select This Path
                </button>
            </div>
        </motion.div>
    );
};

export default CostComparisonCard;
