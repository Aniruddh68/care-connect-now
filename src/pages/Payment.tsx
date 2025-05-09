
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { WalletIcon, QrCodeIcon, CreditCard, Wallet, WalletCards } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';

const Payment = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'qr'>('upi');
  const upiId = 'aniruddhgupta148@ybl';
  const [customUpiId, setCustomUpiId] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  
  const handlePayment = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate UPI payment notification
    if (paymentMode === 'upi' && customUpiId) {
      toast({
        title: "UPI Payment Notification",
        description: `A payment request of ₹${amount} has been sent to ${customUpiId}`,
        variant: "default"
      });

      // Simulate payment success after 2 seconds
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: `Payment of ₹${amount} to ${customUpiId} completed successfully.`,
          variant: "default"
        });
        
        // Store payment in local storage for history
        savePaymentToHistory(customUpiId);
      }, 2000);
    } else {
      // Original code for default UPI
      toast({
        title: "Payment Initiated",
        description: `Payment of ₹${amount} initiated via ${paymentMode === 'upi' ? 'UPI' : 'QR Code'}.`,
        variant: "default"
      });
      
      // Store payment in local storage for history
      savePaymentToHistory('Care Connect Bhopal');
    }
  };

  const savePaymentToHistory = (recipient: string) => {
    const paymentHistory = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    paymentHistory.push({
      id: Date.now().toString(),
      amount: Number(amount),
      mode: paymentMode,
      status: 'completed',
      timestamp: new Date().toISOString(),
      recipient: recipient
    });
    localStorage.setItem('paymentHistory', JSON.stringify(paymentHistory));
    
    // Reset form
    setAmount('');
    setCustomUpiId('');
  };

  // Generate a payment URL for the QR code
  const getPaymentUrl = () => {
    // Format according to UPI deep linking specifications
    // pa = Payment Address, pn = Payee Name, am = Amount, cu = Currency, tn = Transaction Note
    const payeeUpi = customUpiId || upiId;
    const payeeName = customUpiId ? 'Custom Recipient' : 'Care Connect Bhopal';
    const baseUrl = `upi://pay?pa=${payeeUpi}&pn=${encodeURIComponent(payeeName)}`;
    const amountPart = amount && !isNaN(Number(amount)) ? `&am=${amount}` : '';
    return `${baseUrl}${amountPart}&cu=INR&tn=Payment%20for%20Care%20Connect%20Services`;
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
                  
                  {paymentMode === 'upi' && (
                    <div>
                      <label htmlFor="upiId" className="block text-sm font-medium mb-1">
                        Custom UPI ID (Optional)
                      </label>
                      <Input
                        id="upiId"
                        type="text"
                        value={customUpiId}
                        onChange={(e) => setCustomUpiId(e.target.value)}
                        className="w-full"
                        placeholder="Enter recipient's UPI ID"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to use our default UPI ID
                      </p>
                    </div>
                  )}
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
                      <p className="font-medium text-care-dark break-all">{customUpiId || upiId}</p>
                    </div>
                    <p className="text-sm text-gray-500">Enter this UPI ID in your payment app</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-white border-2 border-gray-200 rounded-lg p-4 mb-4 flex items-center justify-center">
                      <QRCodeSVG 
                        value={getPaymentUrl()}
                        size={160}
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        level="M"
                        includeMargin={false}
                      />
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
