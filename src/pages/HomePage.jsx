import React from 'react';
import Layout from '../components/Layout';
import GameHall from '../components/GameHall';
import Footer from '../components/Footer';

// Promo slider images
const bannerSlides = [
  { img: '/images/kv-skyexchange-2-m.jpg', href: 'https://go.wa.link/skyexchange' },
  { img: '/images/kv-skyexchange-m.jpg', href: 'https://go.wa.link/skyexchange' },
];

function HomePage() {
  return (
    <Layout>
      <div className="full-wrap">
        {/* Left Column - hidden by default */}
        <div className="col-left" style={{ display: 'none' }}>
          <div className="sub_path" id="subMenu" style={{ height: 'calc(100% - 0px)' }}>
            <div className="path">Sports</div>
            <ul id="listBoardLoading" className="loading" style={{ display: 'none' }}>
              <li><img src="/images/loading40.gif" alt="" /></li>
              <li>Loading...</li>
            </ul>
            <ul id="listBoard" className="menu-list">
              <li id="allSports" className="path-last">
                <a href="/">All Sports</a>
              </li>
              <div id="sportStage"></div>
              <li id="listBoardTemplate" className="listBoard" style={{ display: 'none' }}>
                <a id="arrow" className="Go" style={{ cursor: 'pointer' }}>Go</a>
                <a id="name" style={{ cursor: 'pointer' }}></a>
              </li>
              <div id="selectedMenu"></div>
              <ul id="topCompetitions" style={{ display: 'none' }}>
                <li className="menu-group-title">Top Competitions</li>
              </ul>
              <ul id="commonGroup" style={{ display: 'none' }}>
                <li className="menu-group-title">Common</li>
              </ul>
            </ul>
          </div>
        </div>

        {/* Center Column - main content */}
        <div id="centerColumn" className="col-center gamehall">
          {/* Loading */}
          <div id="loading" className="loading-wrap" style={{ display: 'none' }}>
            <ul className="loading">
              <li><img src="/images/loading40.gif" alt="" /></li>
              <li>Loading...</li>
              <br />
              <li><span id="progress"></span></li>
            </ul>
          </div>

          {/* Message */}
          <div id="message" className="message-wrap success">
            <a className="btn-close">Close</a>
            <p></p>
          </div>

          {/* One Click Loading */}
          <div id="oneClickLoading" className="loading-wrap" style={{ display: 'none' }}>
            <ul className="loading">
              <li><img src="/images/loading40.gif" alt="" /></li>
              <li id="oneClickTime">Place Bets</li>
            </ul>
          </div>

          {/* News Marquee */}
          <div className="marquee-box1" style={{ display: 'none' }}>
            <h4>News</h4>
            <div className="marquee"></div>
          </div>

          <div id="overWrap" className="over-wrap" style={{ height: 'calc(100% - 0px)' }}>
            {/* Promo Banner Slider */}
            <div id="promoteWrap" className="promo-banner-wrap">
              <div className="promo-banner">
                <ul className="slides">
                  {bannerSlides.map((slide, idx) => (
                    <li key={idx} className="banner">
                      <a href={slide.href} target="_blank" rel="noreferrer">
                        <img src={slide.img} alt="" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="promo-banner-loading"></div>
            </div>

            {/* Game Hall - all casino/sports banners */}
            <GameHall />

            {/* Footer */}
            <Footer />
          </div>

          {/* One Click Bet Wrap */}
          <div className="one_click-wrap">
            <div className="overlay" name="oneClickBetDialog" style={{ display: 'none' }}></div>
            <div id="oneClickBetDialog" className="dialog-wrap" name="oneClickBetDialog" style={{ display: 'none' }}>
              <h4>One Click Bet ON</h4>
              <div className="dialog-content">
                <p>
                  Stake selected will be placed immediately once you click on the market odds. <br />
                  <span className="attention">Attention: Back/Lay at your own risk</span>
                </p>
              </div>
              <ul className="btn-wrap break">
                <li><a id="ok" className="btn-send" style={{ cursor: 'pointer' }}>OK</a></li>
              </ul>
              <img className="arrow-dialog" src="/images/transparent.gif" alt="" />
            </div>

            <div id="oneClickBetStakeBox" className="one_click-setting" name="oneClickBetStakeBox" style={{ display: 'none' }}>
              <h4>One Click Bet Stake</h4>
              <ul className="one_click-stake">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx}>
                    <a className="btn" name="betStake" index={idx} style={{ cursor: 'pointer' }}></a>
                  </li>
                ))}
              </ul>
              <a id="edit" className="a-edit" style={{ cursor: 'pointer' }}>
                Edit<img src="/images/transparent.gif" alt="" />
              </a>
            </div>

            <div id="editOneClickBetStakeBox" className="one_click-setting" name="oneClickBetStakeBox" style={{ display: 'none' }}>
              <h4>Edit One Click Bet Stake</h4>
              <ul className="one_click-stake">
                {[0, 1, 2, 3].map((idx) => (
                  <li key={idx}><input type="text" name="editBetStake" index={idx} defaultValue="" /></li>
                ))}
              </ul>
              <a id="save" className="btn-send" style={{ cursor: 'pointer' }}>Save</a>
            </div>
          </div>
        </div>
      </div>

      {/* Site Announcement */}
      <div id="siteAnnouncement" className="overlay" style={{ display: 'none' }}>
        <div className="announce-wrap">
          <div className="announce-header"><h1>Notice</h1></div>
          <div className="tc-content" id="siteAnnouncement_content">
            <p>TEXT</p>
            <img src="" alt="" />
          </div>
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

export default HomePage;
