const { company } = require('../../database/models');
const HttpError = require('../utils/httpError');
const axios = require('axios');
const csvToJson = require('csvtojson');
const Sequelize = require('sequelize');

const readCSV = async (urlLink) => {
  const file = await axios({ method: 'GET', url: urlLink });
  const jsonData = await csvToJson().fromString(file.data);
  return jsonData;
};

const fetchCompanyData = async (jsonData) => {
  const finalData = [];
  for (let i = 0; i < jsonData.length; i++) {
    const { company_id, company_sector } = jsonData[i];
    const companyData = await getCompanyData(company_id);
    const companyScore = await getCompanyScores(jsonData[i]);
    const companyDataWithScore = {
      id: companyData.id,
      name: companyData.name,
      ceo: companyData.ceo,
      tags: companyData.tags,
      score: companyScore,
      sector: company_sector
    };
    finalData.push(companyDataWithScore);
  }
  return finalData;
};

const getCompanyData = async (companyId) => {
  const response = await axios({
    method: 'GET',
    url: `http://54.167.46.10/company/${companyId}`
  });
  return response.data;
};

const getCompanyScores = async (item) => {
  const { company_id, company_sector } = item;
  const sectorData = await getSectorData(company_sector);
  const score = await getScore(sectorData, company_id);
  return score;
};

const getSectorData = async (sectorName) => {
  const response = await axios({
    method: 'GET',
    url: `http://54.167.46.10/sector?name=${sectorName}`
  });
  return response.data;
};

const getScore = async (sectorData, company_id) => {
  const data = sectorData.filter(element => (element.companyId === company_id));
  const performance = data[0].performanceIndex;
  const score = await calculateScore(performance);
  return score;
};

const calculateScore = async (performance) => {
  const result = (((performance[0].value * 10) +
    (performance[1].value / 10000) +
    (performance[2].value * 10) +
    performance[3].value) / 4);
  return result;
};

const saveDataToDatabase = async (companyData) => {
  try {
    await company.bulkCreate(companyData);
  } catch (error) {
    console.log('');
  }

};

const getCompanyWithScore = async () => {
  return await company.findAll({
    attributes: ['id', 'name', 'score']
  });
};

const getTopScoredCompany = async (query) => {
  const companies = await company.findAll({
    attributes: [
      'id', 'name', 'ceo', 'score',
      [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'ranking']
    ],
    where: { sector: query.sector },
    limit: 2,
  });
  return companies;
};

const updateCompanyDetail = async (body, idGiven) => {
  const book = await company.findAll({
    where: { id: idGiven }
  });
  if (book.length === 0) {
    throw new HttpError('Not Found', 404);
  } else {
    return await company.update(body, {
      where: { id: idGiven }
    });
  }
};



module.exports = {
  readCSV,
  updateCompanyDetail,
  fetchCompanyData,
  saveDataToDatabase,
  getCompanyWithScore,
  getTopScoredCompany,
  calculateScore,
  getScore,
  getSectorData,
  getCompanyScores,
  getCompanyData
};
