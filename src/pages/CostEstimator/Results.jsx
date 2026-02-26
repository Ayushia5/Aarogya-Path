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

const Results = () => {
    const { selectedProcedures } = useEstimatorStore();

    // Map procedure names to cost ranges for display
    const procedureData = selectedProcedures.map(name => ({
        name,
        cost: name === 'ECG' ? '₹4,500 - ₹12,000' :
            name === 'Cardiac Catheterization' ? '₹28,000 - ₹45,000' :
                name === 'Angioplasty' ? '₹9,500 - ₹11,000' : '₹5,000 - ₹15,000'
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-4xl font-bold text-primary-navy tracking-tight mb-2">Estimation Results</h1>
                    <p className="text-health-text-secondary">Based on your selected procedures and insurance profile.</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-health-border rounded-xl text-sm font-semibold text-health-text-secondary hover:bg-health-bg transition-all">
                        <Download size={16} />
                        <span>PDF Export</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-health-border rounded-xl text-sm font-semibold text-health-text-secondary hover:bg-health-bg transition-all">
                        <Share2 size={16} />
                        <span>Share</span>
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
                    <RiskGauge value={45} label="MEDIUM RISK" color="#F5A623" />
                    <div className="mt-8 space-y-4 w-full">
                        <div className="flex justify-between text-sm py-2 border-b border-health-border">
                            <span className="text-health-text-secondary">Risk Score</span>
                            <span className="font-bold text-primary-navy">45 / 100</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-health-border">
                            <span className="text-health-text-secondary">Regional Avg.</span>
                            <span className="font-bold text-primary-navy">₹52,000</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span className="text-health-text-secondary">Potential Savings</span>
                            <span className="font-bold text-primary-teal">₹12,500</span>
                        </div>
                    </div>
                    <p className="mt-8 text-xs text-health-text-muted">
                        Your risk score is calculated based on provider availability, procedure complexity, and insurance coverage.
                    </p>
                </motion.div>

                {/* Cost Comparison Section */}
                <div className="lg:col-span-2 space-y-8">
                    <AlertBanner
                        type="warning"
                        title="Medium Financial Risk Warning"
                        message="Your out-of-pocket costs may exceed your annual deductible. Consider checking our verified payment plans to reduce immediate risk."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CostComparisonCard
                            type="public"
                            priceRange="₹42,000 - ₹68,000"
                            isBestValue={true}
                        />
                        <CostComparisonCard
                            type="private"
                            priceRange="₹1,25,000 - ₹1,80,000"
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
                                * Prices are estimates based on regional averages and do not include hospital facility fees.
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
        </div>
    );
};

export default Results;
