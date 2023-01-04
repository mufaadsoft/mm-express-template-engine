const { Home } = require("../controllers/HomeController");

const Route = [{ method: "get", path: "/", func: Home }];

module.exports = Route;
