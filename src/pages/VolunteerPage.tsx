import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Users, Leaf, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const VolunteerPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    experienceLevel: '',
    availability: '',
    skills: [] as string[],
    motivation: ''
  });

  const skillOptions = [
    'Environmental Education',
    'Composting & Organic Farming',
    'Community Outreach',
    'Event Organization',
    'Social Media Marketing',
    'Photography/Videography',
    'Fundraising',
    'Data Analysis',
    'Technical Support',
    'Translation Services'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skill: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skill]
        : prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('volunteers')
        .insert({
          location: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
          experience_level: formData.experienceLevel,
          availability: formData.availability,
          skills: formData.skills
        });

      if (error) throw error;

      // Also save to contact_submissions for admin notification
      await supabase
        .from('contact_submissions')
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          subject: 'Volunteer Application',
          message: `Experience: ${formData.experienceLevel}\nAvailability: ${formData.availability}\nSkills: ${formData.skills.join(', ')}\nMotivation: ${formData.motivation}`
        });

      toast({
        title: "Application Submitted! 🎉",
        description: "Thank you for volunteering! We'll contact you soon.",
      });

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        experienceLevel: '',
        availability: '',
        skills: [],
        motivation: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
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
          <h1 className="text-3xl font-bold mb-2">Join Our Volunteer Community</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Be part of the caring cycle and help us create a more sustainable future together
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold">500+</h3>
              <p className="text-muted-foreground">Active Volunteers</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Leaf className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">10,000kg</h3>
              <p className="text-muted-foreground">CO₂ Saved</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">50+</h3>
              <p className="text-muted-foreground">Communities Served</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle>Volunteer Application Form</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
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
                    placeholder="House/Flat No., Street, Landmark"
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

              {/* Volunteer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Volunteer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experienceLevel">Experience Level *</Label>
                    <Select 
                      value={formData.experienceLevel} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="experienced">Experienced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <Select 
                      value={formData.availability} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekends">Weekends Only</SelectItem>
                        <SelectItem value="weekdays">Weekdays</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                        <SelectItem value="few-hours-week">Few Hours per Week</SelectItem>
                        <SelectItem value="full-time">Full Time Commitment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Skills & Interests (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {skillOptions.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={skill}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillChange(skill, checked as boolean)}
                        />
                        <Label htmlFor={skill} className="text-sm font-normal">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivation">Why do you want to volunteer with us?</Label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    placeholder="Tell us about your motivation to volunteer..."
                    rows={4}
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Volunteer Benefits */}
        <Card className="mt-8 bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Why Volunteer With Us?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Flexible Timing</h4>
                    <p className="text-sm text-muted-foreground">
                      Volunteer according to your schedule and availability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Community Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Make a real difference in your community and environment
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Leaf className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Learn & Grow</h4>
                    <p className="text-sm text-muted-foreground">
                      Gain experience in sustainability and environmental conservation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Heart className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-medium">Personal Satisfaction</h4>
                    <p className="text-sm text-muted-foreground">
                      Experience the joy of giving back and helping others
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

export default VolunteerPage;