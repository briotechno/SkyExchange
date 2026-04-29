import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BetSlip from '../components/BetSlip';
import Layout from '../components/Layout';
import EventLayout from '../components/Layout/EventLayout';
import ScoreboardRender from '../components/EventDetailedPage/ScoreboardRender';
import SportCompetition from '../components/EventDetailedPage/SportCompetition';
import OddsTable from '../components/EventDetailedPage/MatchTable/OddsTable';
import BookmakerTable from '../components/EventDetailedPage/MatchTable/BookmakerTable';
import FancyTable from '../components/EventDetailedPage/MatchTable/FancyTable';
import { marketController } from '../controllers';
import { useAuthStore } from '../store/authStore';
import { useRatePolling } from '../hooks/useRatePolling';

const EventDetailedPage = () => {
  const { sport, matchId } = useParams();
  const navigate = useNavigate();
  const { loginToken, isLoggedIn } = useAuthStore();

  const [selectedBet, setSelectedBet] = useState(null);
  const [activeInns, setActiveInns] = useState(1);
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scoreboardHtml, setScoreboardHtml] = useState(null);
  const pollingRef = useRef(null);

  // Hook for live rates
  const { liveRates, scoreboardHtml: liveScoreboardHtml } = useRatePolling(matchId, gameData, 1000);

  // Sync scoreboard HTML from hook to local state
  useEffect(() => {
    if (liveScoreboardHtml) {
      setScoreboardHtml(liveScoreboardHtml);
    }
  }, [liveScoreboardHtml]);

  const fetchGameData = async () => {
    try {
      setIsLoading(true);
      let res;
      if (isLoggedIn && loginToken) {
        console.log('Calling getGameDataLogin for gid:', matchId);
        res = await marketController.getGameDataLogin(loginToken, matchId);
      } else {
        console.log('Calling getGameData for gid:', matchId);
        res = await marketController.getGameData(matchId);
      }

      if (res && !res.error) {
        let parsed = typeof res === 'string' ? JSON.parse(res) : res;
        // Handle nested "0" key common in this API
        if (parsed && parsed["0"]) parsed = parsed["0"];
        setGameData(parsed);
      } else {
        console.error('API Error:', res?.msg || 'Unknown error');
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavourite = async () => {
    if (!isLoggedIn || !loginToken) {
      alert('Please login to add to favourites');
      return;
    }

    try {
      // Correct extraction of EID as per betting-pwa logic
      const eidToUse = gameData?.events?.['0']?.eid ||
        gameData?.events?.[0]?.eid ||
        gameData?.Event_Id ||
        gameData?.eventid ||
        gameData?.eid ||
        matchId;

      console.log('Toggling favourite for EID:', eidToUse);
      const res = await marketController.toggleFavourite(loginToken, eidToUse.toString());
      if (res && res.error === '0') {
        alert(res.msg || 'Favourite updated');
      } else {
        alert(res?.msg || 'Failed to update favourite');
      }
    } catch (err) {
      console.error('Favourite error:', err);
    }
  };

  useEffect(() => {
    if (matchId) {
      fetchGameData();
    }
  }, [matchId, isLoggedIn, loginToken]);

  const handleBetClick = (runner, type, price, market = 'Match Odds') => {
    setSelectedBet({
      runner,
      type,
      price,
      market
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh] text-gray-500 font-bold">
          Loading Event Details...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <EventLayout
        left={
          <SportCompetition
            sport={sport}
            competition={gameData?.Competition}
            matchName={gameData?.Game_name || `${gameData?.Team1} v ${gameData?.Team2}`}
          />
        }
        right={
          <div className="h-full flex flex-col">

            <div className="p-1 flex-1 overflow-y-auto">
              <BetSlip selectedBet={selectedBet} setSelectedBet={setSelectedBet} />
            </div>
          </div>
        }
      >
        {/* Middle Main Content */}
        <div className="flex flex-col h-full">
          {/* Scoreboard Section with integrated controls */}
          <ScoreboardRender
            html={scoreboardHtml}
            onPin={handleToggleFavourite}
            onRefresh={fetchGameData}
          />
          <ul className="match-btn flex justify-center">
            <li>
              <a id="liveMultiMarketPin" class="btn-pin"
                title="Add to Multi Markets" onClick={(e) => {
                  e.preventDefault();
                  handleToggleFavourite();
                }}  > </a>
            </li>
            <li>
              <a class="btn-refresh" onClick={(e) => {
                e.preventDefault();
                fetchGameData();
              }}
              > </a>
            </li>
          </ul>
          {/* Market content area */}
          <div className="p-4 flex-1 overflow-y-auto">
            {/* Dynamic Market Rendering */}
            {(() => {
              const eventList = Object.values(gameData?.events || {});
              
              // Group Fancy markets to show them together at the bottom or top
              const fancyMarkets = eventList.filter(e => e.Type === 'FANCY');
              // Other markets to render individually
              const otherMarkets = eventList.filter(e => e.Type !== 'FANCY');

              return (
                <>
                  {otherMarkets.map((market, mIdx) => {
                    const type = market.Type?.toUpperCase();
                    const name = market.name?.toUpperCase() || '';

                    // Main Match Odds
                    if (type === 'ODDS') {
                      return (
                        <OddsTable
                          key={market.eid || mIdx}
                          marketData={market}
                          liveRates={liveRates}
                          onBetClick={(runner, side, price) => handleBetClick(runner, side, price, market.name)}
                        />
                      );
                    }

                    // All Bookmaker variations
                    if (type === 'BOOKMAKER') {
                      return (
                        <BookmakerTable
                          key={market.eid || mIdx}
                          bookmakerData={market}
                          liveRates={liveRates}
                          onBetClick={(runner, side, price) => handleBetClick(runner, side, price, market.name)}
                        />
                      );
                    }

                    // ODDS, EXTRA (Tied Match), and others
                    return (
                      <OddsTable
                        key={market.eid || mIdx}
                        marketName={market.name}
                        marketData={market}
                        liveRates={liveRates}
                        onBetClick={(runner, side, price) => handleBetClick(runner, side, price, market.name)}
                      />
                    );
                  })}

                  {/* Grouped Fancy Markets */}
                  {fancyMarkets.length > 0 && (
                    <FancyTable 
                      fancyData={fancyMarkets}
                      liveRates={liveRates}
                      onBetClick={(bet) => handleBetClick(bet.name, bet.side, bet.price, 'Fancy Bet')}
                    />
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </EventLayout>
    </Layout>
  );
};

export default EventDetailedPage;
