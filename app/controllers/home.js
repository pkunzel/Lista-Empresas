"use strict";

module.exports.acessarLogin = function(application, request, response){
    response.render("login");
}

module.exports.erro404 = function(application, request, response){
    response.render("404");
}