import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Mail, Eye, EyeOff, Shield, ArrowRight,
    Github, Chrome // Using Chrome as Google icon placeholder if Lucide doesn't have Google
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
            // Shake animation effect could be added here via a state
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
        <div className="min-h-screen pt-0 bg-[#E8EEF3] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#0B9E9E 0.5px, transparent 0.5px)`,
                    backgroundSize: '24px 24px'
                }}>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] relative z-10"
            >
                {/* Left Panel: Teal Gradient */}
                <div className="md:w-1/2 bg-gradient-to-br from-[#0B6E6E] to-[#0A9E9E] p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Subtle background decoration */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>

                    <div>
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm"
                        >
                            <Shield size={32} />
                        </motion.div>
                        <motion.h1
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6"
                        >
                            Redefining Healthcare <br /> Transparency with <span className="text-[#A5F3FC]">Aarogya Path</span>
                        </motion.h1>
                        <motion.p
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/80 text-lg max-w-sm"
                        >
                            Empowering patients with clear cost estimates and provider comparisons for a smarter healthcare journey.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center space-x-4"
                    >
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <img
                                    key={i}
                                    src={`https://i.pravatar.cc/100?u=${i}`}
                                    alt="Avatar"
                                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-white/90">
                            Trusted by 10k+ providers
                        </p>
                    </motion.div>
                </div>

                {/* Right Panel: Form */}
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                    <div className="mb-10 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-primary-navy mb-2">Welcome Back</h2>
                        <p className="text-health-text-secondary">Please enter your details to sign in.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-health-text-secondary mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`input-standard pr-10 ${errors.email ? 'border-health-danger' : ''}`}
                                    placeholder="name@company.com"
                                />
                                <Mail
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-health-text-muted"
                                    size={18}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-health-danger text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-health-text-secondary mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password')}
                                    className={`input-standard pr-10 ${errors.password ? 'border-health-danger' : ''}`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-health-text-muted hover:text-primary-teal focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-health-danger text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    {...register('rememberMe')}
                                    className="w-4 h-4 rounded border-health-border text-primary-teal focus:ring-primary-teal transition-colors cursor-pointer"
                                />
                                <span className="text-sm text-health-text-secondary group-hover:text-primary-teal transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-primary-teal hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        {error && (
                            <motion.div
                                animate={{ x: [0, -5, 5, -5, 5, 0] }}
                                transition={{ duration: 0.4 }}
                                className="text-health-danger text-sm font-medium text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full flex items-center justify-center space-x-2 py-3 disabled:opacity-70"
                        >
                            <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                            {!isLoading && <ArrowRight size={18} />}
                        </button>

                        <div className="relative flex items-center justify-center py-2">
                            <div className="border-t border-health-border w-full"></div>
                            <span className="absolute bg-white px-4 text-xs font-bold text-health-text-muted tracking-widest">
                                OR CONTINUE WITH
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="flex items-center justify-center space-x-2 py-2.5 border border-health-border rounded-xl hover:bg-health-bg transition-colors font-semibold text-health-text-secondary"
                            >
                                <Chrome size={18} className="text-health-danger" />
                                <span>Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center space-x-2 py-2.5 border border-health-border rounded-xl hover:bg-health-bg transition-colors font-semibold text-health-text-secondary"
                            >
                                <Github size={18} className="text-primary-navy" />
                                <span>GitHub</span>
                            </button>
                        </div>

                        <p className="text-center text-sm text-health-text-secondary pt-4">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary-teal font-bold hover:underline">
                                Sign up for free
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
