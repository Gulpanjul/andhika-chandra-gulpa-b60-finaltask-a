const { Sequelize, where } = require("sequelize");
const bcrypt = require("bcrypt");
const config = require("../config/config.json");
const { Hero, Type, User } = require("../models");

const sequelize = new Sequelize(config.development);

saltRounds = 10;

async function renderHome(req, res) {
	const user = req.session.user;

	const heroes = await Hero.findAll({
		include: [
			{
				model: Type,
				as: "type",
				attributes: ["name"],
			},
			{
				model: User,
				as: "user",
				attributes: ["id", "username"],
			},
		],
		order: [["createdAt", "DESC"]],
	});

	if (user) {
		res.render("index", {
			heroes: heroes,
			user: user,
		});
	} else {
		res.render("index", {
			heroes: heroes,
		});
	}

	// res.render("index", {
	// 	user: req.session.user,
	// 	heroes: heroes.map((hero) => ({
	// 		...hero.get({ plain: true }),
	// 		type: hero.type.name, // Akses melalui alias lowercase
	// 		author: hero.user.username, // Akses melalui alias lowercase
	// 	})),
	// });
}

async function renderLogin(req, res) {
	const user = req.session.user;
	console.log("usernya adalah :", user);

	if (user) {
		req.flash("warning", "User already login.");
		return res.redirect("/");
	} else {
		res.render("auth-login", { user: user });
	}
}

async function renderRegister(req, res) {
	const user = req.session.user;
	console.log("usernya adalah :", user);

	if (user) {
		return res.redirect("/");
	} else {
		res.render("auth-register", { user: user });
	}
}

async function authLogin(req, res) {
	const { email, password } = req.body;
	// console.log(`yang mau login : ${email} ${password}`);

	// check kalau usernya ada atau tidak
	const user = await User.findOne({ where: { email: email } });

	if (!user) {
		req.flash("error", "User tidak ditemukan.");
		return res.redirect("/login");
	}

	// console.log("user ada!", user);

	// check kalau password salah
	const isValidated = await bcrypt.compare(password, user.password); // return sebuah bolean, apakah true or false

	if (!isValidated) {
		req.flash("error", "Password mismatch.");
		return res.redirect("/login");
	}

	let loggedInUser = user.toJSON(); // convert dari object sequelize ke object biasa

	delete loggedInUser.password; // menghapus properti password pada object new user

	console.log("user setelah password di delete :", loggedInUser);
	req.session.user = loggedInUser;

	req.flash("success", `Selamat datang ${loggedInUser.name}`);
	res.redirect("/");
}

async function authRegister(req, res) {
	const { name, email, password, confirmPassword } = req.body; // object destructuring

	if (password !== confirmPassword) {
		req.flash("error", "Password dan confirm password tidak sesuai.");
		return res.redirect("/register");
	}

	// check apakah email sudah terpakai
	const user = await User.findOne({ where: { email: email } });

	if (user) {
		req.flash("error", "Email sudah terpakai.");
		return res.redirect("/register");
	}

	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const newUser = {
		name,
		email,
		password: hashedPassword,
	};

	console.log("user baru :", newUser);

	const userInsert = await User.create(newUser);

	req.flash("success", "Berhasil mendaftar, silahkan login.");
	res.redirect("/login");
}

async function authLogout(req, res) {
	// hapus user dari session
	req.session.user = null;

	res.redirect("/login");
}

async function renderError(req, res) {
	const user = req.session.user;
	console.log("usernya adalah :", user);

	res.render("page-404", { user: user });
}

module.exports = {
	renderHome,
	renderLogin,
	renderRegister,
	authLogin,
	authRegister,
	authLogout,
	renderError,
};
