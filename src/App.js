import React from 'react';
import DistanceConverter from './components/DistanceConverter';
import CurrencyConverter from './components/CurrencyConverter';
import GoogleMap from './components/GoogleMap';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>20214452 최지원</h1>
      <DistanceConverter />
      <CurrencyConverter />
      <GoogleMap />
    </div>
  );
}

export default App;