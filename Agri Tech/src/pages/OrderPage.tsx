import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin, Phone, IndianRupee, Minus, Plus, ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  seller: string;
  location: string;
  phone: string;
  quantity: number;
  unit: string;
}

const OrderPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product?.quantity || 1)));
  };

  const handleProceedToPayment = () => {
    // Navigate to payment page with order details
    navigate('/payment', {
      state: {
        orderId: Date.now(),
        product,
        quantity,
        total: product!.price * quantity
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const total = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/marketplace')}
              className="text-gray-600 hover:text-gray-800 mr-4"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">Order Summary</h1>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-2/3 md:pl-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    {product.location}
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {product.phone}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-gray-600">Price per {product.unit}</div>
                      <div className="flex items-center text-lg font-semibold text-gray-800">
                        <IndianRupee className="w-4 h-4 mr-1" />
                        {product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">Quantity</div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-1" />
                  {total.toLocaleString()}
                </div>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>Free</span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total</span>
                  <div className="flex items-center">
                    <IndianRupee className="w-4 h-4 mr-1" />
                    {total.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleProceedToPayment}
              className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;