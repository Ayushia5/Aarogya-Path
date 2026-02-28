import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ExternalLink, Calendar } from 'lucide-react';

const ProviderCard = ({ provider, index }) => {
    const {
        name, specialty, yearsExp, rating, reviewCount,
        hospital, city, badge, imageUrl, id
    } = provider;

    const navigate = useNavigate();

    const badgeStyles = {
        "Excellent": "bg-health-success/10 text-health-success border-health-success/20",
        "Top Rated": "bg-primary-teal/10 text-primary-teal border-primary-teal/20",
        "Available Today": "bg-blue-500/10 text-blue-500 border-blue-500/20 animate-pulse",
        "Specialist": "bg-purple-500/10 text-purple-500 border-purple-500/20",
        "High Demand": "bg-health-danger/10 text-health-danger border-health-danger/20",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="card-premium group"
        >
            {/* Provider Header / Image */}
            <div className="relative h-40 bg-primary-teal/5 rounded-t-2xl overflow-hidden">
                <img
                    src={imageUrl || `https://i.pravatar.cc/300?u=${name}`}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/40 to-transparent"></div>

                {badge && (
                    <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold border-2 backdrop-blur-md ${badgeStyles[badge] || 'bg-white/50 border-white'}`}>
                        {badge}
                    </div>
                )}
            </div>

            {/* Provider Details */}
            <div className="p-5">
                <div className="mb-4">
                    <h3 className="text-base font-bold text-primary-navy group-hover:text-primary-teal transition-colors">
                        {name}
                    </h3>
                    <p className="text-xs text-health-text-secondary font-medium">
                        {specialty} • {yearsExp} yrs exp.
                    </p>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                    <div className="flex items-center text-yellow-400">
                        <Star size={14} fill="currentColor" />
                        <span className="ml-1 text-sm font-bold text-primary-navy">{rating}</span>
                    </div>
                    <span className="text-xs text-health-text-muted">({reviewCount} reviews)</span>
                </div>

                <div className="flex items-start space-x-2 text-xs text-health-text-secondary mb-6 h-10 overflow-hidden">
                    <MapPin size={14} className="text-health-text-muted shrink-0 mt-0.5" />
                    <span>{hospital}, {city}</span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-1 gap-3">
                    <button
                        onClick={() => navigate(`/providers/${id}`)}
                        className="flex items-center justify-center py-2 rounded-xl border-2 border-health-border text-xs font-bold text-health-text-secondary hover:bg-health-bg hover:border-health-text-muted transition-all">
                        Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProviderCard;
