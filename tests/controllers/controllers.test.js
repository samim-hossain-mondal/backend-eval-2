const services = require('../services/index');
const controllers = require('../controllers/index');

describe('Test Controllers', () => {
  describe('test getCompanyById', () => {
    it('should return a company', async () => {
      const mockData = {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'description': 'Totam perferendis amet quod.',
        'ceo': 'Ed Green',
        'tags': [
          'clicks-and-mortar',
          'scalable',
          'user-centric',
          'rich',
          'frictionless',
          'robust',
          'one-to-one',
          'end-to-end'
        ]
      };
      jest.spyOn(services, 'companyById').mockResolvedValue(mockData);
      const req = { params: { iD: '95b5a067-808a-44a9-a490-b4ef8a045f61' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompanyById(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toBeCalledWith({ data: mockData });
    });

    it('should return a not found error', async () => {
      jest.spyOn(services, 'companyById').mockResolvedValue(null);
      const req = { params: { iD: '95b5a067-808a-44a9-a490-b4ef8a045f61' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompanyById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toBeCalledWith({ message: 'Company not found' });
    });

    it('should return an internal server error', async () => {
      jest.spyOn(services, 'companyById').mockRejectedValue(new Error('Error'));
      const req = { params: { iD: '95b5a067-808a-44a9-a490-b4ef8a045f61' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompanyById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({ message: 'Error' });
    });
  });

  describe('test getCompaniesBySector', () => {
    it('should return a company sector', async () => {
      const mockData = {
        'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
        'name': 'Volkswagen',
        'description': 'Totam perferendis amet quod. Ea minus dicta consequuntur nisi incidunt at quibusdam. Magni asperiores sequi numquam repellendus enim qui non explicabo voluptates. Hic nulla inventore quasi maiores vero molestias possimus in nihil. Sunt odio architecto blanditiis inventore repellat quo deleniti ipsam. Quasi cum vitae eos voluptatibus quidem.',
        'ceo': 'Ed Green',
        'tags': [
          'clicks-and-mortar',
          'scalable',
          'user-centric',
          'rich',
          'frictionless',
          'robust',
          'one-to-one',
          'end-to-end'
        ]
      };
      jest.spyOn(services, 'companyBySector').mockResolvedValue(mockData);
      const req = { query: { sec: 'Software' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompaniesBySector(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toBeCalledWith({ data: mockData });
    });
    it('should return a not found error', async () => {
      jest.spyOn(services, 'companyBySector').mockResolvedValue(null);
      const req = { params: { company_sector: 'Software' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompanyById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toBeCalledWith({ message: 'Sector not found' });
    });
    it('should return an internal server error', async () => {
      jest.spyOn(services, 'companyBySector').mockRejectedValue(new Error('Error'));
      const req = { params: { company_sector: 'Software' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await controllers.getCompanyById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({ message: 'Error' });
    });
  });
});