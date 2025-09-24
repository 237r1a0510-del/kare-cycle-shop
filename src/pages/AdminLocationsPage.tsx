import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit, Trash2, MapPin, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Location {
  id: string;
  address: string;
  contact_person: string;
  phone: string;
  created_at: string;
}

export default function AdminLocationsPage() {
  const [refrigerators, setRefrigerators] = useState<Location[]>([]);
  const [biogasStations, setBiogasStations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [currentType, setCurrentType] = useState<'refrigerators' | 'biogas_stations'>('refrigerators');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    address: '',
    contact_person: '',
    phone: ''
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const [refrigeratorsData, biogasData] = await Promise.all([
        supabase.from('refrigerators').select('*').order('created_at', { ascending: false }),
        supabase.from('biogas_stations').select('*').order('created_at', { ascending: false })
      ]);

      if (refrigeratorsData.error) throw refrigeratorsData.error;
      if (biogasData.error) throw biogasData.error;

      setRefrigerators(refrigeratorsData.data || []);
      setBiogasStations(biogasData.data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Error",
        description: "Failed to load locations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const table = currentType;
      
      if (editingLocation) {
        const { error } = await supabase
          .from(table)
          .update(formData)
          .eq('id', editingLocation.id);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: `${currentType === 'refrigerators' ? 'Refrigerator' : 'Biogas Station'} updated successfully`,
        });
      } else {
        const { error } = await supabase
          .from(table)
          .insert([formData]);
        
        if (error) throw error;
        
        toast({
          title: "Success",
          description: `${currentType === 'refrigerators' ? 'Refrigerator' : 'Biogas Station'} added successfully`,
        });
      }
      
      setFormData({ address: '', contact_person: '', phone: '' });
      setEditingLocation(null);
      setIsDialogOpen(false);
      fetchLocations();
    } catch (error) {
      console.error('Error saving location:', error);
      toast({
        title: "Error",
        description: "Failed to save location",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      address: location.address,
      contact_person: location.contact_person,
      phone: location.phone
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string, type: 'refrigerators' | 'biogas_stations') => {
    if (!confirm(`Are you sure you want to delete this ${type === 'refrigerators' ? 'refrigerator' : 'biogas station'}?`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from(type)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: `${type === 'refrigerators' ? 'Refrigerator' : 'Biogas Station'} deleted successfully`,
      });
      
      fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
      toast({
        title: "Error",
        description: "Failed to delete location",
        variant: "destructive",
      });
    }
  };

  const LocationCard = ({ location, type }: { location: Location; type: 'refrigerators' | 'biogas_stations' }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            {type === 'refrigerators' ? 
              <MapPin className="h-5 w-5 text-blue-500 mt-1" /> : 
              <Zap className="h-5 w-5 text-green-500 mt-1" />
            }
            <div>
              <h3 className="font-medium text-sm mb-1">{location.address}</h3>
              <p className="text-sm text-gray-600">Contact: {location.contact_person}</p>
              <p className="text-sm text-gray-600">Phone: {location.phone}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentType(type);
                handleEdit(location);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDelete(location.id, type)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading locations...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Locations</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingLocation(null);
              setFormData({ address: '', contact_person: '', phone: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingLocation ? 'Edit' : 'Add'} {currentType === 'refrigerators' ? 'Refrigerator' : 'Biogas Station'}
              </DialogTitle>
            </DialogHeader>
            
            <Tabs value={currentType} onValueChange={(value) => setCurrentType(value as any)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="refrigerators">Refrigerator</TabsTrigger>
                <TabsTrigger value="biogas_stations">Biogas Station</TabsTrigger>
              </TabsList>
            </Tabs>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contact_person">Contact Person</Label>
                <Input
                  id="contact_person"
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLocation ? 'Update' : 'Add'} Location
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="refrigerators" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="refrigerators">
            <MapPin className="h-4 w-4 mr-2" />
            Refrigerators ({refrigerators.length})
          </TabsTrigger>
          <TabsTrigger value="biogas_stations">
            <Zap className="h-4 w-4 mr-2" />
            Biogas Stations ({biogasStations.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="refrigerators" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {refrigerators.map((location) => (
              <LocationCard 
                key={location.id} 
                location={location} 
                type="refrigerators"
              />
            ))}
            {refrigerators.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No refrigerators added yet
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="biogas_stations" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {biogasStations.map((location) => (
              <LocationCard 
                key={location.id} 
                location={location} 
                type="biogas_stations"
              />
            ))}
            {biogasStations.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-8">
                No biogas stations added yet
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}