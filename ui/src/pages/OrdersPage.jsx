import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { OrderStatusBadge } from '../components/OrderStatusBadge';
import { Card } from '../components/ui/card';
import { Skeleton } from '../components/ui/skeleton';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/orders').then(res => {
            setOrders(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    return (
        <div className="container mx-auto p-4 lg:p-8 max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <ShoppingBag className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order History</h1>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full rounded-xl bg-slate-200" />)}
                </div>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">No orders yet</h2>
                    <p className="text-slate-500 mt-2">Looks like you haven\\'t placed any orders yet.</p>
                    <button onClick={() => navigate('/menu')} className="mt-6 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors">Start Ordering</button>
                </div>
            ) : (
                <Card className="bg-white border-slate-100 shadow-lg shadow-slate-200/50 rounded-2xl overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50/80">
                            <TableRow className="border-slate-100 hover:bg-transparent">
                                <TableHead className="font-bold text-slate-700 py-4 pl-6">Order ID</TableHead>
                                <TableHead className="font-bold text-slate-700">Date</TableHead>
                                <TableHead className="font-bold text-slate-700">Status</TableHead>
                                <TableHead className="font-bold text-slate-700 text-right pr-6">Total Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map(order => (
                                <TableRow
                                    key={order._id}
                                    className="hover:bg-slate-50 cursor-pointer border-slate-100 transition-colors"
                                    onClick={() => navigate(`/orders/${order._id}`)}
                                >
                                    <TableCell className="text-orange-600 font-medium pl-6 py-4">#{order._id.slice(-6)}</TableCell>
                                    <TableCell className="text-slate-600 font-medium">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                                    <TableCell className="text-right font-bold text-slate-900 pr-6">${order.totalPrice.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
};