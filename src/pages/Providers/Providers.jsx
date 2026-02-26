import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter, Grid, List, ChevronDown,
    Search, SlidersHorizontal, MapPin,
    Stethoscope, Star, Check
} from 'lucide-react';
import ProviderCard from '../../components/ProviderCard/ProviderCard';

const sampleProviders = [
    { id: 1, name: 'Dr. Sarah Jenkins', specialty: 'Cardiologist', yearsExp: 15, rating: 4.8, reviewCount: 124, hospital: 'Mercy General Hospital', city: 'Sacramento, CA', badge: 'Excellent' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist', yearsExp: 8, rating: 5.0, reviewCount: 89, hospital: 'Skin Health Center', city: 'San Francisco, CA', badge: 'Top Rated' },
    { id: 3, name: 'Dr. Emily Carter', specialty: 'Pediatrician', yearsExp: 12, rating: 4.2, reviewCount: 56, hospital: "Children's Medical Group", city: 'Oakland, CA' },
    { id: 4, name: 'Dr. David Ross', specialty: 'Orthopedist', yearsExp: 20, rating: 4.7, reviewCount: 210, hospital: 'Joint & Spine Institute', city: 'San Jose, CA', badge: 'Available Today' },
    { id: 5, name: 'Dr. Amanda Lee', specialty: 'General Practitioner', yearsExp: 6, rating: 4.1, reviewCount: 42, hospital: 'City Health Clinic', city: 'San Francisco, CA' },
    { id: 6, name: 'Dr. James Wilson', specialty: 'Neurologist', yearsExp: 25, rating: 4.9, reviewCount: 315, hospital: 'Brain & Spine Center', city: 'Palo Alto, CA', badge: 'Specialist' },
    { id: 7, name: 'Dr. Rebecca Tran', specialty: 'Optometrist', yearsExp: 5, rating: 4.5, reviewCount: 28, hospital: 'Vision Care Plus', city: 'Berkeley, CA' },
    { id: 8, name: 'Dr. Thomas Clark', specialty: 'Dentist', yearsExp: 10, rating: 4.9, reviewCount: 92, hospital: 'Bright Smile Dental', city: 'San Francisco, CA', badge: 'High Demand' },
];

const FilterPill = ({ label, active = false }) => (
    <button className={`px-4 py-2 rounded-full border text-sm font-semibold flex items-center space-x-2 transition-all ${active
        ? 'bg-primary-teal/5 border-primary-teal text-primary-teal'
        : 'bg-white border-health-border text-health-text-secondary hover:border-health-text-muted'
        }`}>
        <span>{label}</span>
        <ChevronDown size={14} className={active ? 'text-primary-teal' : 'text-health-text-muted'} />
    </button>
);

const Providers = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0 text-center md:text-left">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Find a Provider</h1>
                    <p className="text-health-text-secondary text-lg">Compare highly rated specialized healthcare providers in your region.</p>
                </div>
                <div className="text-sm font-bold text-health-text-muted uppercase tracking-widest">
                    Showing <span className="text-primary-navy">124 results</span>
                </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-health-border">
                <div className="flex flex-wrap gap-3">
                    <FilterPill label="All Specialists" active={true} />
                    <FilterPill label="Top Rated" />
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
                </div>
            </div>

            {/* Provider Grid */}
            <div className={`grid gap-8 ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                : 'grid-cols-1'
                }`}>
                {sampleProviders.map((provider, index) => (
                    <ProviderCard key={provider.id} provider={provider} index={index} />
                ))}
            </div>

            {/* Load More removed for clean flow */}
        </div>
    );
};

export default Providers;
