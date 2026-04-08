import React, { useState } from 'react';
import './FullMarketCricket.css';
import BetSlip from '../components/BetSlip';
import Layout from '../components/Layout';

const FullMarketCricketPage = () => {
  const [selectedBet, setSelectedBet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const marketData = {
    matchOdds: [
      { id: 144197, name: 'Canada', back: [{ price: 3.8, size: '2,348' }, { price: 3.75, size: '553K' }, { price: 3.7, size: '114K' }], lay: [{ price: 3.85, size: '44,497' }, { price: 3.9, size: '523K' }, { price: 3.95, size: '431K' }] },
      { id: 247650, name: 'United Arab Emirates', back: [{ price: 1.35, size: '1.49M' }, { price: 1.34, size: '1.31M' }, { price: 1.33, size: '792K' }], lay: [{ price: 1.36, size: '1.4M' }, { price: 1.37, size: '321K' }, { price: 1.38, size: '579K' }] }
    ],
    winTheToss: [
      { id: 331, name: 'Canada', back: [{ price: 1.19, size: '24,872' }, { price: 1.18, size: '24,332' }, { price: 1.17, size: '213K' }], lay: [{ price: 1.2, size: '63,093' }, { price: 1.21, size: '85,088' }, { price: 1.22, size: '185K' }] },
      { id: 332, name: 'United Arab Emirates', back: [{ price: 6, size: '12,670' }, { price: 5.7, size: '18,485' }, { price: 5.6, size: '188' }], lay: [{ price: 6.4, size: '4,680' }, { price: 6.6, size: '4,347' }, { price: 6.8, size: '5' }] }
    ],
    lineMarket: [
      { id: 441, name: 'Canada', back: [{ price: 1.19, size: '24,872' }, { price: 1.18, size: '24,332' }, { price: 1.17, size: '213K' }], lay: [{ price: 1.2, size: '63,093' }, { price: 1.21, size: '85,088' }, { price: 1.22, size: '185K' }] },
      { id: 442, name: 'United Arab Emirates', back: [{ price: 6, size: '12,670' }, { price: 5.7, size: '18,485' }, { price: 5.6, size: '188' }], lay: [{ price: 6.4, size: '4,680' }, { price: 6.6, size: '4,347' }, { price: 6.8, size: '5' }] }
    ]
  };

  const handleBetClick = (runner, type, price, market = 'Match Odds') => {
    setSelectedBet({
      runner,
      type,
      price,
      market
    });
  };

  return (
    <Layout>
      <div className="full-market-container cricket-market">
        {/* Sidebar Navigation */}
        <aside className="market-sidebar">
          <div className="sidebar-header">Sports</div>
          <nav className="sidebar-nav">
            <div className="nav-item">All Sports</div>
            <div className="nav-item active-level-1">Cricket</div>
            <div className="nav-item active-level-2">ICC Men's T20 World Cup</div>
            <div className="nav-item active-level-3">Canada v United Arab Emirates</div>
            <div className="nav-item active-level-4">Match Odds</div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="market-main-content">
          {/* Scoreboard Section */}
          <section className="scoreboard-section">
            <div className="score-top-bar">
              <div className="team-info">
                <div style={{ width: '24px', height: '16px', background: 'red' }}></div> {/* Placeholder flag */}
                <span>Canada</span>
              </div>
              <div className="match-scores-center">
                <div className="score-main">BRK 150/7 18.2 OV</div>
                <div className="score-sub">7.64 CRR | Yet to bat</div>
              </div>
              <div className="team-info">
                <span>United Arab Emirates</span>
                <div style={{ width: '24px', height: '16px', background: 'green' }}></div> {/* Placeholder flag */}
              </div>
            </div>
            <div className="graph-area">
              <div className="run-rate-placeholder">
                RUN RATE
                <div className="run-rate-line"></div>
              </div>
            </div>
          </section>

          {/* Market Odds Table */}
          <div className="market-section">
            <div className="market-header-bar">
              <h3>Match Odds <span className="tag-inplay">In-Play</span></h3>
              <div className="matched-info">
                <span>Matched: <strong>PTH 676,571,907</strong></span>
                <span className="btn-live">Live</span>
              </div>
            </div>

            <table className="odds-table">
              <thead>
                <tr className="odds-header-labels">
                  <th className="runner-col" style={{ textAlign: 'left', paddingLeft: '15px' }}>2 selections</th>
                  <th colSpan="3" style={{ padding: '0' }}><div className="back-header-main" style={{ margin: '0 auto' }}>Back all</div></th>
                  <th colSpan="3" style={{ padding: '0' }}><div className="lay-header-main" style={{ margin: '0 auto' }}>Lay all</div></th>
                </tr>
              </thead>
              <tbody>
                {marketData.matchOdds.map((runner) => (
                  <tr key={runner.id} className="runner-row">
                    <td className="runner-info-cell">
                      <span className="runner-name">{runner.name}</span>
                    </td>
                    {runner.back.slice().reverse().map((b, i) => (
                      <td key={`b-${i}`} className={`odds-cell back-${3 - i}`} onClick={() => handleBetClick(runner.name, 'Back', b.price)}>
                        <span className="price">{b.price || '-'}</span>
                        <span className="size">{b.size || ''}</span>
                      </td>
                    ))}
                    {runner.lay.map((l, i) => (
                      <td key={`l-${i}`} className={`odds-cell lay-${i + 1}`} onClick={() => handleBetClick(runner.name, 'Lay', l.price)}>
                        <span className="price">{l.price || '-'}</span>
                        <span className="size">{l.size || ''}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bookmaker Market Section */}
          <div className="market-section">
            <div className="market-section-title">
              <span className="add-pin">☆</span>
              <strong>Bookmaker Market</strong>
              <span className="zero-comm">Zero Commission</span>
            </div>
            <div className="section-head" style={{ background: '#f5f5f5', color: '#333', borderBottom: '1px solid #ddd' }}>
              <h4>Bookmaker</h4>
              <div className="min-max-label">Min 5.00 Max 39,219.00</div>
            </div>
            <table className="odds-table bookmaker-table">
              <thead>
                <tr className="odds-header-labels">
                  <th className="runner-col"></th>
                  <th colSpan="3">Back</th>
                  <th colSpan="3">Lay</th>
                </tr>
              </thead>
              <tbody>
                <tr className="runner-row">
                  <td className="runner-info-cell"><span className="runner-name">Canada</span></td>
                  <td colSpan="6" style={{ background: '#f9f9f9' }}>
                    <div style={{ background: '#bdbdbd', color: '#d0021b', fontWeight: 'bold', padding: '10px', textAlign: 'center' }}>Suspend</div>
                  </td>
                </tr>
                <tr className="runner-row">
                  <td className="runner-info-cell"><span className="runner-name">United Arab Emirates</span></td>
                  <td className="odds-cell" style={{ border: 'none' }}></td>
                  <td className="odds-cell" style={{ background: '#e2f2fe' }}>33</td>
                  <td className="odds-cell" style={{ background: '#add8f4' }}>34</td>
                  <td className="odds-cell" style={{ background: '#72bbef' }}>35</td>
                  <td className="odds-cell" style={{ background: '#faa9ba' }}>37</td>
                  <td className="odds-cell" style={{ background: '#fbcbd5' }}>38</td>
                  <td className="odds-cell" style={{ background: '#fde4ea' }}>39</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Win The Toss Section */}
          <div className="market-section">
            <div className="market-section-title">
              <span className="add-pin">☆</span>
              <strong>Win The Toss</strong>
              <span className="zero-comm">Zero Commission</span>
            </div>
            <table className="odds-table">
              <thead>
                <tr className="odds-header-labels">
                  <th className="runner-col" style={{ textAlign: 'left', paddingLeft: '15px' }}>2 selections</th>
                  <th colSpan="3"><div className="back-header-main" style={{ margin: '0 auto' }}>Back all</div></th>
                  <th colSpan="3"><div className="lay-header-main" style={{ margin: '0 auto' }}>Lay all</div></th>
                </tr>
              </thead>
              <tbody>
                {marketData.winTheToss.map((runner) => (
                  <tr key={runner.id} className="runner-row">
                    <td className="runner-info-cell"><span className="runner-name">{runner.name}</span></td>
                    {runner.back.slice().reverse().map((b, i) => (
                      <td key={`b-${i}`} className={`odds-cell back-${3 - i}`} onClick={() => handleBetClick(runner.name, 'Back', b.price, 'Win The Toss')}>
                        <span className="price">{b.price || '-'}</span>
                        <span className="size">{b.size || ''}</span>
                      </td>
                    ))}
                    {runner.lay.map((l, i) => (
                      <td key={`l-${i}`} className={`odds-cell lay-${i + 1}`} onClick={() => handleBetClick(runner.name, 'Lay', l.price, 'Win The Toss')}>
                        <span className="price">{l.price || '-'}</span>
                        <span className="size">{l.size || ''}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line Market Section */}
          <div className="market-section">
            <div className="market-section-title">
              <span className="add-pin">☆</span>
              <strong>Line Market</strong>
              <span className="zero-comm">Zero Commission</span>
            </div>
            <table className="odds-table">
              <thead>
                <tr className="odds-header-labels">
                  <th className="runner-col" style={{ textAlign: 'left', paddingLeft: '15px' }}>2 selections</th>
                  <th colSpan="3"><div className="back-header-main" style={{ margin: '0 auto' }}>Back all</div></th>
                  <th colSpan="3"><div className="lay-header-main" style={{ margin: '0 auto' }}>Lay all</div></th>
                </tr>
              </thead>
              <tbody>
                {marketData.lineMarket.map((runner) => (
                  <tr key={runner.id} className="runner-row">
                    <td className="runner-info-cell"><span className="runner-name">{runner.name}</span></td>
                    {runner.back.slice().reverse().map((b, i) => (
                      <td key={`b-${i}`} className={`odds-cell back-${3 - i}`} onClick={() => handleBetClick(runner.name, 'Back', b.price, 'Line Market')}>
                        <span className="price">{b.price || '-'}</span>
                        <span className="size">{b.size || ''}</span>
                      </td>
                    ))}
                    {runner.lay.map((l, i) => (
                      <td key={`l-${i}`} className={`odds-cell lay-${i + 1}`} onClick={() => handleBetClick(runner.name, 'Lay', l.price, 'Line Market')}>
                        <span className="price">{l.price || '-'}</span>
                        <span className="size">{l.size || ''}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>

        {/* Right Sidebar - BetSlip */}
        <aside className="betslip-sidebar">
          <div className="betslip-header">Bet Slip</div>
          <BetSlip selectedBet={selectedBet} setSelectedBet={setSelectedBet} />
        </aside>
      </div>
    </Layout>
  );
};

export default FullMarketCricketPage;
