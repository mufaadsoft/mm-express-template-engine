const { View } = require("../core/Core")

const Home = (req, res) => {

    View(res, "index", {title: "HMMMM"});
}

module.exports = {Home}