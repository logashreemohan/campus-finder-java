import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { ItemCard } from '@/components/ItemCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/easwari-campus-bg.jpg';

interface DashboardProps {
  user: { name: string; email: string };
  onLogout: () => void;
  onAddItem: () => void;
}

export function Dashboard({ user, onLogout, onAddItem }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'lost' | 'found'>('all');
  const { toast } = useToast();

  // Sample data - in a real app, this would come from an API
  const items = [
    {
      id: '1',
      title: 'Blue iPhone 13',
      description: 'Lost my blue iPhone 13 with a clear case. Last seen in the library on the second floor.',
      type: 'lost' as const,
      location: 'Main Library - 2nd Floor',
      date: '2 days ago',
      contactName: 'Sarah Johnson',
      image: undefined
    },
    {
      id: '2',
      title: 'Black Backpack',
      description: 'Found a black Jansport backpack near the science building. Contains textbooks and notebooks.',
      type: 'found' as const,
      location: 'Science Building Entrance',
      date: '1 day ago',
      contactName: 'Mike Chen',
      image: undefined
    },
    {
      id: '3',
      title: 'Silver MacBook Pro',
      description: 'Lost silver MacBook Pro 13-inch. Has stickers on the lid. Very important for my thesis work.',
      type: 'lost' as const,
      location: 'Student Union - Study Area',
      date: '3 days ago',
      contactName: 'Emily Rodriguez',
      image: undefined
    },
    {
      id: '4',
      title: 'Red Water Bottle',
      description: 'Found a red Hydro Flask water bottle in the gym locker room.',
      type: 'found' as const,
      location: 'Recreation Center',
      date: '4 hours ago',
      contactName: 'Alex Thompson',
      image: undefined
    },
    {
      id: '5',
      title: 'Calculator TI-84',
      description: 'Lost my graphing calculator during math exam. Name "Jessica" written on the back.',
      type: 'lost' as const,
      location: 'Mathematics Building - Room 204',
      date: '1 week ago',
      contactName: 'Jessica Williams',
      image: undefined
    },
    {
      id: '6',
      title: 'Car Keys',
      description: 'Found a set of car keys with a Honda keychain near the parking lot.',
      type: 'found' as const,
      location: 'Parking Lot B',
      date: '6 hours ago',
      contactName: 'David Park',
      image: undefined
    }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleContact = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    toast({
      title: "Contact Information",
      description: `You can reach ${item?.contactName} through the campus messaging system.`,
    });
  };

  const lostCount = items.filter(item => item.type === 'lost').length;
  const foundCount = items.filter(item => item.type === 'found').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        onLogin={() => {}} 
        onLogout={onLogout} 
        onAddItem={onAddItem}
      />
      
      {/* Hero Section */}
      <div 
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SRM Easwari Engineering College
            </h1>
            <p className="text-xl mb-6 text-gray-200">
              Campus Lost and Found System
            </p>
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
                {lostCount} Lost Items
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-lg">
                {foundCount} Found Items
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for items, locations, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
              />
            </div>
            <div className="flex items-center gap-3">
              <Filter className="text-gray-400 w-5 h-5" />
              <Select value={filterType} onValueChange={(value: 'all' | 'lost' | 'found') => setFilterType(value)}>
                <SelectTrigger className="w-40 border-gray-300 focus:border-red-500 focus:ring-red-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Items</SelectItem>
                  <SelectItem value="lost">Lost Items</SelectItem>
                  <SelectItem value="found">Found Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              {...item}
              onContact={handleContact}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Be the first to report a lost or found item!'
              }
            </p>
            <Button variant="campus" onClick={onAddItem}>
              Report an Item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}