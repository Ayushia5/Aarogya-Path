import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Mail, Eye, EyeOff, Shield, ArrowRight,
    Chrome, Plus
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginWithEmail, loginWithGoogle } from '../../services/auth';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError('');
        try {
            await loginWithEmail(data.email, data.password);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate(from, { replace: true });
        } catch (err) {
            setError('Google sign-in failed.');
        }
    };

    return (
        <div className="min-h-screen bg-health-bg flex items-center justify-center p-6 relative overflow-hidden">
            {/* Medical Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-teal/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-navy/5 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-md w-full"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-3 mb-8 group">
                        <div className="bg-primary-teal p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                            <Plus className="text-white" size={20} strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-black text-primary-navy tracking-tighter">HealthClear</span>
                    </Link>
                    <h1 className="text-3xl font-black text-primary-navy tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-health-text-secondary font-medium">Empowering your healthcare journey.</p>
                </div>

                <div className="card-premium p-10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-teal to-primary-navy"></div>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`w-full px-5 py-3.5 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.email ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="name@company.com"
                                />
                                <Mail
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-health-text-muted"
                                    size={18}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-health-text-muted uppercase tracking-[0.2em] mb-2 px-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className={`w-full px-5 py-3.5 bg-health-bg/50 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-4 focus:ring-primary-teal/5 ${
                                        errors.password ? 'border-health-danger' : 'border-health-border focus:border-primary-teal'
                                    }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-health-text-muted hover:text-primary-teal transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-health-danger text-[10px] font-bold mt-1.5 px-1 uppercase tracking-wider">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between px-1 font-bold">
                            <label className="flex items-center space-x-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="w-5 h-5 rounded-lg border-health-border text-primary-teal focus:ring-primary-teal transition-all cursor-pointer"
                                />
                                <span className="text-xs text-health-text-secondary group-hover:text-primary-navy transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-xs text-primary-teal hover:text-primary-teal-dark transition-colors"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {error && (
                            <motion.div
                                animate={{ x: [0, -4, 4, -4, 4, 0] }}
                                className="bg-health-danger/5 border border-health-danger/20 p-4 rounded-xl text-health-danger text-[11px] font-black text-center uppercase tracking-widest leading-relaxed"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-4 text-sm tracking-[0.1em] uppercase font-black"
                        >
                            <span>{isLoading ? 'Processing...' : 'Sign In To Account'}</span>
                            {!isLoading && <ArrowRight size={18} className="ml-2" />}
                        </button>

                        <div className="relative flex items-center justify-center py-4">
                            <div className="border-t border-health-border w-full"></div>
                            <span className="absolute bg-[#F8FAFC] px-4 text-[10px] font-black text-health-text-muted tracking-[0.3em] uppercase">
                                OR
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center space-x-3 py-3.5 bg-white border border-health-border rounded-2xl hover:bg-health-bg hover:shadow-xl transition-all shadow-sm group"
                        >
                            <Chrome size={20} className="text-health-danger group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-black text-primary-navy tracking-tight">Continue with Google</span>
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-xs font-bold text-health-text-secondary">
                            New to HealthClear?{' '}
                            <Link to="/signup" className="text-primary-teal hover:underline hover:underline-offset-4 transition-all pb-1 font-black">
                                Create free account
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center space-x-6">
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-health-text-muted uppercase tracking-widest">
                        <Shield size={14} className="text-primary-teal" />
                        <span>AES-256 Secured</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
