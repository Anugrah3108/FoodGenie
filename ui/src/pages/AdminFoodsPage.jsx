import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const AdminFoodsPage = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState({ name: '', description: '', price: '', category: '', imageUrl: '', available: true });

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const res = await api.get('/foods');
            setFoods(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (currentFood._id) {
                await api.put(`/foods/${currentFood._id}`, currentFood);
            } else {
                await api.post('/foods', currentFood);
            }
            setIsDialogOpen(false);
            fetchFoods();
        } catch (err) {
            alert('Failed to save food item');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this food item?')) {
            try {
                await api.delete(`/foods/${id}`);
                fetchFoods();
            } catch (err) {
                alert('Failed to delete food item');
            }
        }
    };

    const openDialog = (food = null) => {
        if (food) setCurrentFood({ ...food });
        else setCurrentFood({ name: '', description: '', price: '', category: '', imageUrl: '', available: true });
        setIsDialogOpen(true);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Food Items</h1>
                <Button onClick={() => openDialog()} className="bg-slate-900 hover:bg-slate-800 text-white">Add New Food</Button>
            </div>

            {loading ? <p>Loading...</p> : (
                <Table className="bg-white border rounded">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {foods.map(food => (
                            <TableRow key={food._id}>
                                <TableCell>
                                    {food.imageUrl ? <img src={food.imageUrl} alt={food.name} className="w-12 h-12 rounded object-cover" /> : 'No Image'}
                                </TableCell>
                                <TableCell className="font-bold">{food.name}</TableCell>
                                <TableCell>{food.category}</TableCell>
                                <TableCell>${food.price.toFixed(2)}</TableCell>
                                <TableCell>{food.available ? <span className="text-green-600 font-bold">Available</span> : <span className="text-red-600 font-bold">Out of Stock</span>}</TableCell>
                                <TableCell className="text-right flex gap-2 justify-end">
                                    <Button variant="outline" size="sm" onClick={() => openDialog(food)} className="border-blue-500 text-blue-600 bg-blue-50 hover:bg-blue-100">Edit</Button>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(food._id)} className="bg-red-500 text-white hover:bg-red-600">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{currentFood._id ? 'Edit Food Item' : 'Add Food Item'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input value={currentFood.name} onChange={(e) => setCurrentFood({ ...currentFood, name: e.target.value })} required />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input value={currentFood.description} onChange={(e) => setCurrentFood({ ...currentFood, description: e.target.value })} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Price</Label>
                                <Input type="number" step="0.01" value={currentFood.price} onChange={(e) => setCurrentFood({ ...currentFood, price: parseFloat(e.target.value) })} required />
                            </div>
                            <div>
                                <Label>Category</Label>
                                <Input value={currentFood.category} onChange={(e) => setCurrentFood({ ...currentFood, category: e.target.value })} required />
                            </div>
                        </div>
                        <div>
                            <Label>Image URL</Label>
                            <Input value={currentFood.imageUrl} onChange={(e) => setCurrentFood({ ...currentFood, imageUrl: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="available" checked={currentFood.available} onChange={(e) => setCurrentFood({ ...currentFood, available: e.target.checked })} />
                            <Label htmlFor="available">Available to order</Label>
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};