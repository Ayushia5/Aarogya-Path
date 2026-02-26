import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Award } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6">Our Mission</h1>
                    <p className="text-lg text-health-text-secondary leading-relaxed">
                        Aarogya Path was founded on the belief that healthcare transparency is a fundamental right.
                        We empower patients across India with the data and intelligence they need to navigate
                        the healthcare system with confidence and financial security.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="card-premium p-8">
                        <div className="w-12 h-12 bg-primary-teal/10 rounded-xl flex items-center justify-center text-primary-teal mb-6">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-4">Integrity</h3>
                        <p className="text-health-text-secondary text-sm leading-relaxed">
                            We provide unbiased, data-driven cost estimates sourced from verified insurance claims data.
                        </p>
                    </div>
                    <div className="card-premium p-8">
                        <div className="w-12 h-12 bg-health-success/10 rounded-xl flex items-center justify-center text-health-success mb-6">
                            <Heart size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-4">Patient-First</h3>
                        <p className="text-health-text-secondary text-sm leading-relaxed">
                            Every decision we make is guided by how it helps patients achieve better healthcare outcomes.
                        </p>
                    </div>
                    <div className="card-premium p-8">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-500 mb-6">
                            <Users size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-4">Community</h3>
                        <p className="text-health-text-secondary text-sm leading-relaxed">
                            Our collective feedback system ensures accountability and excellence across all healthcare providers.
                        </p>
                    </div>
                    <div className="card-premium p-8">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-500 mb-6">
                            <Award size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-primary-navy mb-4">Excellence</h3>
                        <p className="text-health-text-secondary text-sm leading-relaxed">
                            We strive for the highest standards in data accuracy and user experience.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
