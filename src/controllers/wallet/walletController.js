import { fetchAPI } from '../../utils/api';

export const walletController = {
  getDepositMethods: (loginToken) => fetchAPI('/depositlist', { LoginToken: loginToken }),
  requestDeposit: (data) => fetchAPI('/deposit', data),
  getDepositHistory: (loginToken) => fetchAPI('/depositreq', { LoginToken: loginToken }),
  saveBankAccount: (data) => fetchAPI('/bankac', data),
  getBankAccounts: (loginToken) => fetchAPI('/useraclist', { LoginToken: loginToken }),
  deleteBankAccount: (loginToken, accountId) => fetchAPI('/delbankac', { LoginToken: loginToken, Id: accountId }),
  requestWithdrawal: (loginToken, accountId, amount) => fetchAPI('/withdraw', { LoginToken: loginToken, Id: accountId, Amount: amount }),
  getWithdrawalHistory: (loginToken, accountId = '') => fetchAPI('/withdrawlist', { LoginToken: loginToken, Id: accountId }),
};
