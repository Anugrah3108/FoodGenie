import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { OrderStatusBadge } from '../components/OrderStatusBadge';

export const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/orders/${id}`).then(res => {
            setOrder(res.data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    const cancelOrder = async () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                await api.delete(`/orders/${id}`);
                alert('Order cancelled');
                navigate('/orders');
            } catch (err) {
                alert('Failed to cancel order');
            }
        }
    };

    if (loading) return <div className="p-4">Loading...</div>;
    if (!order) return <div className="p-4">Order not found</div>;

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Card className="bg-white border">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Order #{order._id.slice(-6)}</CardTitle>
                        <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleString()}</p>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <h3 className="font-bold text-lg border-b pb-2 mb-2">Delivery Address</h3>
                        <p>{order.address}</p>
                    </div>
                    <div className="mb-6">
                        <h3 className="font-bold text-lg border-b pb-2 mb-2">Items</h3>
                        <ul className="space-y-3">
                            {order.items.map(item => (
                                <li key={item._id} className="flex justify-between items-center">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">{item.foodItem?.name || 'Unknown Food Item'}</span>
                                        <span className="text-sm text-gray-500">{item.quantity} x ${item.unitPrice.toFixed(2)}</span>
                                    </div>
                                    <span className="font-bold text-gray-900">${(item.quantity * item.unitPrice).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold border-t pt-4">
                        <span>Total</span>
                        <span>${order.totalPrice.toFixed(2)}</span>
                    </div>
                    {order.status === 'pending' && (
                        <Button onClick={cancelOrder} className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white">Cancel Order</Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};