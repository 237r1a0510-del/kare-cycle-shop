import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart, Leaf, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/data/products';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className = '' }: ProductCardProps) => {
  const { addToCart } = useCart();

  const getBrandColor = (brand: string) => {
    const colors = {
      'Happy Raithu': 'bg-green-500',
      'Gracious Gas': 'bg-blue-500',
      'SBL Pots': 'bg-amber-500',
      'Clayer': 'bg-orange-500',
      'Neem Brush': 'bg-emerald-500',
    };
    return colors[brand as keyof typeof colors] || 'bg-primary';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className={`product-card group overflow-hidden border-0 shadow-card hover:shadow-soft ${className}`}>
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${getBrandColor(product.brand)} text-white border-0`}>
              {product.brand}
            </Badge>
          </div>
          {product.isEcoFriendly && (
            <div className="absolute top-3 right-3">
              <div className="bg-green-500/90 backdrop-blur-sm rounded-full p-1.5">
                <Leaf className="h-4 w-4 text-white" />
              </div>
            </div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="destructive" className="text-xs">
                Only {product.stock} left!
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <Badge variant="secondary" className="text-xs">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={product.stock === 0}
            className="w-full"
            variant={product.stock === 0 ? 'outline' : 'default'}
          >
            {product.stock === 0 ? (
              'Out of Stock'
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1 text-red-500" />
              {product.sustainability} impact
            </span>
            <span>Free shipping over ₹500</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;