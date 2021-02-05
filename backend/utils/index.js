const { Codigo } = require('../enum');

module.exports = {
    handler: (doc, res, code) => {
        res.status(code).json(Object.assign(Codigo[code], doc));
    },
};