import React from 'react';
import Layout from '../components/Layout';
import BetSlip from '../components/BetSlip';
import Footer from '../components/Footer';
import { sampleCricketMatches } from '../components/SportPage';

function MatchRowSimple({ match }) {
  const isLive = match.status === 'In-Play';
  return (
    <tr>
      <td className="predict">
        <i className={`a-${isLive ? 'in_play' : 'sleep'}`}></i>
      </td>
      <td>
        <a href="#" onClick={(e) => e.preventDefault()} className="market-title">{match.name}</a>
        <ul className="event-icon">
          <li className={`event-status ${isLive ? 'in-play' : ''}`}><span>{match.status}</span></li>
          {match.hasC && <li className="event-tag"><a className="tag-C">C</a></li>}
          {match.hasF && <li className="event-tag"><a className="tag-F">F</a></li>}
          {match.hasP && <li className="event-tag"><a className="tag-P">P</a></li>}
        </ul>
      </td>
      <td className="td-matched">{match.matched}</td>
      <td className="back3 back-1">{match.back1 && <a>{match.back1}</a>}</td>
      <td className="back2 back-2"></td>
      <td className="back1 back-3"></td>
      <td className="lay1 lay-1">{match.lay1 && <a>{match.lay1}</a>}</td>
      <td className="lay2 lay-2"></td>
      <td className="lay3 lay-3"></td>
      <td className="favorites">
        <a className="add-pin" style={{ cursor: 'pointer' }}>+</a>
      </td>
    </tr>
  );
}

function SportsPage() {
  return (
    <Layout>
      <div className="full-wrap">
        {/* Center column - full width (no left sidebar on sports page) */}
        <div id="centerColumn" className="col-center">
          <div id="loading" className="loading-wrap" style={{ display: 'none' }}>
            <ul className="loading">
              <li><img src="/images/loading40.gif" alt="" /></li>
              <li>Loading...</li>
            </ul>
          </div>

          <div id="overWrap" className="over-wrap">
            <div id="sportEvent" className="event-board">
              <div className="event-list">
                <table className="table-default">
                  <thead>
                    <tr>
                      <th colSpan="2">&nbsp;</th>
                      <th className="td-matched">Matched</th>
                      <th colSpan="3">1</th>
                      <th colSpan="3">X</th>
                      <th colSpan="3">2</th>
                      <th>&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleCricketMatches.map((m) => (
                      <MatchRowSimple key={m.id} match={m} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <Footer />
          </div>
        </div>

        {/* Right Bet Slip */}
        <BetSlip />
      </div>
    </Layout>
  );
}

export default SportsPage;
