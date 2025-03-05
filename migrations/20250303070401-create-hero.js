"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("heroes_tb", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			photo: {
				type: Sequelize.STRING,
			},
			typeId: {
				type: Sequelize.INTEGER,
				references: {
					model: "type_tb",
					key: "id",
				},
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: "users_tb",
					key: "id",
				},
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("NOW()"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal("NOW()"),
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("heroes_tb");
	},
};
