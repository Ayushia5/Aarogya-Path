import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ChevronRight, Heart, Activity,
    Stethoscope, Eye, ShieldCheck, Brain,
    ChevronLeft, ArrowRight, Shield, Lock, TrendingDown,
    Plus, Info, Check, Filter, X
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import ProcedureChip from '../../components/ProcedureChip/ProcedureChip';
import useEstimatorStore from '../../stores/useEstimatorStore';
import { medicalProcedures } from '../../data/medicalProcedures';

const UsersIcon = ({ size, className }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M23 7a4 4 0 0 0-3-3.87" />
    </svg>
);

const getCategoryIcon = (id) => {
    switch (id) {
        case 'cardiology': return <Heart size={18} />;
        case 'orthopedic': return <Activity size={18} />;
        case 'diagnostic-imaging': return <Eye size={18} />;
        case 'ophthalmology': return <Eye size={18} />;
        case 'maternity': return <UsersIcon size={18} />;
        case 'general-surgery': return <Stethoscope size={18} />;
        case 'specialized': return <Activity size={18} />;
        default: return <Stethoscope size={18} />;
    }
};

const SelectProcedures = () => {
    const navigate = useNavigate();
    const { selectedProcedures, toggleProcedure } = useEstimatorStore();
    const [selectedCategoryId, setSelectedCategoryId] = useState('cardiology');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = medicalProcedures.map(cat => ({
        id: cat.id,
        name: cat.category,
        icon: getCategoryIcon(cat.id),
        count: cat.procedures.length
    }));

    const activeCategory = medicalProcedures.find(c => c.id === selectedCategoryId) || medicalProcedures[0];
    const allProceduresFlat = medicalProcedures.flatMap(cat => cat.procedures);
    const filteredProcedures = searchQuery
        ? allProceduresFlat.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : activeCategory.procedures;

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 pb-40">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between space-y-8 md:space-y-0 border-b border-health-border pb-10 mb-12">
                <div>
                    <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Step 02 / 03</span>
                    <h1 className="text-4xl md:text-5xl font-black text-primary-navy tracking-tighter leading-none mb-4">
                        Select <span className="text-gradient">Procedures</span>
                    </h1>
                    <p className="text-health-text-secondary text-lg font-medium">Choose the specific treatments you want to analyze.</p>
                </div>
                <div className="flex items-center space-x-2 bg-health-bg p-1.5 rounded-full border border-health-border">
                    <div className="w-10 h-10 rounded-full bg-primary-teal flex items-center justify-center text-white shadow-lg">
                        <Check size={18} strokeWidth={3} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-teal flex items-center justify-center text-white shadow-lg">
                        <span className="text-xs font-black">02</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white border border-health-border flex items-center justify-center text-health-text-muted">
                        <span className="text-xs font-black">03</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar: Categories */}
                <aside className="lg:w-1/4">
                    <div className="card-premium p-8 sticky top-32">
                        <div className="flex items-center space-x-2 mb-8">
                             <Filter size={14} className="text-primary-teal" />
                             <h4 className="text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em]">Categories</h4>
                        </div>

                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategoryId(cat.id);
                                        setSearchQuery('');
                                    }}
                                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${selectedCategoryId === cat.id && !searchQuery
                                        ? 'bg-primary-teal text-white shadow-xl shadow-primary-teal/20'
                                        : 'text-health-text-secondary hover:bg-health-bg/50'
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className={selectedCategoryId === cat.id && !searchQuery ? 'text-white' : 'text-primary-teal'}>
                                            {cat.icon}
                                        </span>
                                        <span className="text-xs font-black uppercase tracking-widest">{cat.name}</span>
                                    </div>
                                    <span className={`text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-lg ${selectedCategoryId === cat.id && !searchQuery ? 'bg-white/20' : 'bg-health-bg'}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Main Panel: Procedures */}
                <main className="lg:w-3/4 space-y-12">
                    <motion.div {...fadeInUp} className="card-premium p-10">
                        <div className="relative mb-12">
                            <span className="absolute inset-y-0 left-0 pl-6 flex items-center">
                                <Search className="text-primary-teal" size={20} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search medical procedures..."
                                className="w-full pl-16 pr-6 py-5 bg-health-bg border border-health-border rounded-[32px] text-lg font-medium focus:outline-none focus:border-primary-teal focus:bg-white focus:shadow-2xl focus:shadow-primary-teal/5 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-12">
                            <div>
                                <h4 className="text-[10px] font-black text-health-text-muted uppercase tracking-[0.3em] mb-8 border-b border-health-border pb-4">
                                    {searchQuery ? `Search Results (${filteredProcedures.length})` : `${activeCategory.name} Catalog`}
                                </h4>
                                <div className="flex flex-wrap gap-4">
                                    {filteredProcedures.map(proc => (
                                        <ProcedureChip
                                            key={proc.name}
                                            name={proc.name}
                                            isSelected={selectedProcedures.includes(proc.name)}
                                            onClick={() => toggleProcedure(proc.name)}
                                        />
                                    ))}
                                    {filteredProcedures.length === 0 && (
                                        <div className="w-full py-16 text-center">
                                            <X size={48} className="mx-auto text-health-bg mb-4" />
                                            <p className="text-sm font-bold text-health-text-secondary">No exact matches found for your search.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Info Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Accuracy Score", desc: "98% precision on local costs", icon: <Shield size={20} /> },
                            { title: "Secure Data", desc: "Enterprise-grade encryption", icon: <Lock size={20} /> },
                            { title: "Savings Match", desc: "Personalized regional optimization", icon: <TrendingDown size={20} /> }
                        ].map((item, i) => (
                            <div key={i} className="card-premium p-8 flex flex-col items-center text-center group hover:bg-health-bg/50 transition-colors">
                                <div className="w-12 h-12 rounded-2xl bg-primary-teal/5 flex items-center justify-center text-primary-teal mb-6 transition-transform group-hover:scale-110">
                                    {item.icon}
                                </div>
                                <h5 className="font-black text-primary-navy text-sm uppercase tracking-widest mb-2">{item.title}</h5>
                                <p className="text-xs text-health-text-secondary font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            {/* Bottom Actions Bar */}
            <AnimatePresence>
                <div className="fixed bottom-0 left-0 right-0 p-6 z-50">
                    <motion.div 
                        initial={{ y: 100 }}
                        animate={{ y: 0 }}
                        className="max-w-7xl mx-auto bg-primary-navy text-white rounded-[40px] shadow-4xl p-8 flex flex-col md:flex-row items-center justify-between border border-white/10 backdrop-blur-xl"
                    >
                        <div className="flex flex-col mb-6 md:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="px-3 py-1 bg-primary-teal text-[10px] font-black rounded-full uppercase tracking-widest">
                                    Selection Area
                                </div>
                                <span className="text-xs font-black text-white/40 uppercase tracking-[0.2em]">
                                    {selectedProcedures.length} Selected
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2 max-w-xl">
                                {selectedProcedures.length === 0 ? (
                                    <span className="text-sm font-medium text-white/50 italic italic">Please select at least one medical procedure to proceed.</span>
                                ) : (
                                    selectedProcedures.map((p, i) => (
                                        <span key={p} className="text-[10px] font-black text-primary-teal uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md">
                                            {p}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <button
                                onClick={() => navigate('/cost-estimator/step-1')}
                                className="text-xs font-black text-white/50 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center space-x-2"
                            >
                                <ChevronLeft size={16} />
                                <span>Modify Profile</span>
                            </button>
                            <button
                                onClick={() => navigate('/cost-estimator/results')}
                                disabled={selectedProcedures.length === 0}
                                className={`btn-primary !px-10 !py-4 shadow-2xl shadow-primary-teal/40 group ${
                                    selectedProcedures.length === 0 ? 'opacity-20 grayscale pointer-events-none' : ''
                                }`}
                            >
                                <span className="font-black text-sm uppercase tracking-widest">Generate Analysis</span>
                                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </AnimatePresence>
        </div>
    );
};

export default SelectProcedures;
