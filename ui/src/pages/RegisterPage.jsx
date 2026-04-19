import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Utensils, UserPlus, Mail, Lock, User } from 'lucide-react';

export const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/register', { name, email, password });
            login(res.data.token, res.data.user);
            navigate('/menu');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex justify-center items-center py-12 px-4 bg-slate-50">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <UserPlus className="h-8 w-8 text-orange-500" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900">Create Account</h2>
                    <p className="text-slate-500 mt-2">Join FoodGenie to start ordering</p>
                </div>

                <Card className="w-full bg-white border-0 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <CardHeader className="pb-6 border-b border-slate-100 bg-slate-50/50">
                        <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                            <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                            Your Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 px-6 lg:px-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-start gap-2">
                                    <span className="font-semibold">Error:</span> {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-semibold" htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="name"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="pl-10 h-11 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-orange-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-semibold" htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 h-11 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-orange-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-700 font-semibold" htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 h-11 border-slate-200 bg-slate-50 hover:bg-white focus:bg-white focus:ring-orange-500 transition-colors"
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base rounded-xl transition-all shadow-md shadow-orange-500/20 disabled:bg-orange-300 mt-4"
                            >
                                {loading ? 'Creating Account...' : 'Sign Up'}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-8 pt-4 bg-white">
                        <p className="text-slate-500 font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition-colors">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};