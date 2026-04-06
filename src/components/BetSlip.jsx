import React from 'react';

function BetSlip() {
  return (
    <>
      <div className="betslip-head">
        <span>Bet Slip</span>
        <span style={{ cursor: 'pointer', fontSize: '14px' }}>☐</span>
      </div>
      <div className="betslip-body">
        <p>Click on the odds to add selections to the betslip.</p>
      </div>
    </>
  );
}

export default BetSlip;
