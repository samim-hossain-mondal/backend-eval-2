const services = require('../services/index');

const getData = async (req, res) => {
  const url = req.body.urlLink;
  const result = await services.dataDetails(url);
  const filterResult = [];
  result.map((item) => (filterResult.push({ id: item.id, name: item.name, score: item.score })));
  res.status(200).json(filterResult);
};

const getCompany = async (req, res) => {
  const sector = req.query.sector;
  const result = await services.companyData(sector);
  const filterResult = [];
  result.map((item) => (filterResult.push({ id: item.id, name: item.name, ceo: item.ceo, score: item.score })));
  res.status(200).json(filterResult);
};

const updateCeo = async (req, res) => {
  const ceo = req.body.ceo;
  const id = req.body.id;
  const result = await services.changeCeo(ceo, id);
  res.status(200).json(result);
};

module.exports = { getData, getCompany, updateCeo };