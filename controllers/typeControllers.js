const { Sequelize, where } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Hero, Type, User } = require("../models");

async function renderAddType(req, res) {
	const user = req.session.user;
	const types = await Type.findAll();
	res.render("type-add", {
		user: user,
		types: types.map((type) => type.get({ plain: true })),
	});
}

async function addType(req, res) {
	const user = req.session.user;

	const { name, typeId } = req.body;

	await Type.create({
		name,
	});

	res.redirect("/type-add");
}

async function deleteType(req, res) {
	await Type.destroy({
		where: { id: req.params.id },
	});
	res.redirect("/type-add");
}

module.exports = {
	renderAddType,
	addType,
	deleteType,
};
