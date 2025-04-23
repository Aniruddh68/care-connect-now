
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { WalletIcon, QrCodeIcon, CreditCard, Wallet, WalletCards } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'qr'>('upi');
  const upiId = 'aniruddhgupta148@ybl';
  
  const handlePayment = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would integrate with a payment gateway
    // For now, we'll just show a success toast
    toast({
      title: "Payment Initiated",
      description: `Payment of ₹${amount} initiated via ${paymentMode === 'upi' ? 'UPI' : 'QR Code'}.`,
      variant: "default"
    });
    
    // Store payment in local storage for history
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    paymentHistory.push({
      id: Date.now().toString(),
      amount: Number(amount),
      mode: paymentMode,
      status: 'completed',
      timestamp: new Date().toISOString(),
      recipient: 'Care Connect Bhopal'
    });
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    
    // Reset form
    setAmount('');
  };

  return (
    <MainLayout title="Payment">
      <div className="max-w-3xl mx-auto px-4 pt-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-care-dark">Make a Payment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Options</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                      paymentMode === 'upi' ? 'border-care-primary bg-sky-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMode('upi')}
                  >
                    <WalletIcon className="h-6 w-6 text-care-primary mb-2" />
                    <span className="text-sm font-medium">UPI Direct</span>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                      paymentMode === 'qr' ? 'border-care-primary bg-sky-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMode('qr')}
                  >
                    <QrCodeIcon className="h-6 w-6 text-care-primary mb-2" />
                    <span className="text-sm font-medium">Scan QR</span>
                  </div>
                </div>
                
                <div className="space-y-4 pt-2">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium mb-1">
                      Amount (₹)
                    </label>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full"
                      placeholder="Enter amount"
                      min="1"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handlePayment} 
                  className="w-full bg-care-primary hover:bg-sky-600 text-white"
                >
                  Pay Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{paymentMode === 'upi' ? 'UPI Details' : 'Scan QR Code'}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {paymentMode === 'upi' ? (
                  <div className="text-center">
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <p className="font-medium text-care-dark break-all">{upiId}</p>
                    </div>
                    <p className="text-sm text-gray-500">Enter this UPI ID in your payment app</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-white w-48 h-48 border-2 border-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      {/* QR code placeholder - in a real app, generate a QR for the UPI ID */}
                      <div className="text-xs text-gray-400 p-2 text-center">
                        QR for UPI ID: {upiId}
                        <br />
                        (This would be an actual QR code in production)
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Scan this QR code with any UPI app</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Payment;
