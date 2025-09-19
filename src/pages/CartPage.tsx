import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Leaf, ShieldCheck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { items, total, removeFromCart, updateQuantity, getTotalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTotalSavings = () => {
    return items.reduce((savings, item) => {
      if (item.originalPrice && item.originalPrice > item.price) {
        return savings + ((item.originalPrice - item.price) * item.quantity);
      }
      return savings;
    }, 0);
  };

  const getDeliveryFee = () => {
    return total >= 500 ? 0 : 50;
  };

  const getFinalTotal = () => {
    return total + getDeliveryFee();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-8xl mb-8">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Looks like you haven't added any eco-friendly products yet.
            </p>
            <Link to="/shop">
              <Button size="lg" variant="default">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/shop">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
            <p className="text-muted-foreground">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                          <Badge className="mb-2" variant="secondary">
                            {item.brand}
                          </Badge>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Leaf className="h-3 w-3 text-green-500" />
                            <span>{item.sustainability} sustainability impact</span>
                            <ShieldCheck className="h-3 w-3 text-blue-500 ml-2" />
                            <span>Eco-certified</span>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive/80 mt-2 sm:mt-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price and Quantity Controls */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="rounded-none"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-12 text-center border-x">
                              <Input
                                value={item.quantity}
                                onChange={(e) => {
                                  const newQuantity = parseInt(e.target.value) || 1;
                                  updateQuantity(item.id, Math.min(newQuantity, item.stock));
                                }}
                                className="border-0 text-center p-0 h-8"
                                min="1"
                                max={item.stock}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.stock}
                              className="rounded-none"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {item.stock} available
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <div className="text-sm text-muted-foreground line-through">
                              {formatPrice(item.originalPrice * item.quantity)}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.price)} each
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  
                  {getTotalSavings() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Total Savings</span>
                      <span>-{formatPrice(getTotalSavings())}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>
                      {getDeliveryFee() === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        formatPrice(getDeliveryFee())
                      )}
                    </span>
                  </div>
                  
                  {total < 500 && (
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      Add {formatPrice(500 - total)} more for free delivery
                    </div>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(getFinalTotal())}</span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" variant="default">
                    Proceed to Checkout
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secure checkout powered by Stripe
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-400">
                      Eco Impact
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Your purchase will help save approximately{' '}
                    <strong>{Math.round(getTotalItems() * 2.5)} kg CO₂</strong> and support
                    sustainable farming practices.
                  </p>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Leaf className="h-3 w-3" />
                    <span>Carbon-neutral shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📦</span>
                    <span>Plastic-free packaging</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;