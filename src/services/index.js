const companyDb = require('../../database/models/companydatabase');
const HttpErrors = require('../utils/customError');

const companyById = async (id) => {
  const companyId = await companyDb.findOne({ where: { company_id: id } });
  if (companyId === undefined) {
    throw new HttpErrors(404, 'Company not found');
  }
  return companyId;
};

const companyBySector = async (sector) => {
  const sectorData = await companyDb.findAll({ where: { company_sector: sector } });
  if (sectorData === null) {
    throw new HttpErrors(404, 'Sector not found');
  }
  return sectorData;
};

module.exports = { companyById, companyBySector };