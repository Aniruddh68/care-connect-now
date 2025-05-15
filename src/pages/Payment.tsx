import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { WalletIcon, QrCodeIcon, CreditCard, Wallet, WalletCards } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type PaymentMode = 'upi' | 'qr';
type UpiApp = 'phonepe' | 'googlepay' | 'amazonpay' | 'custom';

const Payment = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('upi');
  const [upiApp, setUpiApp] = useState<UpiApp>('custom');
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
    
    // Get the UPI ID to use
    let recipientUpi = '';
    let recipientName = '';
    
    if (upiApp === 'custom' && customUpiId) {
      recipientUpi = customUpiId;
      recipientName = 'Custom Recipient';
    } else if (upiApp === 'phonepe') {
      recipientUpi = upiId;
      recipientName = 'PhonePe';
    } else if (upiApp === 'googlepay') {
      recipientUpi = upiId;
      recipientName = 'Google Pay';
    } else if (upiApp === 'amazonpay') {
      recipientUpi = upiId;
      recipientName = 'Amazon Pay';
    } else {
      recipientUpi = upiId;
      recipientName = 'Care Connect Bhopal';
    }
    
    // Simulate UPI payment notification
    if (paymentMode === 'upi') {
      toast({
        title: "UPI Payment Notification",
        description: `A payment request of ₹${amount} has been sent via ${recipientName}`,
        variant: "default"
      });

      // Simulate payment success after 2 seconds
      setTimeout(() => {
        toast({
          title: "Payment Successful!",
          description: `Payment of ₹${amount} to ${recipientName} completed successfully.`,
          variant: "default"
        });
        
        // Store payment in local storage for history
        savePaymentToHistory(recipientName);
      }, 2000);
    } else {
      // Original code for QR
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
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-3">Select UPI App</p>
                        <RadioGroup 
                          value={upiApp}
                          onValueChange={(value) => setUpiApp(value as UpiApp)}
                          className="grid grid-cols-2 gap-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="phonepe" id="phonepe" />
                            <Label htmlFor="phonepe" className="flex items-center gap-2">
                              <img 
                                src="https://www.logo.wine/a/logo/PhonePe/PhonePe-Logo.wine.svg" 
                                alt="PhonePe" 
                                className="h-6 w-6" 
                              />
                              PhonePe
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="googlepay" id="googlepay" />
                            <Label htmlFor="googlepay" className="flex items-center gap-2">
                              <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Pay_Logo_%282020%29.svg/1024px-Google_Pay_Logo_%282020%29.svg.png" 
                                alt="Google Pay" 
                                className="h-6 w-6" 
                              />
                              Google Pay
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="amazonpay" id="amazonpay" />
                            <Label htmlFor="amazonpay" className="flex items-center gap-2">
                              <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Amazon_Pay_logo.svg/1200px-Amazon_Pay_logo.svg.png" 
                                alt="Amazon Pay" 
                                className="h-6 w-6" 
                              />
                              Amazon Pay
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-3">
                            <RadioGroupItem value="custom" id="custom" />
                            <Label htmlFor="custom" className="flex items-center gap-2">
                              <WalletCards className="h-6 w-6" />
                              Custom
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {upiApp === 'custom' && (
                        <div>
                          <label htmlFor="upiId" className="block text-sm font-medium mb-1">
                            Custom UPI ID
                          </label>
                          <Input
                            id="upiId"
                            type="text"
                            value={customUpiId}
                            onChange={(e) => setCustomUpiId(e.target.value)}
                            className="w-full"
                            placeholder="Enter recipient's UPI ID"
                          />
                        </div>
                      )}
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
                      <p className="font-medium text-care-dark break-all">
                        {upiApp === 'custom' && customUpiId ? customUpiId : upiId}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Use this UPI ID in your payment app</p>
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