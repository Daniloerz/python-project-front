// src/services/creditAccountService.js
import api from './api';

const getCreditAccounts = () => api.get('/credit/accounts');
const getCreditAccountById = (id) => api.get(`/credit/accounts/${id}`);
const createCreditAccount = (accountData) => api.post('/credit/accounts', accountData);
const recordCreditPurchase = (purchaseData) => api.post('/credit/purchases', purchaseData);

export default {
  getCreditAccounts,
  getCreditAccountById,
  createCreditAccount,
  recordCreditPurchase,
};
