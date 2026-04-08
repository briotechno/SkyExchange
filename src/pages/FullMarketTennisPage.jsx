import React, { useState } from 'react';
import Layout from '../components/Layout';
import BetSlip from '../components/BetSlip';
import './FullMarketTennis.css';

const FullMarketTennisPage = () => {
  const [selectedBet, setSelectedBet] = useState(null);

  const marketData = {
    matchOdds: [
      { id: 1, name: 'Harris, Lloyd', back: [{ price: 1.41, size: '524' }, { price: 1.4, size: '4,081' }, { price: 1.39, size: '863' }], lay: [{ price: 1.43, size: '230' }, { price: 1.44, size: '5,651' }, { price: 1.45, size: '6,241' }] },
      { id: 2, name: 'Martin Tiffon, Pol', back: [{ price: 8.2, size: '22' }, { price: 8, size: '971' }, { price: 7.8, size: '563' }], lay: [{ price: 8.4, size: '284' }, { price: 8.6, size: '50' }, { price: 8.8, size: '266' }] }
    ]
  };

  const handleBetClick = (runner, type, price, market = 'Match Odds') => {
    setSelectedBet({ runner, type, price, market });
  };

  return (
    <Layout>
      <div className="full-market-container tennis-market">
        {/* Sidebar Navigation */}
        <aside className="market-sidebar">
          <div className="sidebar-header">Sports</div>
          <nav className="sidebar-nav">
            <div className="nav-item level-sports">All Sports</div>
            <div className="nav-item level-tennis">Tennis</div>
            <div className="nav-item level-competition">Santa Cruz de Tenerife Challenger 2026</div>
            <div className="nav-item level-match">L Harris v Martin Tiffon</div>
            <div className="nav-item level-market">Match Odds</div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="market-main-content" style={{ flex: 1 }}>
          {/* Tennis Scoreboard */}
          <section className="tennis-scoreboard">
            <div style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '11px', color: '#ffb80c' }}>
              Set 1 | Game 6
            </div>
            <table className="tennis-score-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', color: '#ffb80c' }}>Best of 3</th>
                  <th>1</th>
                  <th>2</th>
                  <th>T</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="player-info-cell">
                    <div style={{ width: '20px', height: '12px', background: '#388e3c' }}></div>
                    Harris, Lloyd
                  </td>
                  <td className="score-digit-cell">2</td>
                  <td className="score-digit-cell">-</td>
                  <td className="score-digit-cell" style={{ color: '#fff' }}>0</td>
                </tr>
                <tr>
                  <td className="player-info-cell">
                    <div style={{ width: '20px', height: '12px', background: '#d32f2f' }}></div>
                    Martin Tiffon, Pol
                  </td>
                  <td className="score-digit-cell">3</td>
                  <td className="score-digit-cell">-</td>
                  <td className="score-digit-cell" style={{ color: '#fff' }}>0</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Center Control Bar */}
          <div className="market-control-bar">
            {/* Same SVG icons can be added here or mapped via CSS class */}
            <div className="control-bar-inner" style={{ padding: '4px 30px' }}>
               📌 Refresh
            </div>
          </div>

          {/* Match Odds Market */}
          <div className="market-section">
            <div className="market-header-bar">
              <h3 style={{ margin: 0, fontSize: '15px' }}>Match Odds <span className="tag-inplay" style={{ marginLeft: '10px' }}>In-Play</span></h3>
              <div className="matched-info" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="max-pill">Max 1600</div>
                <div className="matched-amount" style={{ fontSize: '12px' }}>Matched: <strong>PTH 383,403</strong></div>
                <div style={{ background: '#243a48', color: '#fff', padding: '3px 10px', borderRadius: '15px', fontSize: '11px' }}>Live</div>
              </div>
            </div>

            <table className="odds-table">
              <thead>
                <tr style={{ background: '#eee', height: '24px' }}>
                  <th style={{ textAlign: 'left', paddingLeft: '15px', fontSize: '11px' }}>2 selections</th>
                  <th colSpan="3" style={{ background: '#72bbef', fontSize: '12px', fontWeight: 'bold' }}>Back all</th>
                  <th colSpan="3" style={{ background: '#faa9ba', fontSize: '12px', fontWeight: 'bold' }}>Lay all</th>
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
                        <span className="price">{b.price}</span>
                        <span className="size">{b.size}</span>
                      </td>
                    ))}
                    {runner.lay.map((l, i) => (
                      <td key={`l-${i}`} className={`odds-cell lay-${i + 1}`} onClick={() => handleBetClick(runner.name, 'Lay', l.price)}>
                        <span className="price">{l.price}</span>
                        <span className="size">{l.size}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        <aside className="betslip-sidebar">
          <BetSlip selectedBet={selectedBet} setSelectedBet={setSelectedBet} />
        </aside>
      </div>
    </Layout>
  );
};

export default FullMarketTennisPage;
