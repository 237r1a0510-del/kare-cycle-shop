import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, Truck, Leaf, ArrowRight } from 'lucide-react';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderId, customerInfo, items, total } = orderData;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed! 🎉</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for choosing eco-friendly products
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Order ID: <span className="font-mono font-medium">#{orderId?.slice(0, 8)}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items?.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Paid</span>
                <span>{formatPrice(total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">Delivery Address</h4>
                <div className="text-sm text-muted-foreground">
                  <p>{customerInfo?.fullName}</p>
                  <p>{customerInfo?.phone}</p>
                  <p>{customerInfo?.email}</p>
                  <p className="mt-2">
                    {customerInfo?.address}<br />
                    {customerInfo?.city}, {customerInfo?.state} - {customerInfo?.pincode}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-1">Estimated Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  3-5 business days
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Payment Method</h4>
                <p className="text-sm text-muted-foreground">
                  Cash on Delivery (COD)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Eco Impact */}
        <Card className="mt-8 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800 dark:text-green-400">
                Your Eco Impact
              </h3>
            </div>
            <p className="text-sm text-green-700 dark:text-green-300">
              With this purchase, you've helped save approximately{' '}
              <strong>{Math.round((items?.length || 0) * 2.5)} kg CO₂</strong> and supported
              sustainable farming practices. Thank you for choosing eco-friendly products! 🌱
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button onClick={() => navigate('/shop')} className="flex items-center gap-2">
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        {/* What's Next */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    We're preparing your eco-friendly products for shipment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Truck className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Delivery Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll receive SMS/email notifications about your delivery status.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">Enjoy Your Products</h4>
                  <p className="text-sm text-muted-foreground">
                    Start your eco-friendly journey with your new sustainable products!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;