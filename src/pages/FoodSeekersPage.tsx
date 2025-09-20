import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Utensils, Users, MapPin, Clock, Heart, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const FoodSeekersPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationType: '',
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    peopleServed: '',
    foodRequirement: '',
    preferredTime: '',
    specialRequirements: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Save to contact_submissions for admin notification
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          subject: 'Food Seeker Registration',
          message: `Organization: ${formData.organizationName}\nType: ${formData.organizationType}\nPeople Served: ${formData.peopleServed}\nFood Requirement: ${formData.foodRequirement}\nPreferred Time: ${formData.preferredTime}\nSpecial Requirements: ${formData.specialRequirements}\nAddress: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\nMessage: ${formData.message}`
        });

      if (error) throw error;

      toast({
        title: "Registration Successful! 🎉",
        description: "Thank you for registering. We'll contact you when food is available.",
      });

      // Reset form
      setFormData({
        organizationType: '',
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        peopleServed: '',
        foodRequirement: '',
        preferredTime: '',
        specialRequirements: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Food Distribution Network</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with our food distribution network to help feed communities in need
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Utensils className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold">5000+</h3>
              <p className="text-muted-foreground">Meals Distributed</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">100+</h3>
              <p className="text-muted-foreground">Organizations Served</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">25+</h3>
              <p className="text-muted-foreground">Distribution Points</p>
            </CardContent>
          </Card>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Who Can Apply?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• NGOs and charitable organizations</li>
                <li>• Orphanages and old age homes</li>
                <li>• Schools and educational institutions</li>
                <li>• Community centers</li>
                <li>• Religious institutions</li>
                <li>• Homeless shelters</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Distribution Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Daily: 12:00 PM - 2:00 PM</li>
                <li>• Evening: 6:00 PM - 8:00 PM</li>
                <li>• Advance booking required</li>
                <li>• Emergency support available</li>
                <li>• Weekend special programs</li>
                <li>• Festival meal programs</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Food Seeker Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Organization Details</h3>
                
                <div>
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select 
                    value={formData.organizationType} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, organizationType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                      <SelectItem value="orphanage">Orphanage</SelectItem>
                      <SelectItem value="oldage">Old Age Home</SelectItem>
                      <SelectItem value="school">School/Educational</SelectItem>
                      <SelectItem value="community">Community Center</SelectItem>
                      <SelectItem value="religious">Religious Institution</SelectItem>
                      <SelectItem value="shelter">Homeless Shelter</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter organization name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Contact person name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Location Details</h3>
                
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Complete address with landmarks"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      placeholder="123456"
                    />
                  </div>
                </div>
              </div>

              {/* Food Requirements */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Food Requirements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="peopleServed">Number of People Served Daily *</Label>
                    <Select 
                      value={formData.peopleServed} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, peopleServed: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of people" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-25">1-25 people</SelectItem>
                        <SelectItem value="26-50">26-50 people</SelectItem>
                        <SelectItem value="51-100">51-100 people</SelectItem>
                        <SelectItem value="101-200">101-200 people</SelectItem>
                        <SelectItem value="200+">More than 200 people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="foodRequirement">Meal Type Required *</Label>
                    <Select 
                      value={formData.foodRequirement} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, foodRequirement: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lunch">Lunch Only</SelectItem>
                        <SelectItem value="dinner">Dinner Only</SelectItem>
                        <SelectItem value="both">Both Lunch & Dinner</SelectItem>
                        <SelectItem value="breakfast">Breakfast</SelectItem>
                        <SelectItem value="all">All Meals</SelectItem>
                        <SelectItem value="snacks">Snacks/Light Meals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredTime">Preferred Collection Time</Label>
                  <Select 
                    value={formData.preferredTime} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                      <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialRequirements">Special Dietary Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    placeholder="Any special dietary requirements, allergies, or preferences..."
                    rows={3}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Additional Information</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your organization and food distribution needs..."
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? 'Submitting...' : 'Register for Food Distribution'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Emergency Food Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              For urgent food requirements or emergency situations, contact us directly:
            </p>
            <div className="space-y-2 text-sm">
              <p><strong>Emergency Hotline:</strong> +91 98765 43210</p>
              <p><strong>WhatsApp:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> emergency@karesave.org</p>
              <p><strong>Available:</strong> 24/7 for emergency situations</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FoodSeekersPage;