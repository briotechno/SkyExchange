import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import LeftSidebar from '../components/LeftSidebar';
import BetSlip from '../components/BetSlip';
import Footer from '../components/Footer';
import './HorseRacing.css';

const racingRegions = [
  {
    name: 'New Zealand',
    races: [{ name: 'Omakau (NZL) 2nd Jan - Race 1', time: '11:09' }]
  },
  {
    name: 'South Africa',
    races: [{ name: 'Omakau (NZL) 2nd Jan - Race 1', time: '11:09' }]
  },
  {
    name: 'France',
    races: [{ name: 'Omakau (NZL) 2nd Jan - Race 1', time: '11:09' }]
  },
  {
    name: 'Ireland',
    races: [{ name: 'Omakau (NZL) 2nd Jan - Race 1', time: '11:09' }]
  },
  {
    name: 'Australia',
    races: [
      {
        name: 'Hobart (AUS) 2nd Jan - Race 1',
        times: ['11:17', '11:52', '12:30', '13:00'],
        activeTime: '11:17'
      },
      {
        name: 'Taree (AUS) 2nd Jan - Race 2',
        times: ['11:25', '12:00']
      },
      {
        name: 'Terang (AUS) 2nd Jan - Race 3',
        times: ['11:30']
      }
    ]
  }
];

function HorseRacingPage() {
  const [activeTab, setActiveTab] = useState('Today');
  const [activeRaceId, setActiveRaceId] = useState(null);
  const navigate = useNavigate();

  const handleRaceClick = (raceName) => {
    if (activeRaceId === raceName) {
      setActiveRaceId(null);
    } else {
      setActiveRaceId(raceName);
    }
  };

  const handleMatchOddsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/full-market-horse-racing');
  };

  return (
    <Layout>
      <div className="page horse-racing-page">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="side-head">Sports</div>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>All Sports</a>
          <a className="side-item active" href="#" onClick={(e) => e.preventDefault()}>Horse Racing</a>

          <a className="side-item gray" href="#" onClick={(e) => e.preventDefault()}>Common</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>Horse Racing - Today’s Card</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>ANTEPOST</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>Australia</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>France</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>Ireland</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>New Zealand</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>South Africa</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>UAE</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>United Kingdom</a>
          <a className="side-item" href="#" onClick={(e) => e.preventDefault()}>United States</a>
        </aside>

        {/* Center Content */}
        <section className="content">
          {/* News Bar */}
          <div className="news-bar">
            <div className="news-left">🎤 <span>News</span></div>
            <div className="news-scroll">
              <div className="news-track">
                <span>Horse Racing Updates • Bets Voided • Market Update • Horse Racing Updates • Bets Voided • Market Update</span>
              </div>
            </div>
          </div>

          <h3 className="mobile-h3">Next Horse Race</h3>



          <div className="banner1"></div>

          <div className="next-race">
            <span><b>Next Horse Race</b></span>
            <span className="chip">11:25 Taree(AUS)</span>
            <span>R7 2000m Hcap</span>
          </div>

          <div className="next-links">
            <span className="chip">Coming Up</span>
            <a href="#" onClick={(e) => e.preventDefault()}>11:30 Terang(AUS)</a>
            <a href="#" onClick={(e) => e.preventDefault()}>11:34 Kilcoy(AUS)</a>
            <a href="#" onClick={(e) => e.preventDefault()}>11:37 Goulburn(AUS)</a>
            <a href="#" onClick={(e) => e.preventDefault()}>11:39 Esperance(AUS)</a>
          </div>

          <div className="tabs">
            {['Today', 'Tomorrow', 'Day After'].map(tab => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Region Panels */}
          {racingRegions.map((region, idx) => (
            <div key={idx} className="panel">
              <div className="panel-title">
                {region.name} <span>−</span>
              </div>
              {region.races.map((race, rIdx) => (
                <div key={rIdx} className="panel-content">
                  <a
                    href="javascript:void(0);"
                    className={`race-link ${activeRaceId === race.name ? 'race-link--active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleRaceClick(race.name); }}
                  >
                    {race.name}
                  </a>
                  {activeRaceId === race.name && (
                    <a
                      href="javascript:void(0);"
                      className="race-match-odds"
                      onClick={handleMatchOddsClick}
                    >
                      ● Match Odds
                    </a>
                  )}
                  <div className="times">
                    {race.time && <span className="time-box">{race.time}</span>}
                    {race.times && race.times.map((t, tIdx) => (
                      t === race.activeTime ?
                        <span key={tIdx} className="time-box">{t}</span> :
                        <a key={tIdx} href="#" className="time-link" onClick={(e) => e.preventDefault()}>{t}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div style={{ height: '100px' }}></div>
          <Footer />
        </section>

        {/* Right Sidebar / Bet Slip */}
        <aside className="betslip">
          <BetSlip />
        </aside>
      </div>
    </Layout>
  );
}

export default HorseRacingPage;
