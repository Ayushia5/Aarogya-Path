import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, AlertTriangle, Building2, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore';
import { db } from '../../services/firebaseConfig';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

const HospitalCard = ({ hospital, index }) => {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSavedStatus = async () => {
            if (user?.uid) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const saved = docSnap.data().savedProviders || [];
                    setIsSaved(saved.includes(hospital.id));
                }
            }
        };
        checkSavedStatus();
    }, [hospital.id, user]);

    const toggleSave = async (e) => {
        e.stopPropagation();
        if (!user?.uid || loading) return;
        
        setLoading(true);
        const docRef = doc(db, 'users', user.uid);
        try {
            if (isSaved) {
                await updateDoc(docRef, {
                    savedProviders: arrayRemove(hospital.id)
                });
                setIsSaved(false);
            } else {
                await updateDoc(docRef, {
                    savedProviders: arrayUnion(hospital.id)
                });
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error toggling save:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="card-premium overflow-hidden group border border-health-border/50 shadow-sm hover:shadow-xl hover:shadow-primary-teal/10 transition-all duration-300"
        >
            <div className="relative h-48 overflow-hidden bg-zinc-100">
                <img
                    src={hospital.imageUrl}
                    alt={hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {hospital.badge && (
                    <div className="absolute top-4 left-4 !bg-white/90 !text-primary-navy backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold shadow-sm shadow-black/10 uppercase tracking-widest border border-white">
                        {hospital.badge}
                    </div>
                )}

                <button 
                    onClick={toggleSave}
                    disabled={loading}
                    className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition-all z-10 ${
                        isSaved 
                            ? 'bg-health-danger text-white border border-health-danger/50' 
                            : 'bg-white/80 text-health-text-muted hover:text-health-danger hover:bg-white border border-white'
                    }`}
                >
                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} strokeWidth={isSaved ? 0 : 2.5} />
                </button>
                
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-teal transition-colors">
                        {hospital.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-white/80 text-sm">
                        <MapPin size={14} />
                        <span>{hospital.location}</span>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <p className="text-sm text-health-text-secondary leading-relaxed mb-4 line-clamp-2">
                    {hospital.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-health-bg/50 p-3 rounded-xl border border-health-border/50">
                        <p className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest mb-1 flex items-center justify-between">
                            Cleanliness
                            <Star size={12} className="text-primary-teal" />
                        </p>
                        <p className="font-bold text-primary-navy">{hospital.cleanlinessScore} / 10</p>
                    </div>
                    <div className="bg-health-bg/50 p-3 rounded-xl border border-health-border/50">
                        <p className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest mb-1 flex items-center justify-between">
                            Base Cost
                            <TrendingUp size={12} className="text-health-warning" />
                        </p>
                        <p className="font-bold text-primary-navy">{hospital.baseCost}</p>
                    </div>
                </div>

                {hospital.missingFacilities && hospital.missingFacilities.length > 0 && (
                    <div className="mb-5 p-3 rounded-xl bg-health-warning/10 border border-health-warning/20">
                        <p className="text-[10px] font-bold text-health-warning uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <AlertTriangle size={12} /> Infrastructure Gaps
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {hospital.missingFacilities.map((facility, idx) => (
                                <span key={idx} className="px-2 py-1 text-[10px] bg-white text-health-text-secondary rounded-md border border-health-border font-medium">
                                    {facility}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col space-y-3 pt-4 border-t border-health-border">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-health-text-secondary">Expected Cost Premium</span>
                        <span className="font-bold text-health-danger">{hospital.costMultiplier}x</span>
                    </div>
                    <button 
                        onClick={() => navigate(`/providers/${hospital.id}`)}
                        className="w-full text-center py-2.5 bg-primary-teal/10 hover:bg-primary-teal text-primary-teal hover:text-white font-bold rounded-xl transition-all text-sm group-hover:shadow-md"
                    >
                        View Hospital Details
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default HospitalCard;
