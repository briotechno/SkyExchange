import React from 'react';
import './BetSlip.css';

const BetSlip = ({ selectedBet, setSelectedBet }) => {
  if (!selectedBet) {
    return (
      <div className="betslip-wrapper" style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#666' }}>
        Click on the odds to add selections to the betslip.
      </div>
    );
  }

  return (
    <div className="betslip-wrapper">
      <div className="betslip-header-row">
        <span className="bs-header-selection">{selectedBet.type} (Bet For)</span>
        <span className="bs-header-odds">Odds</span>
        <span className="bs-header-stake">Stake</span>
        <span className="bs-header-profit">Profit</span>
      </div>

      <div className="beslip-event-name">
        Crvena Zvezda v Lille
      </div>

      <div className={`bet-entry-row ${selectedBet.type.toLowerCase()}`}>
        <div className="bet-selection-name">
          {selectedBet.runner}
          <span className="bet-market-name">{selectedBet.market || 'Match Odds'}</span>
        </div>
        <div className="bet-input-wrap">
          <input type="text" className="bet-input" defaultValue={selectedBet.price} />
        </div>
        <div className="bet-input-wrap">
          <input type="text" className="bet-input" placeholder="" />
        </div>
        <div className="bet-profit-val">0.00</div>
      </div>

      <div className="stake-buttons-row">
        {[10, 30, 50, 200, 500, 1000].map(stake => (
          <button key={stake} className="btn-stake">{stake}</button>
        ))}
      </div>

      <div className="min-bet-info">
        Min Bet: <strong>2</strong>
      </div>

      <div className="liability-row">
        <span className="liability-label">Liability</span>
        <span className="liability-val">0.00</span>
      </div>

      <div className="bet-actions-row">
        <button className="btn-cancel-all" onClick={() => setSelectedBet(null)}>Cancel All</button>
        <button className="btn-place-bets">Place Bets</button>
      </div>

      <div className="confirm-checkbox-row">
        <input type="checkbox" id="confirm-bet" />
        <label htmlFor="confirm-bet">Please confirm your bets.</label>
      </div>
    </div>
  );
};

export default BetSlip;
