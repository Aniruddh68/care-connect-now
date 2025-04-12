
import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall } from 'lucide-react';

interface EmergencyButtonProps {
  className?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({
  className
}) => {
  return (
    <Link 
      to="/emergency" 
      className={`emergency-button flex items-center justify-center animate-pulse-soft ${className || ''}`}
      style={{ 
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
        userSelect: 'none'
      }}
    >
      <PhoneCall className="mr-2 h-5 w-5" />
      <span>Emergency Care 108</span>
    </Link>
  );
};

export default EmergencyButton;
