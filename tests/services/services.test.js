const companydb = require('../../database/models/companydatabase');
const services = require('../services/index');

describe('test services', () => {
  describe('test companyById', () => {
    it('should return company id', async () => {
      jest.spyOn(companydb, 'findOne').mockResolvedValue('1');
      const result = await services.companyById(1);
      expect(result).toEqual('1');
    });

    it('should return error', async () => {
      jest.spyOn(companydb, 'findOne').mockResolvedValue(undefined);
      await expect(services.companyById(1)).rejects.toThrow('Company not found');
    });
  });
  describe('test companyBySector', () => {
    it('should return sector data', async () => {
      jest.spyOn(companydb, 'findAll').mockResolvedValue('Technology');
      const result = await services.companyBySector('Technology');
      expect(result).toEqual({ company_sector: 'Technology' });
    });

    it('should return error', async () => {
      jest.spyOn(companydb, 'findAll').mockResolvedValue(null);
      await expect(services.companyBySector('Technology')).rejects.toThrow('Sector not found');
    });
  });
});