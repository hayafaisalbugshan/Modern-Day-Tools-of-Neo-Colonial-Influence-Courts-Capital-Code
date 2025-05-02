// File: src/components/Tooltip.js
import React from 'react';
import './Tooltip.css';

const Tooltip = ({ content, x = 0, y = 0 }) => {
  if (!content) return null;

  const { name, open = 0, past = 0 } = content;
  const total = open + past;

  return (
    <div
      className="tooltip"
      style={{
        position: 'absolute',
        top: y - 2,
        left: x + 2,
        backgroundColor: '#1f2937',
        color: '#f8fafc',
        padding: '0.5rem 1rem',
        border: '1px solid #475569',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        zIndex: 10,
        pointerEvents: 'none',
      }}      
    >
      <strong>{name}</strong>
      <div>Open: {open}</div>
      <div>Past: {past}</div>
      <div>Total: {total}</div>
    </div>
  );
};

export default Tooltip;


