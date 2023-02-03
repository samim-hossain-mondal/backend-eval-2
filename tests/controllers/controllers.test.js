const services = require('../../services/index');
const controllers = require('../../controllers/index');

describe('Test controllers', () => {
  describe('Test getData', () => {
    it('should return an array of objects', async () => {
      jest.spyOn(services, 'dataDetails').mockResolvedValue([{ id: 1, name: 'Apple Inc.', score: '5' }]);
      const req = {
        body: {
          urlLink: 'https://www.fool.com/investing/2020/08/04/3-stocks-to-buy-in-a-post-coronavirus-world.aspx'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getData(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith([
        { id: 1, name: 'Apple Inc.', score: '5' }
      ]);
    });

    it('should return an error', async () => {
      jest.spyOn(services, 'dataDetails').mockRejectedValue(new Error('Error'));
      const req = {
        body: {
          urlLink: 'https://www.fool.com/investing/2020/08/04/3-stocks-to-buy-in-a-post-coronavirus-world.aspx'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getData(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ error: 'Error' });
    }
    );
  });
  describe('Test getCompany', () => {
    it('should return an array of objects', async () => {
      jest.spyOn(services, 'companyData').mockResolvedValue([{ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' }]);
      const req = {
        query: {
          sector: 'Technology'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getCompany(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith([
        { id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' }
      ]);
    });

    it('should return an error', async () => {
      jest.spyOn(services, 'companyData').mockRejectedValue(new Error('Error'));
      const req = {
        query: {
          sector: 'Technology'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.getCompany(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ error: 'Error' });
    }
    );
  });
  describe('Test updateCeo', () => {
    it('should return an object', async () => {
      jest.spyOn(services, 'changeCeo').mockResolvedValue({ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' });
      const req = {
        body: {
          ceo: 'Tim Cook',
          id: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCeo(req, res);
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({ id: 1, name: 'Apple Inc.', ceo: 'Tim Cook', score: '5' });
    });

    it('should return an error', async () => {
      jest.spyOn(services, 'changeCeo').mockRejectedValue(new Error('Error'));
      const req = {
        body: {
          ceo: 'Tim Cook',
          id: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await controllers.updateCeo(req, res);
      expect(res.status).toBeCalledWith(500);
      expect(res.json).toBeCalledWith({ error: 'Error' });
    }
    );
  });
});