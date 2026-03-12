import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Mail, Eye, EyeOff, Shield, ArrowRight, User,
    Chrome, Plus
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmail, loginWithGoogle } from '../../services/auth';

const signupSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await registerWithEmail(data.email, data.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (err) {
            setError('Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen bg-health-bg flex items-center justify-center p-6 relative overflow-hidden">
            {/* Medical Background Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-teal/5 rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-navy/5 rounded-full blur-[150px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-xl w-full"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                        <div className="bg-primary-teal p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                            <Plus className="text-white" size={20} strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-black text-primary-navy tracking-tighter">HealthClear</span>
                    </Link>
                    <h1 className="text-3xl font-black text-primary-navy tracking-tight mb-2">Create Account</h1>
                    <p className="text-health-text-secondary font-medium">Join 15,000+ patients managing costs with Aarogya Path.</p>
                </div>

                <div className="card-premium p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-teal to-primary-navy"></div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    {...register('firstName')}
                                    className={`w-full px-5 py-3 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.firstName ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="Jane"
                                />
                                {errors.firstName && (
                                    <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    {...register('lastName')}
                                    className={`w-full px-5 py-3 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.lastName ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="Doe"
                                />
                                {errors.lastName && (
                                    <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`w-full px-5 py-3 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.email ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="jane.doe@example.com"
                                />
                                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-health-text-muted" size={18} />
                            </div>
                            {errors.email && (
                                <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        className={`w-full px-5 py-3 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                            errors.password ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                        }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-health-text-muted hover:text-primary-teal"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.password.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                    Confirm
                                </label>
                                <input
                                    type="password"
                                    {...register('confirmPassword')}
                                    className={`w-full px-5 py-3 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.confirmPassword ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && (
                                    <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="pt-2">
                            {error && (
                                <div className="bg-health-danger/5 border border-health-danger/20 p-4 rounded-xl text-health-danger text-[11px] font-black text-center uppercase tracking-widest leading-relaxed mb-4">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full py-4 text-sm tracking-[0.1em] uppercase font-black shadow-lg shadow-primary-teal/20"
                            >
                                <span>{isLoading ? 'Creating Account...' : 'Get Started Now'}</span>
                                {!isLoading && <ArrowRight size={18} className="ml-2" />}
                            </button>
                        </div>

                        <div className="relative flex items-center justify-center py-2">
                            <div className="border-t border-health-border w-full"></div>
                            <span className="absolute bg-[#F8FAFC] px-4 text-[10px] font-black text-health-text-muted tracking-[0.3em] uppercase">
                                OR
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center space-x-3 py-3 bg-white border border-health-border rounded-2xl hover:bg-health-bg hover:shadow-xl transition-all shadow-sm"
                        >
                            <Chrome size={18} className="text-health-danger" />
                            <span className="text-sm font-black text-primary-navy tracking-tight">Sign up with Google</span>
                        </button>
                    </form>

                    <div className="mt-8 text-center pt-4 border-t border-health-border border-dashed">
                        <p className="text-xs font-bold text-health-text-secondary">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-teal hover:underline hover:underline-offset-4 transition-all font-black">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-6 opacity-60">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-health-text-muted uppercase tracking-widest">
                        <Shield size={14} className="text-primary-teal" />
                        <span>Data Protected</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
