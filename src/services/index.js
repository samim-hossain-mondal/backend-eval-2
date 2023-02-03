const { companyDatabase } = require('../../database/models');
const HttpErrors = require('../utils/customError');

const companyById = async (id) => {
  const companyId = await companyDatabase.findOne({ where: { company_id: id } });
  if (companyId === undefined) {
    throw new HttpErrors(404, 'Company not found');
  }
  return companyId;
};

const companyBySector = async (sector) => {
  const sectorData = await companyDatabase.findAll({ where: { company_sector: sector } });
  if (sectorData === null) {
    throw new HttpErrors(404, 'Sector not found');
  }
  return sectorData;
};

module.exports = { companyById, companyBySector };