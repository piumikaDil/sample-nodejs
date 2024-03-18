const { MyService } = require("../services/index");module.exports = {
	get: async (req, res) => {
		const data = await MyService.doSomething();
	},
};
