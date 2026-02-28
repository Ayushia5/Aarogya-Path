import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronLeft, Download, Share2,
    HelpCircle, AlertTriangle, CheckCircle2,
    Calendar, CreditCard
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import useEstimatorStore from '../../stores/useEstimatorStore';
import RiskGauge from '../../components/RiskGauge/RiskGauge';
import CostComparisonCard from '../../components/CostComparisonCard/CostComparisonCard';
import AlertBanner from '../../components/AlertBanner/AlertBanner';

import { medicalProcedures } from '../../data/medicalProcedures';

const Results = () => {
    const { selectedProcedures, patientData } = useEstimatorStore();
    const navigate = useNavigate();

    const allProceduresFlat = medicalProcedures.flatMap(cat => cat.procedures);

    // Map procedure names to actual data
    const procedureDetails = selectedProcedures.map(name => {
        const data = allProceduresFlat.find(p => p.name === name);
        return data || { name, minCost: 5000, maxCost: 15000 };
    });

    const formatINR = (val) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(val);
    };

    const procedureData = procedureDetails.map(proc => ({
        name: proc.name,
        cost: `${formatINR(proc.minCost)} - ${formatINR(proc.maxCost)}`
    }));

    // Dynamic Risk Logic
    const totalMinCost = procedureDetails.reduce((sum, p) => sum + p.minCost, 0);
    const totalMaxCost = procedureDetails.reduce((sum, p) => sum + p.maxCost, 0);
    const avgTotalCost = (totalMinCost + totalMaxCost) / 2;

    const monthlyIncome = (patientData.income || 75000) / 12;

    // Risk Score: How many months of income does this cost? 
    // Let's say 0.5 month = low, 1 month = medium, 2+ months = high
    // Score = (avgTotalCost / monthlyIncome) * 20 (so 5 months = score 100)
    const riskScoreRaw = (avgTotalCost / (monthlyIncome || 1)) * 20;
    const riskScore = Math.min(Math.round(riskScoreRaw), 100);

    let riskStatus = "SAFE ZONE";
    let riskColor = "#4CAF7D";
    let alertType = "success";
    let alertTitle = "Low Financial Risk";
    let alertMsg = "Your estimated healthcare costs are well within your financial capacity. Standard insurance coverage should be sufficient.";

    if (riskScore >= 40) {
        riskStatus = "HIGH RISK";
        riskColor = "#E05252";
        alertType = "danger";
        alertTitle = "High Financial Risk Warning";
        alertMsg = "Estimated costs represent a significant portion of your annual income. We strongly recommend exploring financial assistance or verified payment plans.";
    } else if (riskScore >= 15) {
        riskStatus = "MEDIUM RISK";
        riskColor = "#F5A623";
        alertType = "warning";
        alertTitle = "Medium Financial Risk Warning";
        alertMsg = "Your out-of-pocket costs may exceed your monthly savings capacity. Consider checking our verified payment plans to reduce immediate risk.";
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Estimation Results</h1>
                    <p className="text-health-text-secondary">Based on your selected procedures and insurance profile.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center space-x-2 px-4 py-2 bg-white border border-health-border rounded-xl text-sm font-semibold text-health-text-secondary hover:bg-health-bg transition-all no-print"
                    >
                        <Download size={16} />
                        <span>PDF Export</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Risk Analysis Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 card-premium p-8 flex flex-col items-center justify-center text-center"
                >
                    <h4 className="text-xs font-bold text-health-text-muted uppercase tracking-widest mb-8">Financial Risk Analysis</h4>
                    <RiskGauge value={riskScore} label={riskStatus} color={riskColor} />
                    <div className="mt-8 space-y-4 w-full">
                        <div className="flex justify-between text-sm py-2 border-b border-health-border">
                            <span className="text-health-text-secondary">Risk Score</span>
                            <span className="font-bold text-primary-navy">{riskScore} / 100</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-health-border">
                            <span className="text-health-text-secondary">Est. Minimum</span>
                            <span className="font-bold text-primary-navy">{formatINR(totalMinCost)}</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span className="text-health-text-secondary">Est. Maximum</span>
                            <span className="font-bold text-primary-navy">{formatINR(totalMaxCost)}</span>
                        </div>
                    </div>
                    <p className="mt-8 text-xs text-health-text-muted">
                        Your risk score is calculated based on total estimated cost relative to your reported annual income.
                    </p>
                </motion.div>

                {/* Cost Comparison Section */}
                <div className="lg:col-span-2 space-y-8">
                    <AlertBanner
                        type={alertType}
                        title={alertTitle}
                        message={alertMsg}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CostComparisonCard
                            type="public"
                            priceRange={`${formatINR(totalMinCost * 0.15)} - ${formatINR(totalMinCost * 0.4)}`}
                            isBestValue={true}
                        />
                        <CostComparisonCard
                            type="private"
                            priceRange={`${formatINR(totalMinCost)} - ${formatINR(totalMaxCost)}`}
                            isBestValue={false}
                        />
                    </div>

                    {/* Procedure Breakdown Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-premium overflow-hidden"
                    >
                        <div className="p-6 border-b border-health-border flex justify-between items-center">
                            <h4 className="font-bold text-primary-navy">Procedure Breakdown</h4>
                            <Link to="/cost-estimator/step-2" className="text-sm font-semibold text-primary-teal hover:underline">
                                Edit List
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-health-bg/50">
                                    <tr>
                                        <th className="px-6 py-3 text-xs font-bold text-health-text-muted uppercase tracking-widest">Procedure Name</th>
                                        <th className="px-6 py-3 text-xs font-bold text-health-text-muted uppercase tracking-widest text-right">Estimated Range</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-health-border">
                                    {procedureData.map((proc, idx) => (
                                        <tr key={idx} className="hover:bg-health-bg/20 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-lg bg-primary-teal/10 flex items-center justify-center text-primary-teal">
                                                        <CheckCircle2 size={16} />
                                                    </div>
                                                    <span className="text-sm font-semibold text-primary-navy">{proc.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-sm font-bold text-primary-navy tabular-nums">{proc.cost}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-health-bg/30 text-center">
                            <p className="text-[10px] text-health-text-muted uppercase tracking-tighter">
                                * Prices are estimates based on regional averages and provided data. Public system costs are projected co-pays.
                            </p>
                        </div>
                    </motion.div>

                    {/* Suggestion Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="card-premium p-6 flex flex-col md:flex-row items-center justify-between border-primary-teal shadow-primary-teal/5 bg-primary-teal/[0.02]"
                    >
                        <div className="flex items-center space-x-4 mb-4 md:mb-0">
                            <div className="w-12 h-12 rounded-full bg-primary-teal flex items-center justify-center text-white shadow-lg">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h5 className="font-bold text-primary-navy">Lower your monthly risk</h5>
                                <p className="text-xs text-health-text-secondary">You may qualify for a 0% interest payment plan spread over 12 months.</p>
                            </div>
                        </div>
                        <button className="btn-primary !py-2 !px-6 text-sm shrink-0 whitespace-nowrap">
                            Check Eligibility
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-health-border">
                <button
                    onClick={() => navigate('/cost-estimator/step-2')}
                    className="flex items-center space-x-2 text-health-text-secondary font-semibold hover:text-primary-navy transition-colors"
                >
                    <ChevronLeft size={18} />
                    <span>Back to Procedures</span>
                </button>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/providers')}
                        className="btn-outline !py-2.5"
                    >
                        Find Local Providers
                    </button>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="btn-primary !py-2.5"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    .no-print, nav, footer, button, .btn-primary, .btn-outline {
                        display: none !important;
                    }
                    .card-premium {
                        box-shadow: none !important;
                        border: 1px solid #E2E8F0 !important;
                    }
                    body {
                        background: white !important;
                        padding: 0 !important;
                    }
                    .max-w-7xl {
                        max-width: 100% !important;
                        width: 100% !important;
                        padding: 0 !important;
                    }
                }
            `}} />
        </div>
    );
};

export default Results;
