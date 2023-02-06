const services = require('../../src/services/index');
const { company } = require('../../database/models');
const httpError = require('../../src/utils/httpError');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('services', () => {

  describe('getCompanyData', () => {
    it('should return proper output when the input is valid', async () => {
      var mock = new MockAdapter(axios);
      const response = { data: [] };
      const companyId = '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc';
      mock.onGet(`http://54.167.46.10/company/${companyId}`).reply(200, response);

      expect(await services.getCompanyData(companyId)).toEqual(response);
    });
    it('should throw error if error with fetching data', async () => {
      var mock = new MockAdapter(axios);
      const response = { data: [] };
      const companyId = '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc';
      mock.onGet(`http://54.167.46.10/company/${companyId}`).reply(500);
      expect(async () => await services.getCompanyData(companyId)).rejects.toThrow(new Error('Request failed with status code 500'));
    });
  });

  describe('getSectorData', () => {
    it('should return proper output when the input is valid', async () => {
      var mock = new MockAdapter(axios);
      const response = { data: [] };
      const sectorName = 'Software';
      mock.onGet(`http://54.167.46.10/sector?name=${sectorName}`).reply(200, response);

      expect(await services.getSectorData(sectorName)).toEqual(response);
    });
    it('should throw error if error with fetching data', async () => {
      var mock = new MockAdapter(axios);
      const response = { data: [] };
      const sectorName = 'Software';
      mock.onGet(`http://54.167.46.10/sector?name=${sectorName}`).reply(500);
      expect(async () => await services.getSectorData(sectorName)).rejects.toThrow(new Error('Request failed with status code 500'));
    });
  });

  describe('getScore', () => {
    it('should return proper output when the input is valid', async () => {
      const mockSectorData = [{
        'companyId': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'performanceIndex': [{ 'key': 'cpi', 'value': 0.32 }, { 'key': 'cf', 'value': 899309 }, { 'key': 'mau', 'value': 0.28 }, { 'key': 'roic', 'value': 24.02 }]
      },
      {
        'companyId': '8727cc61-8c4b-4285-8853-2db808392c04',
        'performanceIndex': [{ 'key': 'cpi', 'value': 0.08 }, { 'key': 'cf', 'value': 350846 }, { 'key': 'mau', 'value': 0.31 }, { 'key': 'roic', 'value': 14.11 }]
      }];
      const companyId = '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc';
      expect(await services.getScore(mockSectorData, companyId)).toEqual(29.987724999999998);
    });
  });

  describe('calculateScore', () => {
    it('should return proper output when the input is valid', async () => {
      const mockPerformance = [{ 'key': 'cpi', 'value': 0.32 }, { 'key': 'cf', 'value': 899309 }, { 'key': 'mau', 'value': 0.28 }, { 'key': 'roic', 'value': 24.02 }];
      expect(await services.calculateScore(mockPerformance)).toEqual(29.987724999999998);
    });
  });

  describe('getCompanyWithScore', () => {
    it('should throw error when there is a problem with the database', async () => {
      jest.spyOn(company, 'findAll').mockRejectedValue(new Error(''));
      expect(async () => await services.getCompanyWithScore()).rejects.toThrow(new Error(''));
    });
  });

  describe('getTopScoredCompany', () => {
    it('should throw error in case of db error', async () => {
      jest.spyOn(company, 'findAll').mockRejectedValue(new Error('something'));
      const query = {
        sector: ''
      };
      expect(async () => await services.getTopScoredCompany(query)).rejects.toThrow(new Error('something'));
    });
  });
});
