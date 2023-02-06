const controllers = require('../../src/controllers/index');
const services = require('../../src/services/index');
const httpError = require('../../src/utils/httpError');

describe('Controllers', () => {
  describe('addCompany', () => {
    it('should save the data to the database when the input url is correct', async () => {
      jest.spyOn(services, 'readCSV').mockResolvedValue([{}]);
      jest.spyOn(services, 'fetchCompanyData').mockResolvedValue([{}]);
      jest.spyOn(services, 'saveDataToDatabase').mockResolvedValue([{}]);
      jest.spyOn(services, 'getCompanyWithScore').mockResolvedValue([{}]);
      const mockReq = {
        body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: 'Succesfully uploaded data to the database', data: [{}] });
    });
    it('should throw internal server error if there is a db error', async () => {
      jest.spyOn(services, 'readCSV').mockResolvedValue([{}]);
      jest.spyOn(services, 'fetchCompanyData').mockResolvedValue([{}]);
      jest.spyOn(services, 'saveDataToDatabase').mockResolvedValue([{}]);
      jest.spyOn(services, 'getCompanyWithScore').mockRejectedValue(new Error('DB Error'));
      const mockReq = {
        body: { urlLink: 'https://store-0001.s3.amazonaws.com/input.csv' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.addCompany(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ msg: 'Something went wrong, try again later..' });
    });
  });

  describe('updateCompanyDetails', () => {
    it('should upadte the data to the database when the input is correct', async () => {
      jest.spyOn(services, 'updateCompanyDetail').mockResolvedValue([1]);
      const mockReq = {
        body: { ceo: 'kamal' },
        params: { id: 'hsdkj5426' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({ message: 'Succesfully updated data to the database', data: [1] });
    });

  });
  describe('getTopScoredCompanyBySector', () => {
    it('should upadte the data to the database when the input is correct', async () => {
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
      jest.spyOn(services, 'getTopScoredCompany').mockResolvedValue(mockResult);
      const mockReq = {
        query: { sector: 'Software' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getTopScoredCompanyBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ data: mockResult });
    });

    it('should return empty array when there is no company with the given sector', async () => {
      jest.spyOn(services, 'getTopScoredCompany').mockResolvedValue([]);
      const mockReq = {
        query: { sector: 'something' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getTopScoredCompanyBySector(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ data: [] });
    });
  });
});