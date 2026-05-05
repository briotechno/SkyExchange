import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketController } from '../controllers';
import './RacingPanel.css';

const RacingPanel = ({ sportType }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await marketController.getRacingData(sportType);
        if (Array.isArray(res)) {
          setData(res);
        }
      } catch (error) {
        console.error('Error fetching racing data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [sportType]);

  // Group by Country
  const groupedData = data.reduce((acc, item) => {
    const country = item.Country || 'Unknown';
    if (!acc[country]) acc[country] = [];
    acc[country].push(item);
    return acc;
  }, {});

  if (loading && data.length === 0) {
    return <div className="racing-loading">Loading {sportType}...</div>;
  }

  if (!loading && data.length === 0) {
    return <div className="racing-no-data">No {sportType} available at the moment.</div>;
  }

  return (
    <div className="racing-container">
      {Object.entries(groupedData).map(([country, tracks]) => (
        <div key={country} className="country-group">
          <div className="country-header">
            <div className="country-tab">{country}</div>
          </div>
          <div className="tracks-list">
            {tracks.map((track) => (
              <div key={track.Event_Id} className="track-row">
                <div className="track-info">
                  <div className="tv-icon">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="white">
                      <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
                    </svg>
                  </div>
                  <span className="track-name">{track.Game_name}</span>
                </div>
                <div className="event-times">
                  {track.Events?.map((event) => {
                    const time = event.EventTime ? event.EventTime.split(' ')[1].substring(0, 5) : '';
                    return (
                      <button
                        key={event.Eid}
                        className="time-btn"
                        onClick={() => {
                          const sportPath = sportType === 'Horse Racing' ? 'horse-racing' : 'greyhound-racing';
                          navigate(`/${sportPath}/${track.gid}/${event.Eid}`);
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RacingPanel;
