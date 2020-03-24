"use strict";

module.exports = function(application){
    application.get("/sistema/index", function(request, response){
        application.app.controllers.sistema.index.carregarView(application, request, response);
    })

    application.get("/sistema/graficos", function(request, response){
        application.app.controllers.sistema.graficos.carregarView(application, request, response);
    });

    application.get("/sistema/dados", function(request, response){
        application.app.controllers.sistema.dados.carregarView(application, request, response);
    });

    application.get("/sistema/exportar", function(request, response){
        application.app.controllers.sistema.exportar.carregarView(application, request, response);
    });
};