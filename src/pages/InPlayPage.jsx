import React, { useState } from 'react';
import Layout from '../components/Layout';

const inPlayMatches = [
  {
    sport: 'Cricket',
    events: [
      { id: 1, name: 'Brisbane Heat v Melbourne Stars', status: 'In-Play', matched: 'PTH554.54M', hasC: true, hasF: true, hasP: true },
      { id: 2, name: 'Dhaka Capital v Chattogram Royals', status: 'In-Play', matched: 'PTH76.99M', hasC: true, hasF: true, hasP: true },
    ],
  },
  {
    sport: 'Soccer',
    events: [
      { id: 3, name: 'Australia SRL v Georgia SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
      { id: 4, name: 'Jamaica SRL v Luxembourg SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
    ],
  },
  {
    sport: 'Tennis',
    events: [
      { id: 5, name: 'Australia SRL v Georgia SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
      { id: 6, name: 'Jamaica SRL v Luxembourg SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
    ],
  },
  {
    sport: 'E-Soccer',
    events: [
      { id: 7, name: 'Australia SRL v Georgia SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
      { id: 8, name: 'Jamaica SRL v Luxembourg SRL', status: 'In-Play', matched: 'PTH0', hasE: true, hasS: true, hasP: true },
    ],
  },
];

function EventRow({ evt }) {
  const isLive = evt.status === 'In-Play';
  return (
    <tr>
      <td className="col-event custom-pl">
        <span className="dot" style={{ display: isLive ? 'inline-block' : 'none' }}></span>
        <a className="event-name" href="#">{evt.name}</a>
        <div className="event-meta">
          <span style={{color: isLive ? '#2a9c39' : '#333'}}>{evt.status}</span>
          {evt.hasE && <span className="tag tag-gray">E</span>}
          {evt.hasS && <span className="tag">S</span>}
          {evt.hasC && <span className="tag">C</span>}
          {evt.hasF && <span className="tag">F</span>}
          {evt.hasP && <span className="tag tag-orange">P</span>}
        </div>
      </td>
      <td className="col-matched custom-w">{evt.matched}</td>
      <td className="col-plus"><span className="plus-btn">+</span></td>
    </tr>
  );
}

function InPlayPage() {
  const [activeTab, setActiveTab] = useState('inplay');

  return (
    <Layout>
      <main className="main inplay-layout">
        <section className="left-area padding-btm">
          <div className="subtabs">
            <div className={`subtab ${activeTab === 'inplay' ? 'active' : ''}`} onClick={() => setActiveTab('inplay')}>In-Play</div>
            <div className={`subtab ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>Today</div>
            <div className={`subtab ${activeTab === 'tomorrow' ? 'active' : ''}`} onClick={() => setActiveTab('tomorrow')}>Tomorrow</div>
            <div className="subtab-search"></div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'inplay' ? 'block' : 'none' }}>
            {inPlayMatches.map((group) => (
              <div key={group.sport} className="sport-block">
                <div className="sport-head">
                  <span>{group.sport}</span>
                  <span className="sport-toggle">▢</span>
                </div>
                <table className="inplay-table">
                  <thead>
                    <tr>
                      <th className="col-event custom-pl">&nbsp;</th>
                      <th className="col-matched custom-w">Matched</th>
                      <th className="col-plus"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.events.map((evt) => (
                      <EventRow key={evt.id} evt={evt} />
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="tab-content" style={{ display: activeTab === 'today' ? 'block' : 'none' }}>
            <div style={{ padding: '20px', fontWeight: '800' }}>Today content will come here</div>
          </div>

          <div className="tab-content" style={{ display: activeTab === 'tomorrow' ? 'block' : 'none' }}>
            <div style={{ padding: '20px', fontWeight: '800' }}>Tomorrow content will come here</div>
          </div>
        </section>

        <aside className="right-area">
          <div className="betslip-head">
            <div>Bet Slip</div>
            <div className="minimize">−</div>
          </div>
          <div className="betslip-body">
            Click on the odds to add selections to the betslip.
          </div>
        </aside>
      </main>
    </Layout>
  );
}

export default InPlayPage;
