import React from 'react';

interface PlaceholderProps {
  title: string;
}

export const AdvisorPlaceholder: React.FC<PlaceholderProps> = ({ title }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>{title}</h1>
      <p>This page is currently under development. Please check back later!</p>
    </div>
  );
};
