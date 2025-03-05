const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const upload = require("./middlewares/upload-file");
require("dotenv").config();

const {
	renderHome,
	renderLogin,
	renderRegister,
	authRegister,
	authLogin,
	authLogout,
	renderError,
} = require("./controllers/controllers");

const {
	renderAddHero,
	addHero,
	renderHeroDetail,
	renderHeroEdit,
	updateHero,
	deleteHero,
} = require("./controllers/heroControllers");

const {
	renderAddType,
	addType,
	deleteType,
} = require("./controllers/typeControllers");

const checkUser = require("./middlewares/auth");

const port = process.env.SERVER_PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// modul apa saja yang kita gunakan di dalam express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("assets"));
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use(methodOverride("_method"));
app.use(flash());

app.use(
	session({
		name: "my-session",
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

hbs.registerPartials(__dirname + "/views/partials", function (err) {});

hbs.registerHelper("equal", function (a, b) {
	return a === b;
});

// HOME
app.get("/", renderHome);

app.get("/login", renderLogin);

app.get("/register", renderRegister);

app.get("/logout", authLogout);

app.post("/register", authRegister);

app.post("/login", authLogin);


app.get("/add", renderAddHero);
app.post("/", upload.single("photo"), addHero);

app.get("/type-add", renderAddType);
app.post("/type-add", addType);

app.get("/:id/edit", renderHeroEdit);
app.patch("/:id", upload.single("photo"), updateHero);
app.delete("/:id", deleteHero);
app.delete("/type-add/:id", deleteType);
app.get("/:id", renderHeroDetail);

// app.get("*", renderError);

app.listen(port, () => {
	console.log(`My personal web app listening on port ${port}`);
});
