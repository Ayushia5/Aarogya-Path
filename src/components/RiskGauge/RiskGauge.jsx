import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const RiskGauge = ({ value = 0, label = "SAFE Zone", color = "#4CAF7D" }) => {
    // value should be between 0 (low risk/green) and 100 (high risk/red)
    // Angle: -90 degrees (left) to 90 degrees (right)
    const springValue = useSpring(0, { stiffness: 40, damping: 15 });
    const rotate = useTransform(springValue, [0, 100], [-90, 90]);

    useEffect(() => {
        const timer = setTimeout(() => {
            springValue.set(value);
        }, 500);
        return () => clearTimeout(timer);
    }, [value, springValue]);

    return (
        <div className="relative flex flex-col items-center">
            <svg width="240" height="140" viewBox="0 0 240 140" className="overflow-visible">
                {/* Gauge Background Track */}
                <path
                    d="M 20 120 A 100 100 0 0 1 220 120"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="12"
                    strokeLinecap="round"
                />

                {/* Gauge Colored Gradient Mask/Sections */}
                <path
                    d="M 20 120 A 100 100 0 0 1 220 120"
                    fill="none"
                    stroke="url(#riskGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                />

                <defs>
                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4CAF7D" />   {/* Success Green */}
                        <stop offset="50%" stopColor="#F5A623" />  {/* Warning Amber */}
                        <stop offset="100%" stopColor="#E05252" /> {/* Danger Red */}
                    </linearGradient>
                </defs>

                {/* Needle Base Circle */}
                <circle cx="120" cy="120" r="5" fill="#1A2333" />

                {/* Needle */}
                <motion.g style={{ rotate, originX: '120px', originY: '120px' }}>
                    <line
                        x1="120"
                        y1="120"
                        x2="120"
                        y2="40"
                        stroke="#1A2333"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </motion.g>
            </svg>

            {/* Label and Value */}
            <div className="absolute bottom-2 text-center">
                <p className="text-2xl font-bold text-primary-navy tabular-nums" style={{ color }}>
                    {label}
                </p>
            </div>
        </div>
    );
};

export default RiskGauge;
