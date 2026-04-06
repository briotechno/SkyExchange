import { fetchAPI } from '../../utils/api';

export const marketController = {
  getGameList: async (type) => fetchAPI('/gamelist', { type }),
  getCompetitionList: async (type) => fetchAPI('/competition', { type }),
  getCompetitionGames: async (code) => fetchAPI('/competitiongames', { code }),
  getLiveRates: async (marketId) => fetchAPI('/liverate', { MarketId: marketId }),
  getGameData: async (gid) => fetchAPI('/gamedata', { gid }),
  getGameRate: async (data) => fetchAPI('/gamerate', data),
  getGameDataLogin: async (loginToken, gid) => fetchAPI('/gamedatalogin', { LoginToken: loginToken, gid }),
  getPopularEvents: (loginToken) => fetchAPI('/populareve', { LoginToken: loginToken }),
  search: (loginToken, keyword) => fetchAPI('/search', { LoginToken: loginToken, Keyword: keyword }),
  getMultiMarketList: (loginToken) => fetchAPI('/multimarket', { LoginToken: loginToken }),
  getMultiMarketRate: (marketId, ids) => fetchAPI('/multimarketrate', { MarketId: marketId, Ids: ids }),
  getMarketAnalysis: (loginToken) => fetchAPI('/marketanay', { LoginToken: loginToken }),
};
