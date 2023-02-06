const services = require('../services/index');
const HttpError = require('../utils/httpError');

const addCompany = async (req, res) => {
  try {
    const { urlLink } = req.body;
    const jsonData = await services.readCSV(urlLink);
    const companyData = await services.fetchCompanyData(jsonData);
    await services.saveDataToDatabase(companyData);
    const data = await services.getCompanyWithScore();
    res.status(201).json({ message: 'Succesfully uploaded data to the database', data: data });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, try again later..' });
  }
};

const getTopScoredCompanyBySector = async (req, res) => {
  try {
    const { query } = req;
    const data = await services.getTopScoredCompany(query);
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ msg: 'Something went wrong, try again later..' });
  }


};

const updateCompanyDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const companyData = await services.updateCompanyDetail(req.body, id);
    res.status(201).json({ message: 'Succesfully updated data to the database', data: companyData });
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.code).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: 'Something went wrong, try again later..' });
    }
  }
};

module.exports = { addCompany, updateCompanyDetails, getTopScoredCompanyBySector };