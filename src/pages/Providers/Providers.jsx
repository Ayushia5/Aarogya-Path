import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter, Grid, List, ChevronDown,
    Search, SlidersHorizontal, MapPin,
    Stethoscope, Star, Check, Building2, Sparkles
} from 'lucide-react';
import ProviderCard from '../../components/ProviderCard/ProviderCard';
import HospitalCard from '../../components/ProviderCard/HospitalCard';

import { sampleProviders, sampleHospitals, infrastructureGaps } from '../../data/providersData';

const FilterPill = ({ label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center space-x-2 transition-all ${active
            ? 'bg-primary-teal/5 border-primary-teal text-primary-teal'
            : 'bg-white border-health-border text-health-text-secondary hover:border-health-text-muted'
            }`}>
        <span>{label}</span>
        <ChevronDown size={14} className={active ? 'text-primary-teal' : 'text-health-text-muted'} />
    </button>
);

const Providers = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeTab, setActiveTab] = useState('doctors'); // 'doctors' or 'hospitals'

    const filteredProviders = activeFilter === 'Top Rated'
        ? sampleProviders.filter(p => p.rating >= 4.7)
        : sampleProviders;

    const bestHospital = sampleHospitals.find(h => h.id === 'h3'); // Manipal Dwarka
    const bestDoctor = sampleProviders.find(p => p.id === '3'); // Dr Rohan, Dwarka

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0 text-center md:text-left">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Find Medical Care</h1>
                    <p className="text-health-text-secondary text-lg">Compare specialized doctors and premier hospitals across Delhi.</p>
                </div>
                <div className="flex bg-health-bg p-1 rounded-xl border border-health-border">
                    <button
                        onClick={() => setActiveTab('doctors')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'doctors' ? 'bg-white text-primary-teal shadow-sm' : 'text-health-text-muted hover:text-primary-navy'}`}
                    >
                        <Stethoscope size={16} /> Doctors
                    </button>
                    <button
                        onClick={() => setActiveTab('hospitals')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${activeTab === 'hospitals' ? 'bg-white text-primary-teal shadow-sm' : 'text-health-text-muted hover:text-primary-navy'}`}
                    >
                        <Building2 size={16} /> Hospitals
                    </button>
                </div>
            </div>

            {/* Filter Row */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'hospitals' && bestHospital && bestDoctor && (
                        <div className="mb-8 p-6 bg-gradient-to-r from-primary-teal/10 to-transparent border border-primary-teal/20 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm">
                            <div className="flex-1 shrink-0">
                                <h3 className="flex items-center gap-2 text-lg font-bold text-primary-navy mb-2">
                                    <Sparkles size={20} className="text-primary-teal" /> AI Best Value Match
                                </h3>
                                <p className="text-sm text-health-text-secondary leading-relaxed">
                                    Based on high cleanliness ({bestHospital.cleanlinessScore}/10), zero affordable ward gaps, and expert staff.
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-health-border flex items-center gap-4 flex-1">
                                <div className="text-left w-full">
                                    <p className="text-xs font-bold text-health-text-muted uppercase tracking-widest mb-1">Recommended</p>
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-primary-navy">{bestHospital.name}</p>
                                        <span className="text-primary-teal font-bold text-sm">₹2,500</span>
                                    </div>
                                    <p className="text-xs text-health-text-secondary mt-1">w/ {bestDoctor.name}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-health-border">
                        <div className="flex flex-wrap gap-3">
                            <FilterPill
                                label={activeTab === 'doctors' ? "All Specialists" : "All Facilities"}
                                active={activeFilter === 'All'}
                                onClick={() => setActiveFilter('All')}
                            />
                            {activeTab === 'doctors' && (
                                <FilterPill
                                    label="Top Rated"
                                    active={activeFilter === 'Top Rated'}
                                    onClick={() => setActiveFilter('Top Rated')}
                                />
                            )}
                        </div>

                <div className="flex items-center space-x-4">
                    <div className="flex p-1 bg-health-bg border border-health-border rounded-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary-teal' : 'text-health-text-muted'}`}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary-teal' : 'text-health-text-muted'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>

                    <div className="text-sm font-bold text-health-text-muted uppercase tracking-widest bg-health-bg px-4 py-2 rounded-xl border border-health-border hidden lg:block">
                        Showing <span className="text-primary-navy">{activeTab === 'doctors' ? filteredProviders.length : sampleHospitals.length} results</span>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <motion.div 
                        className={`grid gap-8 ${viewMode === 'grid'
                            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                            : 'grid-cols-1'
                            }`}
                    >
                        {activeTab === 'doctors' ? (
                            filteredProviders.map((provider, index) => (
                                <ProviderCard key={provider.id} provider={provider} index={index} />
                            ))
                        ) : (
                            sampleHospitals.map((hospital, index) => (
                                <HospitalCard key={hospital.id} hospital={hospital} index={index} />
                            ))
                        )}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            {/* Load More removed for clean flow */}
        </div>
    );
};

export default Providers;
