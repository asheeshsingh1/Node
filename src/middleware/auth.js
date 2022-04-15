const db = require('../db/connPostGreSQL')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_HASH)
        const result = await db.query(`select * from vendors where _id = '${decoded._id}' and token = '${token}';`);
        if(!result.rowCount){
        throw new Error('Invalid Credentials');
    }
        req.token = token
        req.vendor = result.rows[0]
        next()
    } catch (e) {
        res.status(401).send({ error: 'Authentication Failed' })
    }
}

module.exports = auth