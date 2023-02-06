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
    it('should return proper output when there is no probelm with database', async () => {
      const mockResult = [
        {
          'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'name': 'Apple',
          'score': 29.987724999999998
        },
        {
          'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
          'name': 'Mercedes',
          'score': 18.481825
        }];
      jest.spyOn(company, 'findAll').mockResolvedValue(mockResult);
      expect(await services.getCompanyWithScore()).toEqual(mockResult);
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
    it('should return valid output in case of no error from db', async () => {
      const mockResult = [
        {
          'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'name': 'Apple',
          'ceo': 'Kate Okuneva',
          'score': 29.987724999999998,
          'ranking': '1'
        },
        {
          'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
          'name': 'Microsoft',
          'ceo': 'Olga Block',
          'score': 21.3221,
          'ranking': '2'
        }
      ];
      jest.spyOn(company, 'findAll').mockResolvedValue(mockResult);
      const query = {
        sector: ''
      };
      expect(await services.getTopScoredCompany(query)).toEqual(mockResult);
    });

    it('should return empty array when sector does not exist', async () => {
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const query = {
        sector: ''
      };
      expect(await services.getTopScoredCompany(query)).toEqual([]);
    });
  });

  describe('updateCompanyDetail', () => {
    it('should throw error in case of db error', async () => {
      jest.spyOn(company, 'findAll').mockRejectedValue(new Error('something went wrong'));
      const params = {
        id: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc'
      };
      const body = {
        ceo: 'Klaus Mikaelson'
      };
      expect(async () => await services.updateCompanyDetail(body, params.id)).rejects.toThrow(new Error('something went wrong'));
    });
    it('should return valid output if the company exist with the given id', async () => {
      const mockResult = [
        {
          'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'name': 'Apple',
          'ceo': 'Kate Okuneva',
          'score': 29.987724999999998,
          'ranking': '1'
        }
      ];
      jest.spyOn(company, 'findAll').mockResolvedValue(mockResult);
      jest.spyOn(company, 'update').mockResolvedValue([1]);
      const params = {
        id: '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc'
      };
      const body = {
        ceo: 'Klaus Mikaelson'
      };
      expect(await services.updateCompanyDetail(body, params.id)).toEqual([1]);
    });

    it('should throw http error if the comapny does not exist', async () => {
      jest.spyOn(company, 'findAll').mockResolvedValue([]);
      const params = {
        id: '46e1d061-abcdefghij'
      };
      const body = {
        ceo: 'Klaus Mikaelson'
      };
      expect(async () => await services.updateCompanyDetail(body, params.id)).rejects.toThrow(new httpError('Not Found', 404));
    });
  });
});