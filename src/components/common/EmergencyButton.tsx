
import React from 'react';
import { Link } from 'react-router-dom';

interface EmergencyButtonProps {
  className?: string;
}

const EmergencyButton: React.FC<EmergencyButtonProps> = ({ className }) => {
  return (
    <Link 
      to="/emergency" 
      className={`emergency-button flex items-center justify-center animate-pulse-soft ${className || ''}`}
    >
      <span>Emergency Care</span>
    </Link>
  );
};

export default EmergencyButton;
