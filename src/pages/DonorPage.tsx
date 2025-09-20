import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HandHeart, Users, Leaf, Building, Home, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DonorPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorType: '',
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    donationInterest: '',
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
      const { error } = await supabase
        .from('donors')
        .insert({
          donor_type: formData.donorType,
          organization_name: formData.organizationName,
          contact_person: formData.contactPerson,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        });

      if (error) throw error;

      // Also save to contact_submissions for admin notification
      await supabase
        .from('contact_submissions')
        .insert({
          name: formData.contactPerson || formData.organizationName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Donor Registration',
          message: `Donor Type: ${formData.donorType}\nOrganization: ${formData.organizationName}\nInterest: ${formData.donationInterest}\nMessage: ${formData.message}`
        });

      toast({
        title: "Registration Successful! 🎉",
        description: "Thank you for your interest in donating. We'll contact you soon.",
      });

      // Reset form
      setFormData({
        donorType: '',
        organizationName: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        donationInterest: '',
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
              <HandHeart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Become a Donor</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Support our mission to create a sustainable future through your generous contributions
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <HandHeart className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold">200+</h3>
              <p className="text-muted-foreground">Active Donors</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">₹50L+</h3>
              <p className="text-muted-foreground">Funds Raised</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">1000+</h3>
              <p className="text-muted-foreground">Lives Impacted</p>
            </CardContent>
          </Card>
        </div>

        {/* Donation Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Individual Donor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Personal contributions to support our eco-friendly initiatives and community programs.
              </p>
              <ul className="text-sm space-y-1">
                <li>• Monthly/Annual donations</li>
                <li>• One-time contributions</li>
                <li>• Product sponsorships</li>
                <li>• Event participation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Corporate Donor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Business partnerships for CSR initiatives and sustainable development projects.
              </p>
              <ul className="text-sm space-y-1">
                <li>• CSR funding</li>
                <li>• Equipment donations</li>
                <li>• Employee volunteering</li>
                <li>• Brand partnerships</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Donor Registration Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Donor Type */}
              <div>
                <Label htmlFor="donorType">Donor Type *</Label>
                <Select 
                  value={formData.donorType} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, donorType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select donor type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual Donor</SelectItem>
                    <SelectItem value="corporate">Corporate Donor</SelectItem>
                    <SelectItem value="foundation">Foundation/Trust</SelectItem>
                    <SelectItem value="ngo">NGO/Non-Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Organization Details */}
              {(formData.donorType === 'corporate' || formData.donorType === 'foundation' || formData.donorType === 'ngo') && (
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
              )}

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactPerson">
                      {formData.donorType === 'individual' ? 'Full Name *' : 'Contact Person *'}
                    </Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter contact person name"
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

                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="House/Office Address, Street, Landmark"
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

              {/* Donation Interest */}
              <div>
                <Label htmlFor="donationInterest">Areas of Interest</Label>
                <Select 
                  value={formData.donationInterest} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, donationInterest: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select area of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vermicompost">Vermicompost Production</SelectItem>
                    <SelectItem value="biogas">Biogas Plant Setup</SelectItem>
                    <SelectItem value="eco-products">Eco-friendly Products</SelectItem>
                    <SelectItem value="education">Environmental Education</SelectItem>
                    <SelectItem value="community">Community Development</SelectItem>
                    <SelectItem value="general">General Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your interest in donating..."
                  rows={4}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? 'Submitting...' : 'Register as Donor'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Why Donate */}
        <Card className="mt-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-green-600" />
              Why Your Donation Matters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Environmental Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Every donation helps reduce waste and carbon footprint
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Community Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Support local communities with sustainable solutions
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Infrastructure Building</h4>
                    <p className="text-sm text-muted-foreground">
                      Help build biogas plants and composting facilities
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <HandHeart className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium">Social Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Create employment and improve quality of life
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DonorPage;