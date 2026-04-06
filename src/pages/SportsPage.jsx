import React from 'react';
import SportPageWithLayout from '../components/SportPage';
import { sampleCricketMatches } from '../components/SportPage';

function SportsPage() {
  return (
    <SportPageWithLayout
      sport="Multi Markets"
      kvImage="/images/banner_sports.png"
      competitions={['IPL', 'BBL', 'T20 World Cup']}
      countries={['India', 'Australia', 'England']}
      matches={sampleCricketMatches}
    />
  );
}

export default SportsPage;
