'use strict';

const data = [
  {
    'company_id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
    'company_sector': 'Automobile'
  },
  {
    'company_id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
    'company_sector': 'Software'
  },
  {
    'company_id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
    'company_sector': 'Automobile'
  },
  {
    'company_id': '8727cc61-8c4b-4285-8853-2db808392c04',
    'company_sector': 'Software'
  },
  {
    'company_id': 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
    'company_sector': 'Software'
  },
  {
    'company_id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
    'company_sector': 'Software'
  },
  {
    'company_id': 'ed4fc91d-8ac8-4882-a9e9-071a88423ca5',
    'company_sector': 'Retail'
  },
  {
    'company_id': 'c144e397-bef9-4aa1-aef4-842f4da44f9c',
    'company_sector': 'Retail'
  },
  {
    'company_id': '24ca0568-d946-4c14-a0d7-eb81295b7a9e',
    'company_sector': 'Retail'
  },
  {
    'company_id': '296247ef-c553-4704-ad67-0878c87ff729',
    'company_sector': 'Banking'
  },
  {
    'company_id': 'c1634e16-17c8-42f6-8513-b8c50a4f230c',
    'company_sector': 'Banking'
  },
  {
    'company_id': 'e245b12c-5b3b-4a83-a4ad-391974b34a37',
    'company_sector': 'Banking'
  }
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('companyDatabases', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', {{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }}, {});
    */
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('companyDatabases', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
