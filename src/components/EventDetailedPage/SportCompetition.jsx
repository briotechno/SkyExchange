import React from 'react';

/**
 * SportCompetition Component
 * 
 * Renders the competition and match navigation for the left sidebar.
 */
const SportCompetition = ({ sport, competition, matchName }) => {
  const itemStyle = {
    borderBottom: '1px solid #e2e8f0',
    padding: '10px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '600',
    color: '#4a5568'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#f7f7f7' }}>
      <div style={{ backgroundColor: '#000', color: '#fff', padding: '10px', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}>
        Sports
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={itemStyle}>
          All Sports
        </div>
        <div style={{ ...itemStyle, paddingLeft: '16px', textTransform: 'capitalize' }}>
          {sport || 'Cricket'}
        </div>
        <div style={{ ...itemStyle, paddingLeft: '24px', backgroundColor: '#f1f5f9', fontWeight: '500', fontSize: '12px' }}>
          {competition || 'Competition'}
        </div>
        <div style={{ ...itemStyle, paddingLeft: '32px', backgroundColor: '#0c161c', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>
          {matchName || 'Match Name'}
        </div>
        <div style={{ ...itemStyle, paddingLeft: '40px', backgroundColor: '#e2e8f0', borderLeft: '4px solid #ffb80c', fontWeight: 'bold', fontSize: '12px', color: '#1a202c' }}>
          Match Odds
        </div>
      </nav>
    </div>
  );
};

export default SportCompetition;
