"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Hero extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Hero.belongsTo(models.User, {
				foreignKey: "userId",
				as: "user",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
			Hero.belongsTo(models.Type, {
				foreignKey: "typeId",
				as: "type",
				onDelete: "SET NULL",
				onUpdate: "CASCADE",
			});
		}
	}
	Hero.init(
		{
			name: DataTypes.STRING,
			typeId: {
				type: DataTypes.INTEGER,
				references: { model: "type_tb", key: "id" },
			},
			photo: DataTypes.STRING,
			userId: {
				type: DataTypes.INTEGER,
				references: { model: "users_tb", key: "id" },
			},
		},
		{
			sequelize,
			modelName: "Hero",
			tableName: "heroes_tb",
		}
	);
	return Hero;
};
