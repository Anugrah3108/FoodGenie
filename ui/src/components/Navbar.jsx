import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from './ui/button';
import { Menu, X, ShoppingBag, LogOut, User, LayoutDashboard, Utensils } from 'lucide-react';

export const Navbar = () => {
    const { user, logout } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/login');
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex justify-between items-center">
                <Link to="/menu" className="text-2xl font-bold flex items-center gap-2 text-white hover:text-slate-200 transition-colors">
                    <Utensils className="h-6 w-6 text-orange-500" />
                    FoodGenie
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/menu" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <Utensils className="h-4 w-4" /> Menu
                            </Link>
                            <Link to="/orders" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
                                <ShoppingBag className="h-4 w-4" /> My Orders
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin/foods" className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors">
                                    <LayoutDashboard className="h-4 w-4" /> Manage
                                </Link>
                            )}
                            <div className="h-6 border-l border-slate-700 mx-2"></div>
                            <span className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                                <User className="h-4 w-4" /> {user.name?.split(' ')[0] || 'User'}
                            </span>
                            <Button variant="outline" onClick={handleLogout} className="bg-transparent border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white flex items-center gap-2">
                                <LogOut className="h-4 w-4" />
                                Logout
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login">
                                <Button variant="ghost" className="text-slate-200 hover:text-white hover:bg-slate-800">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white border-0">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pb-6 pt-2 space-y-4 absolute w-full shadow-xl">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-slate-300 pb-3 mb-1 border-b border-slate-800 font-medium">
                                <User className="h-4 w-4 text-orange-400" /> {user.name}
                            </div>
                            <Link to="/menu" onClick={() => setIsOpen(false)} className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-800 text-slate-200 transition">
                                <Utensils className="h-5 w-5" /> Menu
                            </Link>
                            <Link to="/orders" onClick={() => setIsOpen(false)} className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-800 text-slate-200 transition">
                                <ShoppingBag className="h-5 w-5" /> My Orders
                            </Link>
                            {user.role === 'admin' && (
                                <Link to="/admin/foods" onClick={() => setIsOpen(false)} className="flex items-center gap-3 w-full p-2 rounded-md font-semibold text-yellow-400 hover:bg-slate-800 transition">
                                    <LayoutDashboard className="h-5 w-5" /> Manage Foods
                                </Link>
                            )}
                            <Button onClick={handleLogout} variant="outline" className="w-full mt-4 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white flex flex-row items-center gap-2 justify-center">
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 mt-2">
                            <Link to="/login" onClick={() => setIsOpen(false)}>
                                <Button variant="outline" className="w-full bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 outline-none">Login</Button>
                            </Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};