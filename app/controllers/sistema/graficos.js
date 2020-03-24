module.exports.carregarView = async function (application, request, response) {
    //let lista  = await application.app.models.graficos.getListaCnpjs(application);

    response.render("sistema/_template", { page: "graficos.ejs" });
};