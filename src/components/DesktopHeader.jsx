import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function DesktopHeader({ onVirtualCricketClick }) {
  const [validationCode, setValidationCode] = useState('');
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [validationInput, setValidationInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const generateCode = () => {
    return String(Math.floor(1000 + Math.random() * 9000));
  };

  useEffect(() => {
    setValidationCode(generateCode());
  }, []);

  const validateLogin = (e) => {
    e.preventDefault();
    if (validationInput.trim() !== validationCode) {
      alert('Invalid Validation Code!');
      setValidationCode(generateCode());
      setValidationInput('');
      return;
    }
    alert('Validation Correct Login Proceed');
  };

  const isActive = (path) => {
    const current = location.pathname;
    if (path === '/' && (current === '/' || current === '/index')) return true;
    if (path !== '/' && current.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Top Bar */}
      <div className="top">
        <div className="header full-wrap">
          <h1><Link to="/">SKYEXCHANGE</Link></h1>

          {/* Search */}
          <div id="searchWrap" className="search-wrap" style={{ display: 'block' }}>
            <div>
              <input
                id="searchInput"
                className="search-input form-control form-control-sm"
                type="text"
                placeholder="Search Events"
              />
              <button id="searchClear" className="search-clear" style={{ display: 'none' }}></button>
            </div>
            <div id="searchResult" className="suggestion-wrap" style={{ display: 'none' }}>
              <ul id="searchList">
                <li id="noMatching" style={{ display: 'none' }}>
                  <p className="no-matching">No events found matching ...</p>
                </li>
              </ul>
            </div>
          </div>

          {/* Login */}
          <ul className="login-wrap">
            <li className="user error">
              <input
                id="loginName"
                type="text"
                placeholder="Username"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
              />
            </li>
            <li>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <input
                type="text"
                id="validationInput"
                placeholder="Validation"
                value={validationInput}
                onChange={(e) => setValidationInput(e.target.value)}
              />
            </li>
            <li>
              <span
                id="validationCode"
                style={{
                  position: 'absolute',
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  zIndex: 9,
                  top: '30px',
                  right: '195px',
                }}
              >
                {validationCode}
              </span>
            </li>
            <li className="li-login">
              <a id="loginBtn" className="btn-login" onClick={validateLogin} style={{ cursor: 'pointer' }}>
                Login
                <img className="icon-login" src="/images/transparent.gif" alt="" />
              </a>
            </li>
            <li className="li-signup">
              <Link to="/signup" className="btn-signup">
                Sign up
                <img className="icon-login" src="/images/transparent.gif" alt="" />
              </Link>
            </li>
            <li id="errorMsg" className="error" style={{ display: 'block' }}></li>
          </ul>
        </div>

        {/* Menu Wrap */}
        <div className="menu-wrap">
          <div className="full-wrap">
            <ul id="tabMenu" className="menu nav nav-pills">
              <li>
                <Link id="menu_Home" to="/" neua="Home" className={isActive('/') ? 'active-menu' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link id="menu_InPlay" to="/in-play" neua="In-Play">In-Play</Link>
              </li>
              <li>
                <Link id="menu_MultiMarkets" to="/multi-markets" neua="Multi Markets">Multi Markets</Link>
              </li>
              <li>
                <Link id="menu_CRICKET" to="/cricket" className={`nav-link ${isActive('/cricket') ? 'active-menu' : ''}`}>
                  <span id="tagLive" className="tag-live"><strong></strong>2</span>
                  Cricket
                </Link>
              </li>
              <li>
                <Link id="menu_SOCCER" to="/soccer">
                  <span className="tag-live"><strong></strong>0</span>
                  Soccer
                </Link>
              </li>
              <li>
                <Link id="menu_TENNIS" to="/tennis" className="nav-link">
                  <span className="tag-live"><strong></strong>8</span>
                  Tennis
                </Link>
              </li>
              <li>
                <a className="" href="#" neua="Virtual Cricket" onClick={(e) => { e.preventDefault(); onVirtualCricketClick && onVirtualCricketClick(); }}>Virtual Cricket</a>
              </li>
              <li>
                <Link id="menu_E_SOCCER" to="/e-soccer" className="nav-link">
                  <span className="tag-live"><strong></strong>7</span>
                  E-Soccer
                </Link>
              </li>
            </ul>

            <ul className="setting-wrap">
              <li className="time_zone"><span>Time Zone :</span> GMT+5:30</li>
              <li>&nbsp;&nbsp;&nbsp;</li>
              <li>
                <a id="oneClickSetting" className="one_click" style={{ cursor: 'pointer', display: 'none' }}>
                  <img src="/images/transparent.gif" alt="" />One Click Bet
                </a>
              </li>
              <li>
                <a id="slipSet" className="setting" style={{ cursor: 'pointer' }}>
                  Setting <img src="/images/transparent.gif" alt="" />
                </a>
              </li>
            </ul>

            {/* Settings Popup */}
            <div id="set_pop" className="slip_set-pop" style={{ display: 'none' }}>
              <div id="coinList" className="set-content">
                <dl className="odds-set">
                  <dd className="col-defult">
                    <label htmlFor="defult_stake"><strong>Default stake </strong></label>
                    <input id="userCoin" className="stake-input form-control form-control-sm" type="text" maxLength="7" value="" readOnly />
                  </dd>
                </dl>
                <dl id="stakeSet" className="stake-set">
                  <dt>Stake</dt>
                  {[['coin_1', '10'], ['coin_2', '30'], ['coin_3', '50'], ['coin_4', '100'], ['coin_5', '200'], ['coin_6', '300'], ['coin_7', '500'], ['coin_8', '1000']].map(([id, val]) => (
                    <dd key={id}>
                      <a id={id} style={{ cursor: 'pointer' }} className="btn btn-outline-secondary btn-sm">{val}</a>
                    </dd>
                  ))}
                  <dd className="col-edit">
                    <a id="edit" className="btn-edit">Edit <img src="/images/transparent.gif" alt="" /></a>
                  </dd>
                </dl>
                <dl className="odds-set">
                  <dt>Odds</dt>
                  <dd>
                    <input id="enableSparkCheck" type="checkbox" className="form-check-input" />
                    <label htmlFor="enableSparkCheck">Highlight when odds change</label>
                  </dd>
                </dl>
                <dl className="odds-set">
                  <dt>FancyBet</dt>
                  <dd>
                    <input id="fancyBetAcceptAnyOddsCheckBox" type="checkbox" />
                    <label htmlFor="fancy_odd">Accept Any Odds </label>
                  </dd>
                </dl>
                <dl className="odds-set">
                  <dt>SportsBook</dt>
                  <dd>
                    <input id="sportsBookAcceptAnyOddsCheckBox" type="checkbox" className="form-check-input" />
                    <label>Accept Any Odds </label>
                  </dd>
                </dl>
                <dl className="odds-set">
                  <dt>Win Selection forecast</dt>
                  <dd>
                    <input id="withCommCheckBox" type="checkbox" defaultChecked />
                    <label htmlFor="withCommCheckBox">With Commission</label>
                  </dd>
                </dl>
                <ul className="btn-wrap">
                  <li><a id="closeSet" className="btn" style={{ cursor: 'pointer' }}>Cancel</a></li>
                  <li className="col-send"><a id="coinSave" className="btn-send" style={{ cursor: 'pointer' }}>Save</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DesktopHeader;
