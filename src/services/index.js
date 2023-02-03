const axios = require('axios');
const db = require('../../database/models');

const convertCSVtoJSON = (csv) => {
  const data = csv.split('\n');
  const result = [];
  const headers = data[0].split(',');
  for (let i = 1; i < data.length; i++) {
    const obj = {};
    const currentline = data[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
};

const dataDetails = async (url) => {
  const response = await axios.get(url);
  const data = convertCSVtoJSON(response.data);
  const companies = [];
  const sectors = [];
  for (const item of data) {
    const companySpecificDetails = await axios.get(`http://54.167.46.10/company/${item.company_id}`);
    const company_id = companySpecificDetails.data.id;
    const name = companySpecificDetails.data.name;
    const ceo = companySpecificDetails.data.ceo;
    const companyDetailsFromPost = data.filter((item) => item.company_id === company_id);
    const sector = companyDetailsFromPost[0].company_sector;
    const score = 0;
    const company = { company_id, name, ceo, sector, score };
    companies.push(company);
  }

  for (const item of data) {
    if (!sectors.includes(item.company_sector)) {
      sectors.push(item.company_sector);
    }
  }

  for (const sector of sectors) {
    const sectorDetails = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
    const sectorData = sectorDetails.data;

    sectorData.forEach((item) => {
      const id = item.companyId;
      const cpi = item.performanceIndex.filter((item) => item.key === 'cpi')[0].value;
      const cf = item.performanceIndex.filter((item) => item.key === 'cf')[0].value;
      const mau = item.performanceIndex.filter((item) => item.key === 'mau')[0].value;
      const roic = item.performanceIndex.filter((item) => item.key === 'roic')[0].value;

      const score = ((cpi * 10) + (cf / 10000) + (mau * 10) + roic) / 4;
      companies.forEach((company) => {
        if (company.company_id === id) {
          company.score = score;
        }
      });
    });
  }
  const dbResult = await db.Company.bulkCreate(companies);
  return dbResult;
};

const companyData = async (sector) => {
  const companies = await db.Company.findAll({ where: { sector } }, { order: [['score', 'DESC']] });
  return companies;
};

const changeCeo = async (ceo, id) => {
  const company = await db.Company.update({ ceo }, { where: { id } });
  return company;
};

module.exports = { dataDetails, companyData, changeCeo };