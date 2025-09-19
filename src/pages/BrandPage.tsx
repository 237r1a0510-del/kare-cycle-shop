import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Leaf, Award, Users, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductsByBrand } from '@/data/products';

const BrandPage = () => {
  const { brandName } = useParams();
  
  const brandData = {
    'happy-raithu': {
      name: 'Happy Raithu',
      tagline: 'Organic Fertilizers',
      description: 'Premium vermicompost and bio-fertilizers for healthy plants',
      longDescription: 'Happy Raithu specializes in creating nutrient-rich organic fertilizers through sustainable vermicomposting processes. Our products help farmers and gardeners grow healthier plants while improving soil health naturally.',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600',
      heroImage: '/assets/vermicompost.jpg',
      stats: [
        { icon: Users, value: '1,200+', label: 'Farmers Served' },
        { icon: Leaf, value: '50 Tons', label: 'Compost Produced' },
        { icon: TrendingUp, value: '40%', label: 'Yield Increase' },
        { icon: Award, value: '5 Stars', label: 'Average Rating' }
      ],
      features: [
        'Rich in essential nutrients',
        '100% organic and chemical-free', 
        'Improves soil structure',
        'Increases water retention',
        'Promotes beneficial microorganisms'
      ]
    },
    'gracious-gas': {
      name: 'Gracious Gas',
      tagline: 'Clean Energy Solutions',
      description: 'Convert waste to cooking gas with our biogas units',
      longDescription: 'Gracious Gas develops innovative biogas technology that transforms organic waste into clean cooking gas. Our units help households and businesses reduce waste while generating renewable energy.',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-600',
      heroImage: '/assets/biogas-unit.jpg',
      stats: [
        { icon: Users, value: '500+', label: 'Units Installed' },
        { icon: Leaf, value: '20 Tons', label: 'CO₂ Saved Monthly' },
        { icon: TrendingUp, value: '80%', label: 'Cost Savings' },
        { icon: Award, value: 'Certified', label: 'Quality Standard' }
      ],
      features: [
        'Converts organic waste to gas',
        'Reduces cooking fuel costs',
        'Environmentally friendly',
        'Easy installation and maintenance',
        'Suitable for homes and businesses'
      ]
    },
    'sbl-pots': {
      name: 'SBL Pots',
      tagline: 'Eco Planters',
      description: 'Biodegradable pots for sustainable gardening',
      longDescription: 'SBL Pots creates innovative biodegradable planters made from sustainable materials. Our pots naturally decompose over time, enriching the soil while supporting healthy plant growth.',
      icon: '🪴',
      color: 'from-amber-500 to-orange-600',
      heroImage: '/assets/eco-pots.jpg',
      stats: [
        { icon: Users, value: '800+', label: 'Happy Gardeners' },
        { icon: Leaf, value: '15,000', label: 'Pots Sold' },
        { icon: TrendingUp, value: '95%', label: 'Success Rate' },
        { icon: Award, value: 'Eco-Certified', label: 'Sustainability' }
      ],
      features: [
        'Fully biodegradable material',
        'Various sizes available',
        'Promotes root health',
        'Zero plastic waste',
        'Perfect for seedlings'
      ]
    },
    'clayer': {
      name: 'Clayer',
      tagline: 'Natural Clay Products',
      description: 'Traditional clay water bottles with modern IoT features',
      longDescription: 'Clayer combines traditional clay craftsmanship with modern technology to create water bottles that naturally cool and purify water. Our IoT-enabled features help track hydration and water quality.',
      icon: '🏺',
      color: 'from-orange-500 to-red-600',
      heroImage: '/assets/clay-bottle.jpg',
      stats: [
        { icon: Users, value: '600+', label: 'Daily Users' },
        { icon: Leaf, value: '100%', label: 'Natural Materials' },
        { icon: TrendingUp, value: '2L', label: 'Daily Hydration' },
        { icon: Award, value: 'Handcrafted', label: 'Artisan Quality' }
      ],
      features: [
        'Natural water cooling',
        'Alkaline pH balance',
        'IoT health tracking',
        'Handcrafted by artisans',
        'Plastic-free lifestyle'
      ]
    },
    'neem-brush': {
      name: 'Neem Brush',
      tagline: 'Zero Plastic Care',
      description: '100% biodegradable neem wood toothbrushes',
      longDescription: 'Neem Brush creates sustainable oral care products using traditional neem wood. Our toothbrushes provide natural antibacterial properties while being completely biodegradable and plastic-free.',
      icon: '🪥',
      color: 'from-emerald-500 to-teal-600',
      heroImage: '/assets/neem-brushes.jpg',
      stats: [
        { icon: Users, value: '2,000+', label: 'Users Switched' },
        { icon: Leaf, value: '0%', label: 'Plastic Content' },
        { icon: TrendingUp, value: '30 Days', label: 'Biodegrades In' },
        { icon: Award, value: 'Ayurvedic', label: 'Traditional Benefits' }
      ],
      features: [
        'Natural antibacterial properties',
        '100% biodegradable',
        'Soft on gums',
        'Plastic-free packaging',
        'Traditional Ayurvedic benefits'
      ]
    }
  };

  const brand = brandName ? brandData[brandName as keyof typeof brandData] : null;
  const products = brandName ? getProductsByBrand(brandName) : [];

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Brand Not Found</h1>
          <p className="text-muted-foreground mb-6">The brand you're looking for doesn't exist.</p>
            <Link to="/">
              <Button variant="default">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-90`} />
        <div className="absolute inset-0">
          <img
            src={brand.heroImage}
            alt={brand.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center text-white">
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-white border-white/30 hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div className="text-8xl mb-6">{brand.icon}</div>
            <Badge className="mb-6 bg-white/20 text-white border-white/30">
              {brand.tagline}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{brand.name}</h1>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
              {brand.longDescription}
            </p>
            <Link to="/shop">
              <Button size="xl" variant="hero" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Shop Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {brand.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose {brand.name}?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover what makes our products special and how they contribute to a sustainable future.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {brand.features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-soft">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      {products.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
              <p className="text-xl text-muted-foreground">
                Explore our range of {brand.name} products
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button size="lg" variant="default">
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="border-0 shadow-soft p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of customers who have already switched to sustainable {brand.name} products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/shop">
                  <Button size="lg" variant="default">
                    Shop Now
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

export default BrandPage;