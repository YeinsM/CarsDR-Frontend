import React from 'react';

type AdSpaceProps = {
  text?: string;
  className?: string;
};

const AdSpace = ({ text = "Espacio publicitario", className = "" }: AdSpaceProps) => {
  return (
    <div className={`bg-amber-300 w-full h-full rounded-md flex items-center justify-center shadow-md ${className}`}>
      <p className="font-bold text-2xl italic text-center">{text}</p>
    </div>
  );
};

export default AdSpace;