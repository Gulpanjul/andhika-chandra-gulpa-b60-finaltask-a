const { Sequelize, where } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Hero, Type, User } = require("../models");

const sequelize = new Sequelize(config.development);
async function  renderAddHero(req, res) {
	const user = req.session.user;
	const types = await Type.findAll();
	res.render("hero-add", {
		user: user,
		types,
	});
}

async function addHero(req, res) {
	const user = req.session.user;

	// if (!user) {
	// 	req.flash("error", "Please login");
	// 	return res.redirect("/login");
	// }

	const { name, typeId } = req.body;

	let imageFileName = "/image/no-image.jpg";

	if (req.file) {
		imageFileName = req.file.path;
	}

	await Hero.create({
		name,
		typeId,
		photo: imageFileName,
		userId: req.session.user.id,
	});

	res.redirect("/");
}

async function renderHeroDetail(req, res) {
	const hero = await Hero.findOne({
		where: { id: req.params.id },
		include: [
			{ model: Type, as: "type" },
			{ model: User, as: "user" },
		],
	});

	if (!hero) {
		return res.render("page-404");
	}

	res.render("hero-detail", {
		user: req.session.user,
		hero: hero.get({ plain: true }),
	});
}

async function renderHeroEdit(req, res) {
	const [hero, types] = await Promise.all([
		Hero.findByPk(req.params.id),
		Type.findAll(),
	]);

	// if (!hero || hero.userId !== req.session.user.id) {
	// 	return res.render("page-404");
	// }

	res.render("hero-edit", {
		user: req.session.user,
		hero: hero.get({ plain: true }),
		types,
	});
}

async function updateHero(req, res) {
	const { id } = req.params;
	const { name, typeId, currentPhoto } = req.body;
	const hero = await Hero.findByPk(id);

	if (!hero || hero.userId !== req.session.user.id) {
		return res.render("page-404");
	}

	let photoPath = currentPhoto;
	if (req.file) {
		// Delete old photo
		if (photoPath && photoPath !== "/img/default-hero.jpg") {
			fs.unlinkSync(path.join(__dirname, "../public", photoPath));
		}
		photoPath = "/uploads/" + req.file.filename;
	}

	await hero.update({
		name,
		typeId,
		photo: photoPath,
	});

    res.redirect("/");
}

async function deleteHero(req, res) {
	const hero = await Hero.findByPk(req.params.id);

	if (!hero || hero.userId !== req.session.user.id) {
		return res.render("page-404");
	}

	// Delete photo
	if (hero.photo && hero.photo !== "/img/default-hero.jpg") {
		fs.unlinkSync(path.join(__dirname, "../public", hero.photo));
	}

	await hero.destroy();
	res.redirect("/");
}

module.exports = {
    renderAddHero,
    addHero,
    renderHeroDetail,
    renderHeroEdit,
    updateHero,
    deleteHero,
};