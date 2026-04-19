import React from 'react';
import { Card, CardContent, CardTitle, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const FoodCard = ({ food, onAdd }) => (
    <Card className="flex flex-col h-full bg-white hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden group">
        <div className="h-[200px] w-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden relative">
            {food.imageUrl ? (
                <img
                    src={food.imageUrl}
                    alt={food.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <span className="font-medium text-slate-500">No Image</span>
            )}
            <Badge className="absolute top-3 left-3 bg-white/90 text-slate-900 border-none backdrop-blur-sm shadow-sm font-semibold hover:bg-white">
                {food.category}
            </Badge>
        </div>
        <CardContent className="flex-1 p-5">
            <div className="flex justify-between items-start mb-2 gap-2">
                <CardTitle className="text-xl font-bold leading-tight text-slate-900">{food.name}</CardTitle>
                <span className="font-bold text-lg text-orange-600">${food.price.toFixed(2)}</span>
            </div>
            <p className="text-slate-600 text-sm line-clamp-2 mt-2 leading-relaxed">{food.description}</p>
        </CardContent>
        <CardFooter className="p-5 pt-0 mt-auto">
            <Button
                onClick={() => onAdd(food)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl h-11 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!food.available}
            >
                {food.available ? (
                    <>
                        <Plus className="w-4 h-4" /> Add to Order
                    </>
                ) : 'Out of Stock'}
            </Button>
        </CardFooter>
    </Card>
);