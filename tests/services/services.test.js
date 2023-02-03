const { db } = require('../../database/models/company');
const services = require('../../services/index');

describe('Test services', () => {
  describe('Test dataDetails', () => {
    it('should return an array', async () => {
      jest.spyOn(db, 'query').mockResolvedValue([[{ id: 1, name: 'Apple Inc.', score: '5' }]]);
      const result = await services.dataDetails('https://www.google.com');
      expect(result).toEqual([{ id: 1, name: 'Apple Inc.', score: '5' }]);
    });
    it('should return an error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Error'));
      try {
        await services.dataDetails('https://www.google.com');
      } catch (error) {
        expect(error).toEqual(new Error('Error'));
      }
    }
    );
  });
  describe('Test companyData', () => {
    it('should return an array', async () => {
      jest.spyOn(db, 'query').mockResolvedValue([[{ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' }]]);
      const result = await services.companyData('Technology');
      expect(result).toEqual([{ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' }]);
    });
    it('should return an error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Error'));
      try {
        await services.companyData('Technology');
      } catch (error) {
        expect(error).toEqual(new Error('Error'));
      }
    }
    );
  });
  describe('Test changeCeo', () => {
    it('should return an object', async () => {
      jest.spyOn(db, 'query').mockResolvedValue([[{ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' }]]);
      const result = await services.changeCeo('Tim Cook', 1);
      expect(result).toEqual({ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' });
    });
    it('should return an error', async () => {
      jest.spyOn(db, 'query').mockRejectedValue(new Error('Error'));
      try {
        await services.changeCeo('Tim Cook', 1);
      } catch (error) {
        expect(error).toEqual(new Error('Error'));
      }
    }
    );
  });
});
