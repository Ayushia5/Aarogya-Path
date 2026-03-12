import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Info, ChevronRight, MapPin } from 'lucide-react';
import StepProgress from '../../components/StepProgress/StepProgress';
import { useNavigate } from 'react-router-dom';
import useEstimatorStore from '../../stores/useEstimatorStore';
import { db, auth } from '../../services/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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

    const [formError, setFormError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            if (auth.currentUser && !patientData.firstName) {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPatientData({
                        firstName: data.firstName || auth.currentUser.displayName?.split(' ')[0] || '',
                        lastName: data.lastName || auth.currentUser.displayName?.split(' ')[1] || '',
                        zipCode: data.address?.match(/\b\d{5}\b/)?.[0] || data.address || '',
                        dob: data.dob || '',
                        insurance: data.insurance || '',
                        memberId: data.memberId || '',
                        income: data.income || 75000
                    });
                }
            }
        };
        fetchUserData();
    }, [auth.currentUser, patientData.firstName]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-premium p-10 md:p-16 relative overflow-hidden"
            >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-teal/5 rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>
                
                <div className="mb-12">
                    <span className="text-[10px] font-black text-primary-teal uppercase tracking-[0.3em] mb-4 block">Step 01 / 03</span>
                    <h2 className="text-4xl md:text-5xl font-black text-primary-navy tracking-tighter leading-none mb-6">
                        Patient <span className="text-gradient">Information</span>
                    </h2>
                    <p className="text-health-text-secondary text-lg font-medium leading-relaxed">
                        Please provide the accurate details of the patient to ensure we generate the most precise cost risk analysis.
                    </p>
                </div>

                {formError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-5 bg-health-danger/5 border-l-4 border-health-danger text-health-danger rounded-xl flex items-center space-x-3"
                    >
                        <Info size={20} className="shrink-0" />
                        <span className="text-sm font-bold">{formError}</span>
                    </motion.div>
                )}

                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">First Name</label>
                            <input
                                type="text"
                                value={patientData.firstName || ''}
                                onChange={(e) => setPatientData({ firstName: e.target.value })}
                                className="input-standard"
                                placeholder="Enter first name"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">Last Name</label>
                            <input
                                type="text"
                                value={patientData.lastName || ''}
                                onChange={(e) => setPatientData({ lastName: e.target.value })}
                                className="input-standard"
                                placeholder="Enter last name"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">Date of Birth</label>
                            <input
                                type="date"
                                value={patientData.dob || ''}
                                onChange={(e) => setPatientData({ dob: e.target.value })}
                                className="input-standard"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">Location Zip Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={patientData.zipCode || ''}
                                    onChange={(e) => setPatientData({ zipCode: e.target.value })}
                                    className="input-standard pl-12"
                                    placeholder="e.g. 110001"
                                />
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-teal" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="p-10 bg-health-bg/50 rounded-[40px] border border-health-border space-y-10">
                        <div className="flex justify-between items-center">
                             <h4 className="text-sm font-black text-primary-navy uppercase tracking-widest flex items-center">
                                <DollarSign className="mr-3 text-primary-teal" size={18} /> Financial & Insurance Coverage
                            </h4>
                            <div className="text-right">
                                <span className="text-[10px] font-black text-health-text-muted uppercase tracking-widest block mb-1">Annual Range</span>
                                <span className="text-lg font-black text-primary-navy">{formatCurrency(income)}</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <input
                                type="range"
                                min="0"
                                max="2500000"
                                step="10000"
                                value={income}
                                onChange={(e) => setPatientData({ income: Number(e.target.value) })}
                                className="w-full h-2 bg-health-border rounded-full appearance-none cursor-pointer accent-primary-teal shadow-inner"
                            />
                            <div className="flex justify-between text-[10px] font-black text-health-text-muted uppercase tracking-wider">
                                <span>₹0</span>
                                <span>₹12.5L</span>
                                <span>₹25L+</span>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">Insurance Provider</label>
                                <select 
                                    value={patientData.insurance || ''} 
                                    onChange={e => setPatientData({ insurance: e.target.value })} 
                                    className="input-standard appearance-none"
                                >
                                    <option value="">Select Provider</option>
                                    <option value="star-health">Star Health</option>
                                    <option value="lic">LIC Health</option>
                                    <option value="max-bupa">Max Bupa</option>
                                    <option value="care">Care Health</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black text-primary-navy uppercase tracking-widest ml-1">Member ID (Optional)</label>
                                <input
                                    type="text"
                                    value={patientData.memberId || ''}
                                    onChange={(e) => setPatientData({ memberId: e.target.value })}
                                    className="input-standard"
                                    placeholder="ID number"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex border-t border-health-border items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className="text-xs font-black text-health-text-muted hover:text-primary-navy transition-colors uppercase tracking-[0.2em]"
                        >
                            Cancel Analysis
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                if (!patientData.firstName || !patientData.lastName || !patientData.dob || !patientData.zipCode) {
                                    setFormError("Please fill in first name, last name, date of birth, and zip code.");
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    return;
                                }
                                setFormError('');
                                if(auth.currentUser) {
                                    const firebaseData = {
                                        firstName: patientData.firstName,
                                        lastName: patientData.lastName,
                                        dob: patientData.dob,
                                        address: patientData.zipCode,
                                        insurance: patientData.insurance || '',
                                        memberId: patientData.memberId || '',
                                        income: patientData.income || 75000
                                    };
                                    setDoc(doc(db, 'users', auth.currentUser.uid), firebaseData, { merge: true });
                                }
                                navigate('/cost-estimator/step-2');
                            }}
                            className="btn-primary px-12 group shadow-2xl shadow-primary-teal/20"
                        >
                            <span>Next Step</span>
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientProfile;
