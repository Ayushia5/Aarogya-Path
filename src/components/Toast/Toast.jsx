import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ isVisible, type = 'success', message, onClose, duration = 4000 }) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const styles = {
        success: { bg: 'bg-health-success', icon: <CheckCircle className="text-white" size={20} /> },
        error: { bg: 'bg-health-danger', icon: <AlertCircle className="text-white" size={20} /> },
        warning: { bg: 'bg-health-warning', icon: <AlertTriangle className="text-white" size={20} /> },
        info: { bg: 'bg-primary-teal', icon: <Info className="text-white" size={20} /> },
    };

    const { bg, icon } = styles[type] || styles.success;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 20, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className={`fixed top-6 right-6 z-[100] flex items-center space-x-4 p-4 rounded-xl shadow-2xl min-w-[300px] border border-white/20 ${bg}`}
                >
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-white">{message}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/70 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
