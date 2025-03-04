"use strict";
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			"type_tb",
			[
				{ name: "Mage", createdAt: new Date(), updatedAt: new Date() },
				{ name: "Warrior", createdAt: new Date(), updatedAt: new Date() },
				{ name: "Assassin", createdAt: new Date(), updatedAt: new Date() },
			],
			{}
		);

		await queryInterface.bulkInsert(
			"users_tb",
			[
				{
					email: "gulpa.andhikac@gmail.com",
					username: "admin",
					password: await bcrypt.hash("admin123", 10),
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
