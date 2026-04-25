import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AccountLayout from './AccountLayout';
import { useAuthStore } from '../../store/authStore';
import { bettingController } from '../../controllers';

function BetsHistoryPage() {
  const [activeTab, setActiveTab] = useState('Current Bets');
  const [activeSubTab, setActiveSubTab] = useState('Exchange');
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Profit & Loss States
  const [plData, setPlData] = useState([]);
  const [plLoading, setPlLoading] = useState(false);

  // Default dates for P&L
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formatDateForInput = (date) => date.toISOString().split('T')[0];
  const formatDateForApi = (dateStr) => {
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  const [plStartDate, setPlStartDate] = useState(formatDateForInput(yesterday));
  const [plEndDate, setPlEndDate] = useState(formatDateForInput(today));

  const location = useLocation();
  const { loginToken, isLoggedIn, username } = useAuthStore();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');

    if (tabParam === 'history') {
      setActiveTab('Bets History');
    } else if (tabParam === 'pnl') {
      setActiveTab('Profit & Loss');
    } else {
      setActiveTab('Current Bets');
    }
  }, [location.search]);

  useEffect(() => {
    if (isLoggedIn && loginToken) {
      if (activeTab === 'Current Bets') {
        fetchBets();
      } else if (activeTab === 'Profit & Loss') {
        fetchPL();
      }
    }
  }, [isLoggedIn, loginToken, activeTab]);

  const fetchBets = async () => {
    try {
      setLoading(true);
      const res = await bettingController.getMyBets(loginToken);
      if (res && typeof res === 'object' && !res.error) {
        const betArray = Object.values(res).filter(item => typeof item === 'object' && item !== null);
        setBets(betArray);
      }
    } catch (err) {
      console.error('Failed to fetch bets:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPL = async () => {
    try {
      setPlLoading(true);
      const res = await bettingController.getProfitLoss(
        loginToken,
        formatDateForApi(plStartDate),
        formatDateForApi(plEndDate)
      );
      if (res && typeof res === 'object' && !res.error) {
        const plArray = Object.values(res).filter(item => typeof item === 'object' && item !== null);
        setPlData(plArray);
      } else {
        setPlData([]);
      }
    } catch (err) {
      console.error('Failed to fetch PL:', err);
    } finally {
      setPlLoading(false);
    }
  };

  const matchedBets = bets.filter(b => b.Type?.toLowerCase().includes('match') || String(b.IsMatched) === '1');
  const unmatchedBets = bets.filter(b => !b.Type?.toLowerCase().includes('match') && String(b.IsMatched) !== '1');

  const renderCurrentBets = () => (
    <>
      <div className="sub-tabs">
        {['Exchange', 'FancyBet', 'Sportsbook', 'BookMaker'].map(tab => (
          <button
            key={tab}
            className={`sub-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bets-filter-box">
        <div className="filter-row-simple">
          <span>Bet Status: </span>
          <select className="date-input">
            <option>All</option>
          </select>
          <span className="filter-label">Order By: </span>
          <label><input type="checkbox" checked readOnly /> Bet placed</label>
          <label><input type="checkbox" /> Market</label>
        </div>
      </div>

      <div className="unmatched-section">
        <div className="section-title">Unmatched {loading && <small>(Loading...)</small>}</div>
        <div className="data-table-wrapper">
          <table className="data-table balance-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Market</th>
                <th style={{ textAlign: 'right' }}>Selection</th>
                <th style={{ textAlign: 'center' }}>Type</th>
                <th style={{ textAlign: 'center' }}>Bet ID</th>
                <th style={{ textAlign: 'center' }}>Bet placed</th>
                <th style={{ textAlign: 'center' }}>Odds req.</th>
                <th style={{ textAlign: 'center' }}>Matched</th>
                <th style={{ textAlign: 'center' }}>Unmatched</th>
                <th style={{ textAlign: 'center' }}>Date matched</th>
              </tr>
            </thead>
            <tbody>
              {unmatchedBets.length > 0 ? (
                unmatchedBets.map((bet, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'left' }}>{bet.Game || '-'}</td>
                    <td style={{ textAlign: 'right' }}>{bet.Selection || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Type || bet.Side || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.BetId || bet.Id || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Date || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Rate || '-'}</td>
                    <td style={{ textAlign: 'center' }}>0</td>
                    <td style={{ textAlign: 'center' }}>{bet.Stake || '-'}</td>
                    <td style={{ textAlign: 'center' }}>-</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ padding: '15px' }}>You have no bets in this time period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="matched-section">
        <div className="section-title">Matched</div>
        <div className="data-table-wrapper">
          <table className="data-table balance-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Market</th>
                <th style={{ textAlign: 'right' }}>Selection</th>
                <th style={{ textAlign: 'center' }}>Type</th>
                <th style={{ textAlign: 'center' }}>Bet ID</th>
                <th style={{ textAlign: 'center' }}>Bet placed</th>
                <th style={{ textAlign: 'center' }}>Odds req.</th>
                <th style={{ textAlign: 'center' }}>Matched</th>
                <th style={{ textAlign: 'center' }}>Avg. odds matched</th>
                <th style={{ textAlign: 'center' }}>Date matched</th>
              </tr>
            </thead>
            <tbody>
              {matchedBets.length > 0 ? (
                matchedBets.map((bet, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'left' }}>{bet.Game || '-'}</td>
                    <td style={{ textAlign: 'right' }}>{bet.Selection || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Type || bet.Side || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.BetId || bet.Id || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Date || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Rate || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Stake || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Rate || '-'}</td>
                    <td style={{ textAlign: 'center' }}>{bet.Date || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" style={{ padding: '15px' }}>You have no bets in this time period.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

  const renderBetsHistory = () => (
    <>
      <div className="sub-tabs">
        {['Exchange', 'FancyBet', 'Sportsbook', 'BookMaker'].map(tab => (
          <button
            key={tab}
            className={`sub-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bets-filter-box">
        <div className="filter-row-flex">
          <div className="filter-group">
            <span>Bet Status:</span>
            <select className="date-input">
              <option>Settled</option>
            </select>
          </div>
          <div className="filter-group">
            <span>Period</span>
            <input className="date-input date-picker" type="date" value={plStartDate} onChange={(e) => setPlStartDate(e.target.value)} />
            <span>to</span>
            <input className="date-input date-picker" type="date" value={plEndDate} onChange={(e) => setPlEndDate(e.target.value)} />
          </div>
        </div>
        <div className="filter-actions">
          <button className="sub-tab" onClick={() => { setPlStartDate(formatDateForInput(today)); setPlEndDate(formatDateForInput(today)); }}>Just For Today</button>
          <button className="sub-tab" onClick={() => { setPlStartDate(formatDateForInput(yesterday)); setPlEndDate(formatDateForInput(today)); }}>From Yesterday</button>
          <button className="btn-submit-bets" onClick={fetchPL}>Get History</button>
        </div>
      </div>

      <div className="disclaimer-text">
        <p>Betting History enables you to review the bets you have placed.</p>
        <p>Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
        <p>Betting History is available online for the past 62 days.</p>
        <p>User can search up to 14 days records per query only.</p>
      </div>
    </>
  );

  const renderProfitAndLoss = () => (
    <div className="bets-pnl-wrapper">
      <div style={{ marginBottom: '15px' }}>
        <h4 style={{ margin: '0 0 5px 0', fontSize: '15px', color: '#3b5160', fontWeight: '700' }}>Profit & Loss - Main wallet</h4>
        <div style={{ fontSize: '12px', color: '#666', display: 'flex', gap: '15px' }}>
          <span>👤 {username || 'User'}</span>
          <span>📅 {new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="sub-tabs" style={{ flexWrap: 'wrap' }}>
        {['Exchange', 'FancyBet', 'Casino', 'Sportsbook', 'BookMaker', 'BPoker', 'SABA', 'MiniGame', 'Royal'].map(tab => (
          <button
            key={tab}
            className={`sub-tab ${activeSubTab === tab ? 'active' : ''}`}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bets-filter-box">
        <div className="filter-row-flex">
          <div className="filter-group">
            <span>Period</span>
            <input 
              className="date-input" 
              type="date" 
              value={plStartDate} 
              onChange={(e) => setPlStartDate(e.target.value)}
            />
            <span>to</span>
            <input 
              className="date-input" 
              type="date" 
              value={plEndDate} 
              onChange={(e) => setPlEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="filter-actions">
          <button className="sub-tab" onClick={() => { setPlStartDate(formatDateForInput(today)); setPlEndDate(formatDateForInput(today)); }}>Just For Today</button>
          <button className="sub-tab" onClick={() => { setPlStartDate(formatDateForInput(yesterday)); setPlEndDate(formatDateForInput(today)); }}>From Yesterday</button>
          <button className="btn-submit-bets" onClick={fetchPL} style={{ background: '#3b5160', color: '#fff', border: 'none', padding: '0 20px', cursor: 'pointer' }}>
            {plLoading ? 'Loading...' : 'Get P & L'}
          </button>
        </div>
      </div>

      <div className="pl-data-section" style={{ marginTop: '20px' }}>
        <div className="data-table-wrapper">
          <table className="data-table balance-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'left' }}>Date/Time</th>
                <th style={{ textAlign: 'left' }}>Market</th>
                <th style={{ textAlign: 'right' }}>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              {plData.length > 0 ? (
                plData.map((row, idx) => {
                  const amt = parseFloat(row.amount);
                  return (
                    <tr key={idx}>
                      <td style={{ textAlign: 'left' }}>{row.DateTime}</td>
                      <td style={{ textAlign: 'left' }}>{row.GameName}</td>
                      <td style={{ textAlign: 'right', color: amt >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                        {amt.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
                    {plLoading ? 'Fetching data...' : 'No P&L data found for this period.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="disclaimer-text" style={{ marginTop: '20px' }}>
        <p>Betting Profit & Loss enables you to review the bets you have placed.</p>
        <p>Specify the time period during which your bets were placed, the type of markets on which the bets were placed, and the sport.</p>
        <p>Betting Profit & Loss is available online for the past 62 days.</p>
        <p>User can search up to 14 days records per query only.</p>
      </div>
    </div>
  );

  return (
    <AccountLayout title="My Bets">
      <div className="tabs-container">
        {['Current Bets', 'Bets History', 'Profit & Loss'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              if (tab === 'Profit & Loss') setActiveSubTab('Exchange');
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content-area">
        {activeTab === 'Current Bets' && renderCurrentBets()}
        {activeTab === 'Bets History' && renderBetsHistory()}
        {activeTab === 'Profit & Loss' && renderProfitAndLoss()}
      </div>
    </AccountLayout>
  );
}

export default BetsHistoryPage;
