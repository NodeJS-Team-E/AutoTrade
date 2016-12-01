 'use strict'

 module.exports = {
     getLoginForm(req, res) {
         res.status(200).render("login");
     },
     getProfile(req, res) {
         if (!req.isAuthenticated()) {
             res.status(401).render("unauthorized");
         } else {
             const user = req.user;
             res.status(200).render("profile");
         }
     },
     getUnauthorized(req, res) {
         res.send(res.render("unauthorized"));
     },
     getRegisterForm(req, res) {
         res.status(200).render("register");
     }
 }