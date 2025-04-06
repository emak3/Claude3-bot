const log4js = require('log4js');
const { getConfig } = require('./config.js');

log4js.configure({
	appenders: {
		stdout: { type: 'stdout' },
		app: { type: 'file', filename: 'application.log' }
	},
	categories: {
		default: { appenders: ['stdout'], level: "info" },
		release: { appenders: ['stdout', 'app'], level: "info" },
		develop: { appenders: ['stdout'], level: "debug" }
	}
});

const log = log4js.getLogger(getConfig().profile);
module.exports = log;