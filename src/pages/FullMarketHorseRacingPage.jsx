import React, { useState } from 'react';
import './FullMarketHorseRacing.css';
import BetSlip from '../components/BetSlip';
import Layout from '../components/Layout';

const FullMarketHorseRacingPage = () => {
  const [activeTab, setActiveTab] = useState('match-odds');
  const [selectedBet, setSelectedBet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Expanded runners data to match the HTML source and image
  const runners = [
    { id: 73001912, name: 'Torque Power', number: 2, stall: 2, jockey: 'Kerryn Manning', back: [{ price: 6.8, size: 51 }, { price: 6.6, size: 184 }, { price: 6.4, size: 438 }], lay: [] },
    { id: 38697697, name: 'Popcornfriday', number: 4, stall: 4, jockey: 'Jackie Barker', back: [{ price: 8.0, size: 37 }, { price: 7.8, size: 72 }, { price: 7.6, size: 1469 }], lay: [] },
    { id: 6949776, name: 'Isolation', number: 5, stall: 5, jockey: 'James Herbertson', back: [{ price: 1.96, size: 33 }, { price: 1.95, size: 44 }, { price: 1.94, size: 89 }], lay: [] },
    { id: 75674457, name: 'Blackindeed', number: 6, stall: 6, jockey: 'Jordan Leedham', back: [{ price: 13.0, size: 238 }, { price: 12.5, size: 797 }, { price: 12.0, size: 100 }], lay: [] },
  ];

  const handleBetClick = (runner, type, price) => {
    setSelectedBet({
      runner: runner.name,
      type: type,
      price: price,
      market: 'Match Odds',
      stake: ''
    });
  };

  return (
    <Layout>
      <div className="full-market-container">
        {/* Sidebar Navigation */}
        <aside className={`market-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
          <div className="sidebar-header">
            <span>Sports</span>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="toggle-btn">
              {isSidebarOpen ? '◀' : '▶'}
            </button>
          </div>
          <nav className="sidebar-nav">
            <div className="nav-item sports active">
              <span className="icon">🏆</span> Horse Racing
            </div>
            <div className="nav-submenu level-1">
              <div className="nav-item country">
                <span>AUS</span>
                <span className="arrow">▼</span>
              </div>
              <div className="nav-submenu level-2">
                <div className="nav-item venue active">
                  <span>Melton (AUS) 28th Mar</span>
                  <span className="arrow">▼</span>
                </div>
                <ul className="race-times">
                  <li>15:31</li>
                  <li>16:00</li>
                  <li className="active">16:30</li>
                  <li>17:00</li>
                  <li>17:30</li>
                </ul>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="market-main-content">
          {/* Game Title Section */}
          <div className="game-header">
            <div className="game-title">
               <span className="event-type-tag">HORSE RACING</span>
               <h2>R5 1720m Pace M</h2>
               <span className="event-date">28-Mar-2024 16:30:00</span>
            </div>
            <div className="game-status-bar">
               <div className="market-label">
                  <span className="market-name">Match Odds</span>
                  <span className="status-tags">
                     <span className="tag-inplay">In-Play</span>
                     <span className="tag-livetv">Live TV</span>
                  </span>
               </div>
               <div className="market-meta">
                  <span>Matched: <strong>PTH 77,542</strong></span>
               </div>
            </div>
          </div>

          {/* Odds Table */}
          <div className="odds-table-container">
            <table className="odds-table">
              <thead>
                <tr className="odds-header-labels">
                  <th className="runner-col"></th>
                  <th colSpan="3" className="back-header-main">Back</th>
                  <th colSpan="3" className="lay-header-main">Lay</th>
                </tr>
              </thead>
              <tbody>
                {runners.map((runner) => (
                  <tr key={runner.id} className="runner-row">
                    <td className="runner-info-cell">
                      <div className="runner-main-info">
                         <div className="runner-id-box">
                           <span className="cloth-num">{runner.number}</span>
                           <span className="stall-num">({runner.stall})</span>
                         </div>
                         <div className="runner-silk"><div className={`silk-icon silk-${runner.id}`}></div></div>
                         <div className="runner-details">
                           <span className="runner-name">{runner.name}</span>
                           <span className="jockey-name">{runner.jockey}</span>
                         </div>
                      </div>
                    </td>
                    
                    {/* Back Odds */}
                    <td className="odds-cell back-3" onClick={() => handleBetClick(runner, 'Back', runner.back[2]?.price)}>
                      <span className="price">{runner.back[2]?.price || '-'}</span>
                      <span className="size">{runner.back[2]?.size || ''}</span>
                    </td>
                    <td className="odds-cell back-2" onClick={() => handleBetClick(runner, 'Back', runner.back[1]?.price)}>
                      <span className="price">{runner.back[1]?.price || '-'}</span>
                      <span className="size">{runner.back[1]?.size || ''}</span>
                    </td>
                    <td className="odds-cell back-1" onClick={() => handleBetClick(runner, 'Back', runner.back[0]?.price)}>
                      <span className="price">{runner.back[0]?.price || '-'}</span>
                      <span className="size">{runner.back[0]?.size || ''}</span>
                    </td>

                    {/* Lay Odds */}
                    <td className="odds-cell lay-1 inactive">
                      <span className="price">-</span>
                    </td>
                    <td className="odds-cell lay-2 inactive">
                      <span className="price">-</span>
                    </td>
                    <td className="odds-cell lay-3 inactive">
                      <span className="price">-</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Sidebar - BetSlip */}
        <aside className="betslip-sidebar">
          <BetSlip selectedBet={selectedBet} setSelectedBet={setSelectedBet} />
        </aside>
      </div>
    </Layout>
  );
};

export default FullMarketHorseRacingPage;
