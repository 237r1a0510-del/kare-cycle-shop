import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Leaf, Users, Building, DollarSign, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DonationPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationPurpose, setDonationPurpose] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    pan: ''
  });

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const donationCauses = [
    { id: 'vermicompost', name: 'Vermicompost Production', icon: Leaf, description: 'Support organic farming initiatives' },
    { id: 'biogas', name: 'Biogas Plant Setup', icon: Building, description: 'Clean energy solutions for communities' },
    { id: 'education', name: 'Environmental Education', icon: Users, description: 'Awareness programs and workshops' },
    { id: 'community', name: 'Community Development', icon: Heart, description: 'General community welfare programs' }
  ];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const getDonationAmount = () => {
    return customAmount ? parseInt(customAmount) : parseInt(selectedAmount);
  };

  const handleDonorInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleDonate = async () => {
    setIsLoading(true);
    
    try {
      const amount = getDonationAmount();
      if (!amount || amount < 100) {
        toast({
          title: "Invalid Amount",
          description: "Minimum donation amount is ₹100",
          variant: "destructive"
        });
        return;
      }

      // Save donation information
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: donorInfo.name,
          email: donorInfo.email,
          phone: donorInfo.phone,
          subject: 'Donation Request',
          message: `Donation Amount: ₹${amount}\nPurpose: ${donationPurpose}\nPAN: ${donorInfo.pan}`
        });

      if (error) throw error;

      toast({
        title: "Donation Initiated! 💖",
        description: "Thank you for your generosity. Our team will contact you shortly.",
      });

      // Reset form
      setSelectedAmount('');
      setCustomAmount('');
      setDonationPurpose('');
      setDonorInfo({ name: '', email: '', phone: '', pan: '' });

    } catch (error) {
      console.error('Donation error:', error);
      toast({
        title: "Donation Failed",
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
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Make a Donation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your contribution helps us create a more sustainable and caring world
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-4">
              <DollarSign className="h-6 w-6 text-primary mx-auto mb-1" />
              <h3 className="text-lg font-bold">₹50L+</h3>
              <p className="text-xs text-muted-foreground">Raised</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Users className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <h3 className="text-lg font-bold">1000+</h3>
              <p className="text-xs text-muted-foreground">Lives Impacted</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Leaf className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <h3 className="text-lg font-bold">25T</h3>
              <p className="text-xs text-muted-foreground">CO₂ Saved</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4">
              <Building className="h-6 w-6 text-orange-600 mx-auto mb-1" />
              <h3 className="text-lg font-bold">50+</h3>
              <p className="text-xs text-muted-foreground">Projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="space-y-6">
            {/* Donation Causes */}
            <Card>
              <CardHeader>
                <CardTitle>Choose a Cause</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {donationCauses.map((cause) => {
                    const IconComponent = cause.icon;
                    return (
                      <div
                        key={cause.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          donationPurpose === cause.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setDonationPurpose(cause.id)}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          <div>
                            <h4 className="font-medium">{cause.name}</h4>
                            <p className="text-sm text-muted-foreground">{cause.description}</p>
                          </div>
                          {donationPurpose === cause.id && (
                            <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Donation Amount */}
            <Card>
              <CardHeader>
                <CardTitle>Select Donation Amount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount.toString() ? "default" : "outline"}
                      onClick={() => handleAmountSelect(amount)}
                      className="h-12"
                    >
                      ₹{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
                
                <div>
                  <Label htmlFor="customAmount">Custom Amount</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    min="100"
                  />
                </div>

                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">
                    ₹{getDonationAmount()?.toLocaleString() || 0}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Donation Amount</p>
                </div>
              </CardContent>
            </Card>

            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={donorInfo.name}
                      onChange={handleDonorInfoChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={donorInfo.email}
                      onChange={handleDonorInfoChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={donorInfo.phone}
                      onChange={handleDonorInfoChange}
                      required
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Number (for 80G receipt)</Label>
                    <Input
                      id="pan"
                      name="pan"
                      value={donorInfo.pan}
                      onChange={handleDonorInfoChange}
                      placeholder="ABCDE1234F"
                      maxLength={10}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Summary & Action */}
          <div className="space-y-6">
            {/* Donation Summary */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Donation Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Cause:</span>
                    <span className="font-medium">
                      {donationPurpose ? 
                        donationCauses.find(c => c.id === donationPurpose)?.name : 
                        'Not selected'
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">₹{getDonationAmount()?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Tax Benefit (80G):</span>
                    <span>₹{Math.round((getDonationAmount() || 0) * 0.5).toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  onClick={handleDonate}
                  disabled={isLoading || !donationPurpose || !getDonationAmount() || !donorInfo.name || !donorInfo.email}
                  className="w-full" 
                  size="lg"
                >
                  {isLoading ? 'Processing...' : 'Donate Now'}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure donation processing. You'll receive a tax-deductible receipt.
                </p>
              </CardContent>
            </Card>

            {/* Tax Benefits */}
            <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Tax Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                  <li>• 50% tax deduction under Section 80G</li>
                  <li>• Official receipt provided for all donations</li>
                  <li>• Registered non-profit organization</li>
                  <li>• Transparent fund utilization</li>
                </ul>
              </CardContent>
            </Card>

            {/* Impact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {getDonationAmount() >= 500 && (
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-600" />
                      <span>Can support 1 family's composting setup</span>
                    </div>
                  )}
                  {getDonationAmount() >= 1000 && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>Can provide training to 5 farmers</span>
                    </div>
                  )}
                  {getDonationAmount() >= 5000 && (
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <span>Can contribute to biogas plant setup</span>
                    </div>
                  )}
                  {getDonationAmount() >= 10000 && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Can sponsor community awareness program</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;