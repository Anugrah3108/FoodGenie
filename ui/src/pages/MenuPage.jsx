import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { FoodCard } from '../components/FoodCard';
import { Skeleton } from '../components/ui/skeleton';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, ArrowRight, X, Utensils } from 'lucide-react';

export const MenuPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/foods').then(res => {
            setFoods(res.data.filter(f => f.available));
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const addToCart = (food) => {
        setCart(prev => {
            const existing = prev.find(item => item.foodItem === food._id);
            if (existing) {
                return prev.map(item => item.foodItem === food._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { foodItem: food._id, name: food.name, unitPrice: food.price, quantity: 1, imageUrl: food.imageUrl }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (foodId) => {
        setCart(prev => prev.filter(item => item.foodItem !== foodId));
    };

    const placeOrder = async () => {
        try {
            const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
            const address = prompt('Enter your delivery address:');
            if (!address) return;

            const payload = {
                items: cart.map(item => ({ foodItem: item.foodItem, quantity: item.quantity, unitPrice: item.unitPrice })),
                totalPrice,
                address
            };

            await api.post('/orders', payload);
            setCart([]);
            setIsCartOpen(false);
            alert('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            alert("Failed to place order. Please try logging in if you haven't.");
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="bg-slate-50 min-h-screen relative">
            <div className="container mx-auto p-4 lg:p-8 flex flex-col lg:flex-row gap-8 relative items-start">

                {/* Main Menu Grid */}
                <div className="flex-1 w-full">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Our Menu</h1>
                            <p className="text-slate-500 mt-2 text-sm lg:text-base">Explore our wide variety of delicious food items.</p>
                        </div>
                        {/* Mobile Cart Toggle */}
                        <Button
                            onClick={() => setIsCartOpen(!isCartOpen)}
                            variant="outline"
                            className="lg:hidden relative border-slate-300 text-slate-700 bg-white hover:bg-slate-100"
                        >
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-[380px] rounded-xl bg-slate-200/60" />)}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-24 lg:pb-0">
                            {foods.map(food => <FoodCard key={food._id} food={food} onAdd={addToCart} />)}
                        </div>
                    )}
                </div>

                {/* Sidebar Cart */}
                <div className={`
                    fixed lg:sticky top-0 lg:top-24 right-0 h-screen lg:h-[calc(100vh-120px)] w-full sm:w-[400px] lg:w-[350px] xl:w-[400px]
                    bg-white shadow-2xl lg:shadow-xl lg:rounded-2xl border-l lg:border border-slate-200 
                    transition-transform duration-300 z-40 transform
                    flex flex-col
                    ${isCartOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:flex'}
                `}>
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50 backdrop-blur-sm lg:rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Your Order</h2>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-800 p-2">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                                <ShoppingCart className="w-16 h-16 text-slate-300 mb-4" />
                                <p className="text-slate-500 font-medium">Your cart is feeling a bit light.</p>
                                <p className="text-slate-400 pl-4 pr-4 mt-2 text-sm">Add some delicious items from our menu to get started.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {cart.map(item => (
                                    <div key={item.foodItem} className="flex justify-between items-center group">
                                        <div className="flex gap-4 items-center flex-1">
                                            {item.imageUrl ? (
                                                <img src={item.imageUrl} alt={item.name} className="w-14 h-14 object-cover rounded-lg shadow-sm" />
                                            ) : (
                                                <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center">
                                                    <Utensils className="w-6 h-6 text-slate-400" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold text-slate-800 leading-tight">{item.name}</p>
                                                <div className="mt-1 flex items-center gap-2">
                                                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">Qty {item.quantity}</span>
                                                    <span className="text-sm font-medium text-slate-500">x ${item.unitPrice.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2 ml-4">
                                            <span className="font-bold text-slate-900">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                                            <button onClick={() => removeFromCart(item.foodItem)} className="text-slate-300 hover:text-red-500 transition-colors">
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 border-t border-slate-100 bg-slate-50 lg:rounded-b-2xl">
                            <div className="flex justify-between text-lg font-bold text-slate-800 mb-6">
                                <span>Total Price:</span>
                                <span className="text-orange-600">${cartTotal.toFixed(2)}</span>
                            </div>
                            <Button
                                onClick={placeOrder}
                                className="w-full bg-orange-500 text-white hover:bg-orange-600 h-14 text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                            >
                                Checkout <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Overlay for mobile cart */}
                {isCartOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
                        onClick={() => setIsCartOpen(false)}
                    />
                )}
            </div>
        </div>
    );
};