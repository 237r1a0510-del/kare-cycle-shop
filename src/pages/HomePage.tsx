import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Heart, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import heroImage from '@/assets/hero-eco-products.jpg';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 3);

  const brands = [
    {
      name: 'Happy Raithu',
      tagline: 'Organic Fertilizers',
      description: 'Premium vermicompost and bio-fertilizers for healthy plants',
      icon: '🌱',
      color: 'from-green-500 to-emerald-600',
      path: '/brands/happy-raithu'
    },
    {
      name: 'Gracious Gas',
      tagline: 'Clean Energy Solutions',
      description: 'Convert waste to cooking gas with our biogas units',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-600',
      path: '/brands/gracious-gas'
    },
    {
      name: 'SBL Pots',
      tagline: 'Eco Planters',
      description: 'Biodegradable pots for sustainable gardening',
      icon: '🪴',
      color: 'from-amber-500 to-orange-600',
      path: '/brands/sbl-pots'
    },
    {
      name: 'Clayer',
      tagline: 'Natural Clay Products',
      description: 'Traditional clay water bottles with modern IoT features',
      icon: '🏺',
      color: 'from-orange-500 to-red-600',
      path: '/brands/clayer'
    },
    {
      name: 'Neem Brush',
      tagline: 'Zero Plastic Care',
      description: '100% biodegradable neem wood toothbrushes',
      icon: '🪥',
      color: 'from-emerald-500 to-teal-600',
      path: '/brands/neem-brush'
    }
  ];

  const impactStats = [
    { icon: Users, value: '2,500+', label: 'Happy Customers' },
    { icon: Recycle, value: '10 Tons', label: 'Waste Recycled' },
    { icon: Leaf, value: '5,000 kg', label: 'CO₂ Saved' },
    { icon: TrendingUp, value: '98%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Eco-friendly products"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
                🌿 Sustainable Living Made Simple
              </Badge>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Kare <Heart className="inline h-12 w-12 md:h-16 md:w-16 text-red-400 fill-red-400" /> Save
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-medium">
              The Caring Cycle
            </p>
            <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto leading-relaxed">
              Transform waste into wealth with our eco-friendly products. From organic fertilizers to biogas units, 
              we're creating a sustainable tomorrow, today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="xl" variant="hero" className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="xl" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
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

      {/* Brand Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Eco Brands</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Five innovative brands working together to create a sustainable ecosystem
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <Card key={index} className="group cursor-pointer product-card border-0 shadow-card hover:shadow-soft">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${brand.color} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {brand.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">{brand.tagline}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {brand.description}
                    </p>
                    <Link to={brand.path}>
                      <Button variant="ghost" className="w-full group-hover:bg-primary/10 group-hover:text-primary">
                        Explore Products
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-xl text-muted-foreground">
              Special deals on our most popular eco-friendly products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
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

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Creating a <span className="text-primary">Caring Cycle</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our mission is simple: transform everyday waste into valuable resources. Through our innovative 
                products and sustainable practices, we're building a circular economy that benefits both people 
                and the planet.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <Leaf className="h-3 w-3 text-white" />
                  </div>
                  <span>Food waste becomes nutrient-rich compost</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <Recycle className="h-3 w-3 text-white" />
                  </div>
                  <span>Organic waste converts to clean cooking gas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <Heart className="h-3 w-3 text-white" />
                  </div>
                  <span>Sustainable products for everyday use</span>
                </div>
              </div>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More About Our Mission
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <Card className="relative p-8 border-0 shadow-soft">
                <div className="text-center">
                  <div className="text-6xl mb-6">♻️</div>
                  <h3 className="text-2xl font-bold mb-4">The Caring Cycle</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Food Waste</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>Compost</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Organic Matter</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>Biogas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Natural Materials</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>Eco Products</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;