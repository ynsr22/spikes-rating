// src/App.tsx
import React from 'react';
import Rating from './rating';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Rating />
    </div>
  );
};

export default App;
