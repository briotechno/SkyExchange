import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LeftSidebar({ sport, competitions = [], countries = [] }) {
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <aside className="sidebar sideNav">
      {/* Black header "Sports" */}
      <div className="sideNav__head">Sports</div>

      {/* Scrollable area */}
      <div className="sideNav__scroll">
        {/* All Sports link */}
        <Link className="sideNav__item" to="/">All Sports</Link>

        {/* Active sport (Cricket) - black background */}
        <a className="sideNav__item sideNav__item--active" href="#">{sport}</a>

        {/* Top Competitions section */}
        {competitions.length > 0 && (
          <>
            <div className="sideNav__section">Top Competitions</div>
            {competitions.map((comp) => {
              const key = `comp-${comp.replace(/\s+/g, '-').toLowerCase()}`;
              const isOpen = openAccordions[key];
              return (
                <div className="sideNav__acc" key={comp}>
                  <button
                    className={`sideNav__item sideNav__toggle${isOpen ? ' open' : ''}`}
                    type="button"
                    onClick={() => toggleAccordion(key)}
                  >
                    {comp}
                    <span className="sideNav__arrow">{isOpen ? '▴' : '▾'}</span>
                  </button>
                  {isOpen && (
                    <div className="sideNav__sub">
                      <a className="sideNav__subItem" href="#">Jan 17</a>
                      <a className="sideNav__subItem" href="#">Match 1</a>
                      <a className="sideNav__subItem" href="#">Match 2</a>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}

        {/* Top Countries section */}
        {countries.length > 0 && (
          <>
            <div className="sideNav__section">Top Countries</div>
            {countries.map((country) => {
              const key = `country-${country.replace(/\s+/g, '-').toLowerCase()}`;
              const isOpen = openAccordions[key];
              return (
                <div className="sideNav__acc" key={country}>
                  <button
                    className={`sideNav__item sideNav__toggle${isOpen ? ' open' : ''}`}
                    type="button"
                    onClick={() => toggleAccordion(key)}
                  >
                    {country}
                    <span className="sideNav__arrow">{isOpen ? '▴' : '▾'}</span>
                  </button>
                  {isOpen && (
                    <div className="sideNav__sub">
                      <a className="sideNav__subItem" href="#">Jan 17</a>
                      <a className="sideNav__subItem" href="#">Match 1</a>
                      <a className="sideNav__subItem" href="#">Match 2</a>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>
    </aside>
  );
}

export default LeftSidebar;
