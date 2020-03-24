"use strict";

module.exports = function(application){
    application.get("/", function(request, response){
        application.app.controllers.home.acessarLogin(application, request, response);
    });

    application.get("/login", function(request, response){
        application.app.controllers.home.acessarLogin(application, request, response);
    });

    application.get("/404", function(request, response){
        application.app.controllers.home.erro404(application, request, response);
    });

    application.get("/register", function(request, response){
        //TODO: Criar rota e controle de login
        application.app.controllers.home.acessarLogin(application, request, response);
    });

    application.get("/forgot-password", function(request, response){
        //TODO: Criar rota de esqueceu senha após criar controle de login
        application.app.controllers.home.acessarLogin(application, request, response);
    });
};