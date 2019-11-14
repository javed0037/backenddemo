const db = require('../../db'),
    bcrypt = require('bcrypt'),
    global_fun = require('../../utils/globalFunction'),
    CONSTANTS = require('../../utils/constants');
let User = db.User;
let resultdb = global_fun.resultdb;

const findOneUser = async (requestObject) => {
    try {
        var user = await User.findOne(requestObject);
        if (user === null) {
            return resultdb(CONSTANTS.NOT_FOUND, CONSTANTS.DATA_NULL)
        } else {
            return resultdb(CONSTANTS.SUCCESS, user)
        }
    } catch (error) {
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL)
    }
};


const saveUser = async (data) => {
    try {
        var testUser = new User(data);
        var responnse = await testUser.save();
        return resultdb(CONSTANTS.SUCCESS, responnse)
    } catch (error) {
        console.log("there are the catch error", error);
        if (error.code)
            return resultdb(error.code, CONSTANTS.DATA_NULL)
        return resultdb(CONSTANTS.SERVER_ERROR, CONSTANTS.DATA_NULL);
    }
};
const verifyEmailPassword = async (data) => {
    let userresponse = await findOneUser({email : data.email});
    if (userresponse.data === null) {
        return resultdb(CONSTANTS.NOT_FOUND);
    } else if (userresponse.data.verificationStatus === false) {
        return resultdb(CONSTANTS.NOT_VERIFIED);
    } else {
        let verifypass = null;
        try {
            verifypass = await bcrypt.compare(data.password, userresponse.data.password);
        } catch (error) {
        }
        if (verifypass) {
            return resultdb(CONSTANTS.SUCCESS, userresponse.data);
        } else {
            return resultdb(CONSTANTS.ACCESS_DENIED, CONSTANTS.FALSE);
        }
    }
};


module.exports = {
    findOneUser: findOneUser,
    saveUser: saveUser,
    verifyEmailPassword: verifyEmailPassword,
};