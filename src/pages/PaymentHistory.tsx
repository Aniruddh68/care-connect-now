
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { format } from 'date-fns';
import { WalletCards, QrCode } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { QRCodeSVG } from 'qrcode.react';

interface PaymentRecord {
  id: string;
  amount: number;
  mode: string;
  status: string;
  timestamp: string;
  recipient: string;
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  
  useEffect(() => {
    const savedPayments = JSON.parse(localStorage.getItem('paymentHistory') || '[]');
    setPayments(savedPayments);
  }, []);

  // Generate a payment URL for the QR code
  const getPaymentUrl = (payment: PaymentRecord) => {
    const upiId = 'aniruddhgupta148@ybl';
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payment.recipient)}&am=${payment.amount}&cu=INR&tn=Payment%20for%20Care%20Connect%20Services`;
  };

  return (
    <MainLayout title="Payment History">
      <div className="max-w-4xl mx-auto px-4 pt-6 pb-20">
        <h1 className="text-2xl font-bold mb-6 text-care-dark flex items-center">
          <WalletCards className="mr-2 h-6 w-6 text-care-primary" />
          Payment History
        </h1>
        
        {payments.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Mode</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>QR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">
                        {format(new Date(payment.timestamp), 'PPP')}
                        <div className="text-xs text-gray-500">
                          {format(new Date(payment.timestamp), 'p')}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">₹{payment.amount}</TableCell>
                      <TableCell>{payment.mode === 'upi' ? 'UPI Direct' : 'QR Scan'}</TableCell>
                      <TableCell>{payment.recipient}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="p-1 rounded-full hover:bg-gray-100">
                              <QrCode className="h-4 w-4 text-care-primary" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-3">
                            <div className="p-2">
                              <QRCodeSVG 
                                value={getPaymentUrl(payment)}
                                size={120}
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                                level="M"
                                includeMargin={false}
                              />
                            </div>
                            <p className="text-xs text-center text-gray-500 mt-2">
                              Receipt QR for ₹{payment.amount}
                            </p>
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="text-gray-400 mb-2">
              <WalletCards className="h-12 w-12 mx-auto opacity-50" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No payment history yet</h3>
            <p className="mt-1 text-gray-500">
              Your payment transactions will appear here once you make a payment.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default PaymentHistory;
