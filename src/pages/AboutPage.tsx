import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Leaf, Recycle, Heart, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Sustainability First',
      description: 'Every product we create helps reduce environmental impact and promotes circular economy principles.'
    },
    {
      icon: Recycle,
      title: 'Waste to Wealth',
      description: 'We transform everyday waste into valuable resources, creating a positive impact cycle.'
    },
    {
      icon: Heart,
      title: 'Community Care',
      description: 'Building stronger communities through sustainable practices and eco-friendly solutions.'
    },
    {
      icon: Users,
      title: 'Inclusive Innovation',
      description: 'Creating accessible sustainable solutions that work for everyone, regardless of background.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Founded with a vision to create sustainable solutions' },
    { year: '2021', event: 'Launched Happy Raithu vermicompost products' },
    { year: '2022', event: 'Introduced Gracious Gas biogas units for homes' },
    { year: '2023', event: 'Expanded with SBL Pots, Clayer, and Neem Brush brands' },
    { year: '2024', event: '2,500+ customers and 10 tons of waste recycled' }
  ];

  const flowSteps = [
    { icon: '🥬', title: 'Food Waste', description: 'Kitchen scraps and organic matter' },
    { icon: '⚡', title: 'Energy', description: 'Biogas for cooking and heating' },
    { icon: '🌱', title: 'Compost', description: 'Nutrient-rich fertilizer for plants' },
    { icon: '🏺', title: 'Products', description: 'Eco-friendly everyday items' },
    { icon: '💧', title: 'Water', description: 'Clean, mineral-rich drinking water' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Our Mission & Vision
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Kare <Heart className="inline h-10 w-10 md:h-12 md:w-12 text-red-500 fill-red-500" /> Save
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to create a caring cycle where waste becomes wealth, 
              communities thrive, and the planet heals through sustainable innovation.
            </p>
          </div>
        </div>
      </section>

      {/* The Caring Cycle Flow */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">The Caring Cycle</h2>
            <p className="text-xl text-muted-foreground">
              How we transform waste into sustainable solutions
            </p>
          </div>

          <div className="relative">
            {/* Desktop Flow */}
            <div className="hidden md:flex items-center justify-between">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4 hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-32">
                    {step.description}
                  </p>
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="absolute top-10 -right-8 h-6 w-6 text-primary" />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Flow */}
            <div className="md:hidden space-y-6">
              {flowSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center group hover:shadow-soft transition-all duration-300 border-0">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Started in 2020 with a simple vision: create sustainable solutions that make 
                environmental responsibility accessible to everyone. Today, we're proud to have 
                helped thousands of customers reduce their environmental footprint.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Our Mission</h3>
                    <p className="text-muted-foreground">Transform waste into wealth through innovative, sustainable solutions</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Our Vision</h3>
                    <p className="text-muted-foreground">A world where every household contributes to a circular, sustainable economy</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg" variant="default">
                    Get in Touch
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">Key Milestones</h3>
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-primary">{milestone.year}</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-foreground leading-relaxed">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact So Far</h2>
            <p className="text-xl text-muted-foreground">
              Together, we're making a real difference
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">2,500+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10</div>
              <p className="text-muted-foreground">Tons Waste Recycled</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">5,000</div>
              <p className="text-muted-foreground">kg CO₂ Saved</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Caring Cycle Today
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Start your sustainable journey with our eco-friendly products. 
                Every purchase makes a difference for our planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button size="lg" variant="default">
                    Shop Sustainable Products
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;