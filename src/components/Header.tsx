import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, User, Plus } from 'lucide-react';

interface HeaderProps {
  user?: { name: string; email: string } | null;
  onLogin: () => void;
  onLogout: () => void;
  onAddItem: () => void;
}

export function Header({ user, onLogin, onLogout, onAddItem }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-red-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Campus Lost & Found</h1>
              <p className="text-sm text-gray-600">Reuniting students with their belongings</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <Button 
                  variant="campus" 
                  size="sm" 
                  onClick={onAddItem}
                  className="hidden sm:flex"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Report Item
                </Button>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-900 hidden sm:block">
                    {user.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="campus" onClick={onLogin}>
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}