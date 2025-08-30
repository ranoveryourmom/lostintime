import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function InventoryApp() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', size: '', quantity: '', price: '', images: [], date: '' });

  const addItem = () => {
    setItems([...items, { ...newItem, id: Date.now(), quantity: parseInt(newItem.quantity), price: parseFloat(newItem.price), date: new Date().toISOString() }]);
    setNewItem({ name: '', size: '', quantity: '', price: '', images: [], date: '' });
  };

  const downloadCSV = () => {
    const header = 'Name,Size,Quantity,Price,Date\n';
    const rows = items.map(i => `${i.name},${i.size},${i.quantity},${i.price},${format(new Date(i.date), 'yyyy-MM-dd')}`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'inventory.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewItem({ ...newItem, images: files });
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#2E6F58' }}>
      <div className="text-4xl font-bold text-center text-white mb-6">Lost in Time Inventory</div>

      <div className="bg-white p-4 rounded shadow-md max-w-2xl mx-auto mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
          <Input placeholder="Size" value={newItem.size} onChange={e => setNewItem({ ...newItem, size: e.target.value })} />
          <Input type="number" placeholder="Quantity" value={newItem.quantity} onChange={e => setNewItem({ ...newItem, quantity: e.target.value })} />
          <Input type="number" placeholder="Price" value={newItem.price} onChange={e => setNewItem({ ...newItem, price: e.target.value })} />
          <Input type="file" multiple onChange={handleImageUpload} />
        </div>
        <Button onClick={addItem} className="w-full"> <Plus className="mr-2" /> Add Item </Button>
      </div>

      <div className="text-right mb-4 max-w-2xl mx-auto">
        <Button variant="secondary" onClick={downloadCSV}> <Download className="mr-2" /> Export CSV </Button>
      </div>

      <div className="grid gap-4 max-w-2xl mx-auto">
        {items.map(item => (
          <Card key={item.id} className={`border-l-4 ${item.quantity < 5 ? 'border-red-500' : 'border-green-500'}`}>
            <CardContent className="p-4">
              <div className="font-bold text-lg">{item.name}</div>
              <div className="text-sm">Size: {item.size} | Qty: {item.quantity} | Price: ${item.price.toFixed(2)}</div>
              <div className="text-xs text-gray-500">Added: {format(new Date(item.date), 'yyyy-MM-dd')}</div>
              {item.images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {item.images.map((img, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(img)}
                      alt={`item-img-${i}`}
                      className="w-full h-24 object-cover rounded cursor-pointer hover:scale-105 transition"
                      onClick={() => window.open(URL.createObjectURL(img), '_blank')}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}