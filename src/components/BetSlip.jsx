import React from 'react';
import './BetSlip.css';

const BetSlip = ({ selectedBet, setSelectedBet }) => {
  return (
    <div className="betslip-wrapper">
      <div className="betslip-primary-header">Bet Slip</div>
      
      {!selectedBet ? (
        <div className="betslip-placeholder" style={{ padding: '30px 20px', textAlign: 'center', fontSize: '11px', color: '#666', background: '#fff' }}>
          Click on the odds to add selections to the betslip.
        </div>
      ) : (
        <>
          <div className="betslip-labels-row">
            <span className="bs-label-selection">{selectedBet.type} (Bet For)</span>
            <span className="bs-label-odds">Odds</span>
            <span className="bs-label-stake">Stake</span>
            <span className="bs-label-liability">Profit</span>
          </div>

          <div className="betslip-event-header">
            Canada v United Arab Emirates
          </div>

          <div className={`bet-entry-row ${selectedBet.type === 'Lay' ? 'lay' : 'back'}`}>
            <div className="bet-selection-info">
              <span className="bet-runner-name">{selectedBet.runner}</span>
              <span className="bet-market-name">{selectedBet.market || 'Match Odds'}</span>
            </div>
            <div className="bet-input-container">
              <input type="text" className="bet-field-input bet-input-odds" defaultValue={selectedBet.price} />
            </div>
            <div className="bet-input-container">
              <input type="text" className="bet-field-input bet-input-stake" placeholder="0" />
            </div>
            <div className="bet-liability-val">0.00</div>
          </div>

          <div className="betslip-stake-grid">
            {[10, 30, 50, 200, 500, 1000].map(stake => (
              <button key={stake} className="btn-quick-stake">{stake}</button>
            ))}
          </div>

          <div className="betslip-min-info">
            Min Bet: <strong>2</strong>
          </div>

          <div className="betslip-liability-total">
            <span className="total-liability-label">Liability</span>
            <span className="total-liability-value">0.00</span>
          </div>

          <div className="betslip-action-buttons">
            <button className="btn-bs-cancel" onClick={() => setSelectedBet(null)}>Cancel All</button>
            <button className="btn-bs-place">Place Bets</button>
          </div>

          <div className="betslip-confirm-wrap">
            <input type="checkbox" id="confirm-bet" />
            <label htmlFor="confirm-bet">Please confirm your bets.</label>
          </div>
        </>
      )}
    </div>
  );
};

export default BetSlip;
