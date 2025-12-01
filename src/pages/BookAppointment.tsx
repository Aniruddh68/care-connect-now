import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, Phone, Star, Loader2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useAppointmentStore } from '@/services/appointmentService';
import { useDoctorStore } from '@/services/doctorService';
import { supabase } from '@/integrations/supabase/client';

const BookAppointmentPage: React.FC = () => {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addAppointment } = useAppointmentStore();
  const { getDoctorById } = useDoctorStore();
  
  // Get doctor from centralized store
  const doctor = doctorId ? getDoctorById(doctorId) : null;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('9752353580'); // Default to user's number
  const [isBooking, setIsBooking] = useState(false);

  const availableTimes = [
    "09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const sendSMSNotification = async (appointmentDetails: {
    doctorName: string;
    date: string;
    time: string;
    hospital: string;
  }) => {
    try {
      const message = `Care Connect: Your appointment with ${appointmentDetails.doctorName} is confirmed for ${appointmentDetails.date} at ${appointmentDetails.time}. Location: ${appointmentDetails.hospital}. Thank you for choosing Care Connect Bhopal!`;
      
      const { data, error } = await supabase.functions.invoke('send-sms', {
        body: {
          phoneNumber: phoneNumber,
          message: message
        }
      });

      if (error) {
        console.error('SMS Error:', error);
        return false;
      }
      
      console.log('SMS Response:', data);
      return true;
    } catch (error) {
      console.error('SMS Error:', error);
      return false;
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time for your appointment.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!doctor) {
      toast({
        title: "Doctor Not Found",
        description: "The doctor you are trying to book with does not exist.",
        variant: "destructive",
      });
      navigate('/find');
      return;
    }

    setIsBooking(true);

    try {
      addAppointment({
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.imageUrl,
        hospital: doctor.hospital,
        date: selectedDate,
        time: selectedTime,
        status: 'upcoming',
        reason: reason,
      });

      // Send SMS notification
      const smsSuccess = await sendSMSNotification({
        doctorName: doctor.name,
        date: format(selectedDate, 'EEEE, MMMM d, yyyy'),
        time: selectedTime,
        hospital: doctor.hospital
      });

      toast({
        title: "Appointment Booked!",
        description: smsSuccess 
          ? `Confirmation SMS sent to ${phoneNumber}` 
          : "Your appointment is confirmed. SMS notification could not be sent.",
      });
      
      navigate('/appointments');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };

  if (!doctor) {
    return (
      <MainLayout title="Doctor Not Found">
        <div className="max-w-lg mx-auto px-4 py-8 text-center">
          <h2 className="text-xl font-bold mb-4">Doctor not found</h2>
          <p className="text-care-muted mb-4">The doctor you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/find')} className="primary-button">
            Find Other Doctors
          </button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`Book with ${doctor.name}`}>
      <div className="max-w-lg mx-auto px-4 pb-20 pt-4">
        <button onClick={() => navigate(-1)} className="text-care-primary hover:underline flex items-center mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center mb-4">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-care-dark">{doctor.name}</h1>
              <p className="text-care-muted">{doctor.specialty}</p>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                <span>{doctor.rating}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mb-4">
            <h2 className="text-xl font-semibold text-care-dark mb-3">Appointment Details</h2>

            <div className="flex items-center text-care-muted mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {selectedDate ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
              </span>
            </div>

            <div className="flex items-center text-care-muted mb-2">
              <Clock className="h-4 w-4 mr-2" />
              <span>{selectedTime || 'Select a time'}</span>
            </div>

            <div className="flex items-center text-care-muted mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{doctor.hospital}</span>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number (for SMS confirmation) *
            </label>
            <div className="mt-1 flex items-center">
              <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md text-sm">
                <Phone className="h-4 w-4 mr-1" /> +91
              </span>
              <input
                type="tel"
                id="phone"
                maxLength={10}
                placeholder="Enter 10-digit number"
                className="flex-1 block w-full rounded-r-md border-gray-300 shadow-sm focus:border-care-primary focus:ring-care-primary sm:text-sm py-2 px-3 border"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Appointment (Optional)
            </label>
            <textarea
              id="reason"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Date:</label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Time:</label>
            <div className="grid grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  className={`bg-gray-100 hover:bg-gray-200 rounded py-2 px-4 text-sm ${selectedTime === time ? 'bg-care-primary text-white' : ''
                    }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleBooking} 
            disabled={isBooking}
            className="primary-button w-full py-3 flex items-center justify-center disabled:opacity-50"
          >
            {isBooking ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Booking...
              </>
            ) : (
              'Book Appointment'
            )}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookAppointmentPage;
