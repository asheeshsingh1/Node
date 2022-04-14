const db = require('../db/connPostGres')

const validateBoardId = async (restrauntID,ownerId) =>{
    try{
    const restraunt = await db.query(`select * from restraunts where owner = '${ownerId}' and _id = '${restrauntID}';`);
        return !(!restraunt.rows[0]);
    }catch(e){
        console.log(e)
        return false;
    }
}

module.exports = validateBoardId;
