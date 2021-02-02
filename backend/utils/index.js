const { Codigo } = require('../enum');

module.exports = {
    handler: (doc, res, code) => {
        if (code == 200){
            res.status(code).json(doc)
        }
        
        res.status(code).json(Object.assign(Codigo[code], doc));
        
    },
};