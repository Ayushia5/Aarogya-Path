import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Info, ChevronRight } from 'lucide-react';
import StepProgress from '../../components/StepProgress/StepProgress';
import { useNavigate } from 'react-router-dom';
import useEstimatorStore from '../../stores/useEstimatorStore';

const PatientProfile = () => {
    const navigate = useNavigate();
    const { patientData, setPatientData } = useEstimatorStore();
    const income = patientData.income || 75000;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-primary-navy mb-1">Check My Risk</h1>
                <p className="text-health-text-secondary">Provide your details to get a personalized cost estimate.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium overflow-hidden"
            >
                <div className="p-8">
                    <StepProgress
                        currentStep={1}
                        totalSteps={3}
                        title="Patient Profile"
                        nextTitle="Medical History"
                    />

                    {/* Hero Banner */}
                    <div className="relative h-32 rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-primary-navy to-primary-teal flex items-center px-8">
                        <div className="z-10">
                            <h3 className="text-xl font-bold text-white mb-1">Demographics & Insurance</h3>
                            <p className="text-white/70 text-sm">Help us understand your coverage and eligibility.</p>
                        </div>
                        {/* 3D Geometric Decoration Placeholder */}
                        <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-24 h-24 border-4 border-white rotate-12"></div>
                            <div className="absolute top-1/4 right-16 w-12 h-12 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <form className="space-y-10">
                        {/* Personal Information */}
                        <section>
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="p-2 bg-primary-teal/10 rounded-lg text-primary-teal">
                                    <User size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-primary-navy">Personal Information</h4>
                                <div className="flex-grow border-t border-health-border ml-4"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-health-text-secondary mb-2">First Name</label>
                                    <input type="text" defaultValue="Jane" className="input-standard" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-health-text-secondary mb-2">Last Name</label>
                                    <input type="text" defaultValue="Doe" className="input-standard" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-health-text-secondary mb-2">Date of Birth</label>
                                    <input type="date" defaultValue="1988-03-15" className="input-standard" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-health-text-secondary mb-2">Zip Code</label>
                                    <input type="text" defaultValue="94102" className="input-standard" />
                                </div>
                            </div>
                        </section>

                        {/* Financial Details */}
                        <section>
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="p-2 bg-primary-teal/10 rounded-lg text-primary-teal">
                                    <DollarSign size={20} />
                                </div>
                                <h4 className="text-lg font-bold text-primary-navy">Financial Details</h4>
                                <div className="flex-grow border-t border-health-border ml-4"></div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-sm font-semibold text-health-text-secondary">Annual Household Income</label>
                                        <span className="text-xl font-bold text-primary-navy tabular-nums">{formatCurrency(income)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="250000"
                                        step="5000"
                                        value={income}
                                        onChange={(e) => setPatientData({ income: Number(e.target.value) })}
                                        className="w-full h-2 bg-health-border rounded-full appearance-none cursor-pointer accent-primary-teal"
                                    />
                                    <div className="flex justify-between mt-2 text-[10px] font-bold text-health-text-muted uppercase tracking-wider">
                                        <span>₹0</span>
                                        <span>₹12.5L</span>
                                        <span>₹25L+</span>
                                    </div>
                                </div>

                                <div className="bg-health-bg/50 p-4 rounded-xl border border-health-border flex items-start space-x-3">
                                    <Info size={18} className="text-primary-teal mt-0.5 shrink-0" />
                                    <p className="text-xs text-health-text-secondary leading-relaxed">
                                        Used to calculate sliding scale eligibility and maximum out-of-pocket estimates.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-health-text-secondary mb-2">Insurance Provider</label>
                                        <select className="input-standard appearance-none">
                                            <option value="blue-shield">Blue Shield</option>
                                            <option value="kaiser">Kaiser Permanente</option>
                                            <option value="aetna">Aetna</option>
                                            <option value="united">UnitedHealthcare</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-health-text-secondary mb-2">Member ID</label>
                                        <input type="text" defaultValue="XYZ-123456789" className="input-standard" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Bottom Actions */}
                        <div className="flex justify-between items-center pt-6 border-t border-health-border">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-2.5 text-health-text-secondary font-semibold hover:text-primary-navy transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/cost-estimator/results')}
                                className="btn-primary flex items-center space-x-2"
                            >
                                <span>Generate Accuracy Estimate</span>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientProfile;
