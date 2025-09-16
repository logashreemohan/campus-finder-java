import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User } from 'lucide-react';

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  type: 'lost' | 'found';
  location: string;
  date: string;
  image?: string;
  contactName: string;
  onContact: (id: string) => void;
}

export function ItemCard({ 
  id, 
  title, 
  description, 
  type, 
  location, 
  date, 
  image, 
  contactName, 
  onContact 
}: ItemCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-red-200 bg-white">
      <div className="aspect-[4/3] bg-gray-100 rounded-t-lg overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-6xl text-gray-400">📷</div>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">{title}</h3>
          <Badge 
            variant={type === 'lost' ? 'destructive' : 'default'}
            className={type === 'lost' ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}
          >
            {type === 'lost' ? 'Lost' : 'Found'}
          </Badge>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        
        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-red-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2 text-red-500" />
            <span>Posted by {contactName}</span>
          </div>
        </div>
        
        <Button 
          variant="campus-outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={() => onContact(id)}
        >
          Contact
        </Button>
      </CardContent>
    </Card>
  );
}