const translatte = require('translatte');

class Trans {
    async translation(str, option) {
        try {
            const res = await translatte(str, option);
            return res.text;
        } catch (err) {
            return err;
        }
    }
}

module.exports = Trans;