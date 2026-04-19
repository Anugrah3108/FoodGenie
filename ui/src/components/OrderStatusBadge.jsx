import React from 'react';
import { Badge } from './ui/badge';

export const OrderStatusBadge = ({ status }) => {
    const colors = {
        pending: 'bg-yellow-500',
        confirmed: 'bg-blue-500',
        delivered: 'bg-green-500',
        cancelled: 'bg-red-500',
    };

    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
};