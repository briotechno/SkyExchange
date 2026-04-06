import React from 'react';
import SportPageWithLayout from '../components/SportPage';

const esoccerCompetitions = [
  'E-Soccer Bundesliga', 'E-Soccer Premier League', 'E-Soccer Champions League'
];
const esoccerCountries = ['Germany', 'England', 'Spain'];

const sampleEsoccerMatches = [
  { id: 1, name: 'AC Milan (Joshua) v FC Inter Milano (Leonardo)', status: 'In-Play', matched: 'PTE0', back1: '', lay1: '', back2: '--', lay2: '--', back3: '', lay3: '', hasC: true, hasF: true, hasP: true },
  { id: 2, name: 'ACF Fiorentina (Matrix) v Atalanta BC (Andrew)', status: 'In-Play', matched: 'PTE0', back1: '', lay1: '', back2: '--', lay2: '--', back3: '', lay3: '', hasC: true, hasF: true, hasP: true },
  { id: 3, name: 'AC Milan (Joshua) v Atalanta BC (Andrew)', status: '15:15', matched: 'PTE0', back1: '', lay1: '', back2: '--', lay2: '--', back3: '', lay3: '', hasC: true, hasF: true, hasP: true },
];

function ESoccerPage() {
  return (
    <SportPageWithLayout
      sport="E-Soccer"
      kvImage="/images/kv_esoccer.jpg"
      competitions={esoccerCompetitions}
      countries={esoccerCountries}
      matches={sampleEsoccerMatches}
    />
  );
}

export default ESoccerPage;
