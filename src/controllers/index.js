const services = require('../services/index');
const HttpErrors = require('../utils/customError');

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const iD = services.companyById(id);
    await fetch(`http://54.167.46.10/company/${iD}`)
      .then(res => res.json())
      .then(data => {
        return res.status(200).json({ data });
      });
  }
  catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
};

const getCompaniesBySector = async (req, res) => {
  try {
    const { sec } = req.query;
    const sector = services.companyBySector(sec);
    await fetch(`http://54.167.46.10/sector?name=${sector}`)
      .then(res => res.json())
      .then(data => {
        return res.status(200).json({ data });
      });
  }
  catch (error) {
    if (error instanceof HttpErrors) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
};

module.exports = { getCompanyById, getCompaniesBySector };
