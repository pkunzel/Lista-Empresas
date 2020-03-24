module.exports.getListaCnpjs = async function(application){
    return await application.app.config.dbConnection.getListaCnpjs();
}