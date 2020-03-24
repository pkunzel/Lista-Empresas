module.exports.carregarView = function (application, request, response) {
    response.render("sistema/_template", { page: "index.ejs" });
};