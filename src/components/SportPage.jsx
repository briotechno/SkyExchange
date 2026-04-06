import React from 'react';
import Layout from './Layout';
import LeftSidebar from './LeftSidebar';
import BetSlip from './BetSlip';
import Footer from './Footer';

// Match row data - sample matches that would come from API in real site
const sampleCricketMatches = [
  { id: 1, name: 'Central Stags v Canterbury Kings', status: 'In-Play', matched: 'PTE5.61M', back1: '1000', back2: '', lay2: '', back3: '', lay3: '1.01', hasC: true, hasF: true, hasP: true },
  { id: 2, name: 'Glenorchy v University of Tasmania', status: 'In-Play', matched: 'PTE0', back1: '', lay1: '', hasC: true, hasF: true, hasP: true },
  { id: 3, name: 'Khan Research Laboratories v Sahir Associates', status: 'In-Play', matched: 'PTE0', back1: '', lay1: '', hasC: true, hasF: true, hasP: true },
  { id: 4, name: 'Glenorchy v University of Tasmania', status: 'In-Play', matched: 'PTE0', back1: '', lay1: '', hasC: true, hasF: true, hasP: true },
  { id: 5, name: 'Australia SRL T20 v West Indies SRL T20', status: '11:30', matched: 'PTE0', back1: '', lay1: '', hasC: true, hasF: true, hasP: true },
];

const sampleSoccerMatches = [
  { id: 101, name: 'Manchester City v Arsenal', status: 'In-Play', matched: 'PTE12.5M', back1: '1.85', lay1: '1.86', back2: '3.6', lay2: '3.8', back3: '4.2', lay3: '4.5', hasC: true, hasF: false, hasP: true },
  { id: 102, name: 'Real Madrid v Barcelona', status: '20:30', matched: 'PTE0', back1: '', lay1: '', back2: '', lay2: '', back3: '', lay3: '', hasC: true, hasF: false, hasP: true },
];
const sampleTennisMatches = [];

function MatchRow({ match, sport }) {
  const isLive = match.status === 'In-Play';
  const gridClass = sport === 'Tennis' ? 'tennis-grid' : '';

  return (
    <div className={`sports-row desktop-grid ${gridClass}`} id={`eventId_${match.id}`}>
      <div className="col-event">
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3px' }}>
          <span className="green-dot" style={{ display: isLive ? 'inline-block' : 'none' }}></span>
          <a href="#" onClick={(e) => e.preventDefault()} className="event-link">
            {match.name}
          </a>
        </div>
        <div className="event-sub">
          <span className={`inplay-text ${isLive ? 'in-play' : ''}`} style={{ color: isLive ? '#008000' : '#333', fontWeight: 'bold' }}>{match.status}</span>
          {match.hasC && <span className="icon icon-tv" style={{ display: 'inline-block', width: '16px', height: '16px', background: '#0077cc', color: '#fff', borderRadius: '3px', marginLeft: '5px', fontSize: '10px', textAlign: 'center', lineHeight: '16px' }}>C</span>}
          {match.hasF && <span className="icon icon-fancy" style={{ display: 'inline-block', width: '16px', height: '16px', background: '#ff7b00', color: '#fff', borderRadius: '3px', marginLeft: '5px', fontSize: '10px', textAlign: 'center', lineHeight: '16px' }}>F</span>}
          {match.hasP && <span className="icon icon-chart" style={{ display: 'inline-block', width: '16px', height: '16px', background: '#333', color: '#fff', borderRadius: '3px', marginLeft: '5px', fontSize: '10px', textAlign: 'center', lineHeight: '16px' }}>P</span>}
          <a href="#" id={`favoriteBtn_${match.id}`} className="add-pin" title="Add to favorites" style={{ marginLeft: '8px', textDecoration: 'none', color: '#999', fontSize: '16px' }}>☆</a>
        </div>
      </div>

      <div className="col-matched">
        <span>{match.matched || 'PTE0'}</span>
      </div>

      {/* Odds 1 */}
      <div className="col-odds">
        <div className="odds-box back">
          <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.back1 || '--'}</a>
        </div>
        <div className="odds-box lay">
          <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.lay1 || '--'}</a>
        </div>
      </div>

      {/* Odds X */}
      {sport !== 'Tennis' && (
        <div className="col-odds">
          <div className="odds-box back">
            <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.back2 || '--'}</a>
          </div>
          <div className="odds-box lay">
            <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.lay2 || '--'}</a>
          </div>
        </div>
      )}

      {/* Odds 2 */}
      <div className="col-odds">
        <div className="odds-box back">
          <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.back3 || '--'}</a>
        </div>
        <div className="odds-box lay">
          <a href="#" style={{ color: '#000', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.preventDefault()}>{match.lay3 || '--'}</a>
        </div>
      </div>

      <div className="col-expand">
        <button className="expand-btn">+</button>
      </div>
    </div>
  );
}

function SportPageWithLayout({
  sport,
  kvImage,
  competitions = [],
  countries = [],
  matches = [],
  viewByOptions = ['Time', 'Competition'],
}) {
  const [viewBy, setViewBy] = React.useState('Time');
  return (
    <Layout>
      {/* Main 3-column grid layout matching HTML */}
      <main className="main">
        {/* Left sidebar */}
        <LeftSidebar sport={sport} competitions={competitions} countries={countries} />

        {/* Center column */}
        <div id="centerColumn" className="center">
          {/* News Marquee */}
          <div id="marqueeWrap" className="marquee-box1">
            <h4>News</h4>
            <div className="marquee">
              <p id="marqueeContent">Horse Racing Updates ● Bets Voided ● Market Update ● Horse Racing Updates ● Bets Voided ● Market Update</p>
            </div>
          </div>

          <div id="overWrap" className="over-wrap" style={{ height: 'calc(100% - 0px)' }}>
            {/* KV Banner */}
            {kvImage && (
              <div className="banner1" style={{ backgroundImage: `url(${kvImage})` }}></div>
            )}

            {/* Event table */}
            <div id="sportEvent" className="sports-highlights">
              {/* Sports header bar */}
              <div className="sports-header">
                <span className="sports-title">Sports Highlights</span>
                <div className="viewby-box">
                  <span className="viewby-text">View by</span>
                  <select
                    value={viewBy}
                    onChange={(e) => setViewBy(e.target.value)}
                    className="viewby-select"
                  >
                    {viewByOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table header */}
              <div className={`sports-table-head desktop-grid ${sport === 'Tennis' ? 'tennis-grid' : ''}`}>
                <div className="col-event"></div>
                <div className="col-matched" style={{ paddingLeft: '10px' }}>Matched</div>
                <div className="col-odds-1" style={{ justifyContent: 'center', fontWeight: 'bold' }}>1</div>
                {sport !== 'Tennis' && <div className="col-odds-1" style={{ justifyContent: 'center', fontWeight: 'bold' }}>X</div>}
                <div className="col-odds-1" style={{ justifyContent: 'center', fontWeight: 'bold' }}>2</div>
                <div className="col-expand"></div>
              </div>

              <div id="eventlistData">
                {matches.length > 0 ? (
                  matches.map((m) => <MatchRow key={m.id} match={m} sport={sport} />)
                ) : (
                  <div className="no-item" style={{ textAlign: 'center', padding: '20px' }}>
                    <div className="loading-wrap" style={{ display: 'flex', justifyContent: 'center' }}>
                      <ul className="loading" style={{ listStyle: 'none', padding: 0 }}>
                        <li><img src="/images/loading40.gif" alt="" /></li>
                        <li>Loading...</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>

        {/* Right Bet Slip */}
        <div className="betslip">
          <BetSlip />
        </div>
      </main>

      {/* Announcement overlay */}
      <div id="siteAnnouncement" className="overlay" style={{ display: 'none' }}>
        <div className="announce-wrap">
          <div className="announce-header"><h1>Notice</h1></div>
          <div className="tc-content"><p>TEXT</p></div>
          <ul className="announce-footer">
            <li>
              <a href="#" className="btn-send" onClick={(e) => {
                e.preventDefault();
                document.getElementById('siteAnnouncement').style.display = 'none';
              }}>OK</a>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}

export { sampleCricketMatches, sampleSoccerMatches, sampleTennisMatches };
export default SportPageWithLayout;
