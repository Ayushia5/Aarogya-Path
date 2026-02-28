import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ChevronRight, Heart, Activity,
    Stethoscope, Eye, ShieldCheck, Brain,
    ChevronLeft, ArrowRight, Shield, Lock, TrendingDown
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
        case 'diagnostic-imaging': return <ChevronRight size={18} />;
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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-health-text-muted mb-6">
                <Link to="/" className="hover:text-primary-teal transition-colors">Home</Link>
                <ChevronRight size={14} />
                <Link to="/tools" className="hover:text-primary-teal transition-colors">Tools</Link>
                <ChevronRight size={14} />
                <span className="text-health-text-secondary font-medium">Cost Estimator</span>
            </nav>

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Select Procedures</h1>
                    <p className="text-health-text-secondary text-lg">Step 2 of 3: Choose the medical procedures you need an estimate for.</p>
                </div>
                <div className="flex space-x-1.5 pb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-teal"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-teal"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-health-border"></div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar: Categories */}
                <aside className="lg:w-1/4">
                    <div className="card-premium p-6">
                        <h4 className="text-[10px] font-bold text-health-text-muted uppercase tracking-widest mb-4">Categories</h4>

                        <div className="space-y-1">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setSelectedCategoryId(cat.id);
                                        setSearchQuery('');
                                    }}
                                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${selectedCategoryId === cat.id && !searchQuery
                                        ? 'bg-primary-teal/5 text-primary-teal border-l-4 border-primary-teal font-bold'
                                        : 'text-health-text-secondary hover:bg-health-bg'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className={selectedCategoryId === cat.id && !searchQuery ? 'text-primary-teal' : 'text-health-text-muted'}>
                                            {cat.icon}
                                        </span>
                                        <span className="text-sm">{cat.name}</span>
                                    </div>
                                    {cat.count > 0 && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${selectedCategoryId === cat.id && !searchQuery ? 'bg-primary-teal/20' : 'bg-health-border'
                                            }`}>
                                            {cat.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Main Panel: Procedures */}
                <main className="lg:w-3/4 space-y-8">
                    <div className="card-premium p-8">
                        <div className="relative mb-8">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                <Search className="text-health-text-muted" size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search procedures (e.g. MRI, Surgery, Heart)"
                                className="w-full pl-12 pr-4 py-4 bg-health-bg border border-health-border rounded-2xl text-lg focus:outline-none focus:border-primary-teal focus:bg-[#F0FCFC] transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h4 className="text-xs font-bold text-health-text-muted uppercase tracking-widest mb-4">
                                    {searchQuery ? `Search Results for "${searchQuery}"` : `${activeCategory.category} Procedures`}
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
                                        <p className="text-sm text-health-text-secondary italic">No procedures found matching your search.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Cards Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="card-premium p-6 flex flex-col items-center text-center">
                            <div className="p-3 bg-primary-teal/10 rounded-2xl text-primary-teal mb-4">
                                <Shield size={24} />
                            </div>
                            <h5 className="font-bold text-primary-navy mb-2">Estimate Accuracy</h5>
                            <p className="text-xs text-health-text-secondary">Based on real-world claims data and regional pricing averages.</p>
                        </div>
                        <div className="card-premium p-6 flex flex-col items-center text-center">
                            <div className="p-3 bg-primary-teal/10 rounded-2xl text-primary-teal mb-4">
                                <Lock size={24} />
                            </div>
                            <h5 className="font-bold text-primary-navy mb-2">Secure & Private</h5>
                            <p className="text-xs text-health-text-secondary">Your data is encrypted and used only for your cost estimation.</p>
                        </div>
                        <div className="card-premium p-6 flex flex-col items-center text-center">
                            <div className="p-3 bg-primary-teal/10 rounded-2xl text-primary-teal mb-4">
                                <TrendingDown size={24} />
                            </div>
                            <h5 className="font-bold text-primary-navy mb-2">Potential Savings</h5>
                            <p className="text-xs text-health-text-secondary">Users save an average of ₹45,000 by comparing regional providers.</p>
                        </div>
                    </div>
                </main>
            </div>

            {/* Sticky Bottom Bar */}
            <AnimatePresence>
                {selectedProcedures.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 bg-white border-t border-health-border px-4 py-4 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
                    >
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
                            <div className="flex flex-col mb-4 md:mb-0">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm font-bold text-primary-navy">Selected Procedures ({selectedProcedures.length})</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-teal"></div>
                                </div>
                                <div className="flex flex-wrap gap-x-2">
                                    {selectedProcedures.map((p, i) => (
                                        <span key={p} className="text-xs text-primary-teal font-medium">
                                            {p}{i < selectedProcedures.length - 1 ? ',' : ''}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={() => navigate('/cost-estimator/step-1')}
                                    className="px-6 py-2.5 text-health-text-secondary font-semibold hover:text-primary-navy transition-colors flex items-center space-x-2"
                                >
                                    <ChevronLeft size={18} />
                                    <span>Back</span>
                                </button>
                                <button
                                    onClick={() => navigate('/cost-estimator/results')}
                                    className="btn-primary flex items-center space-x-3 px-8"
                                >
                                    <span className="font-bold">Generate Estimate</span>
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};



export default SelectProcedures;
