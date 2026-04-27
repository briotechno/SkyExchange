import React from 'react';

/**
 * OddsTable Component
 * 
 * Renders the Match Odds table with precise dimensions, typography, and rounded tabs.
 */
const OddsTable = ({ marketData, onBetClick }) => {
  const oddsWidth = '114.688px';
  const uniformHeight = '35px';
  const baseFont = {
    fontFamily: 'Tahoma, Helvetica, sans-serif',
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: '400',
    letterSpacing: 'normal'
  };

  const cellStyle = (bgColor) => ({
    width: oddsWidth,
    minWidth: oddsWidth,
    height: uniformHeight,
    backgroundColor: bgColor,
    textAlign: 'center',
    cursor: 'pointer',
    borderRight: '1px solid #fff',
    borderBottom: '1px solid #fff',
    verticalAlign: 'middle',
    padding: '2px 0',
    ...baseFont
  });

  const headerTabStyle = (bgColor, textColor) => ({
    position: 'absolute',
    bottom: 0,
    left: '2px', // Slight offset to show the rounded edge better
    right: '2px',
    height: '24px',
    backgroundColor: bgColor,
    borderTopLeftRadius: '5px', // "Lil radius" as requested
    borderTopRightRadius: '5px',
    color: textColor || '#1e1e1e',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    border: `1px solid rgba(0,0,0,0.05)`,
    borderBottom: 'none'
  });

  return (
    <div className="w-full" style={{ width: '100%', marginBottom: '16px' }}>
      <table className="w-full" style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#e4e7ed',
        border: '1px solid #d9d9d9'
      }}>
        <thead>
          <tr style={{ height: '36px', color: '#707c8a', borderBottom: '1px solid #d9d9d9', ...baseFont }}>
            {/* Col 1: Selection Name Header */}
            <th style={{ textAlign: 'left', paddingLeft: '12px', fontWeight: '400', backgroundColor: '#e4e7ed' }}>
              2 selections
            </th>

            {/* 6 Odds Headers */}
            <th style={{ width: oddsWidth, textAlign: 'center', fontWeight: '700', color: '#2b3a47', backgroundColor: '#e4e7ed' }}>
              100.7%
            </th>
            <th style={{ width: oddsWidth, backgroundColor: '#e4e7ed' }}></th>
            <th style={{ width: oddsWidth, position: 'relative', padding: 0, backgroundColor: '#e4e7ed' }}>
              <div style={headerTabStyle('#72bbef', '#1e1e1e')}>Back all</div>
            </th>
            <th style={{ width: oddsWidth, position: 'relative', padding: 0, backgroundColor: '#e4e7ed' }}>
              <div style={headerTabStyle('#faa9ba', '#1e1e1e')}>Lay all</div>
            </th>
            <th style={{ width: oddsWidth, backgroundColor: '#e4e7ed' }}></th>
            <th style={{ width: oddsWidth, textAlign: 'right', paddingRight: '12px', fontWeight: '700', color: '#2b3a47', backgroundColor: '#e4e7ed' }}>
              99%
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'white' }}>
          {/* Canada Row */}
          <tr style={{ height: uniformHeight, borderBottom: '1px solid #d9d9d9' }}>
            <td style={{ paddingLeft: '16px', color: '#2b3a47', borderRight: '1px solid #d9d9d9', ...baseFont, fontWeight: '700' }}>
              Canada
            </td>
            {/* Back Section */}
            <td style={{ ...cellStyle('#e2f2fe') }}>
              <div style={{ fontWeight: '700' }}>1.17</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>213K</div>
            </td>
            <td style={{ ...cellStyle('#add8f4') }}>
              <div style={{ fontWeight: '700' }}>1.18</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>24,332</div>
            </td>
            <td style={{ ...cellStyle('#72bbef') }}>
              <div style={{ fontWeight: '700' }}>1.19</div>
              <div style={{ fontSize: '10px' }}>24,872</div>
            </td>
            {/* Lay Section */}
            <td style={{ ...cellStyle('#faa9ba') }}>
              <div style={{ fontWeight: '700' }}>1.2</div>
              <div style={{ fontSize: '10px' }}>63,093</div>
            </td>
            <td style={{ ...cellStyle('#fbcbd5') }}>
              <div style={{ fontWeight: '700' }}>1.21</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>85,088</div>
            </td>
            <td style={{ ...cellStyle('#fde4ea'), borderRight: 'none' }}>
              <div style={{ fontWeight: '700' }}>1.22</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>165K</div>
            </td>
          </tr>

          {/* UAE Row */}
          <tr style={{ height: uniformHeight }}>
            <td style={{ paddingLeft: '16px', color: '#2b3a47', borderRight: '1px solid #d9d9d9', ...baseFont, fontWeight: '700' }}>
              United Arab Emirates
            </td>
            {/* Back Section */}
            <td style={{ ...cellStyle('#e2f2fe'), borderBottom: 'none' }}>
              <div style={{ fontWeight: '700' }}>5.6</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>188</div>
            </td>
            <td style={{ ...cellStyle('#add8f4'), borderBottom: 'none' }}>
              <div style={{ fontWeight: '700' }}>5.7</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>18,483</div>
            </td>
            <td style={{ ...cellStyle('#72bbef'), borderBottom: 'none' }}>
              <div style={{ fontWeight: '700' }}>6</div>
              <div style={{ fontSize: '10px' }}>12,670</div>
            </td>
            {/* Lay Section */}
            <td style={{ ...cellStyle('#faa9ba'), borderBottom: 'none' }}>
              <div style={{ fontWeight: '700' }}>6.4</div>
              <div style={{ fontSize: '10px' }}>4,680</div>
            </td>
            <td style={{ ...cellStyle('#fbcbd5'), borderBottom: 'none' }}>
              <div style={{ fontWeight: '700' }}>6.6</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>4,347</div>
            </td>
            <td style={{ ...cellStyle('#fde4ea'), borderBottom: 'none', borderRight: 'none' }}>
              <div style={{ fontWeight: '700' }}>6.8</div>
              <div style={{ fontSize: '10px', color: '#707c8a' }}>5</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OddsTable;
