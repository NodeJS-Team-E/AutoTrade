 'use strict'

 module.exports = {
     getLoginForm(req, res) {
         //console.log("tuka sam");
         res.status(200).render("login");
     },
     getProfile(req, res) {
         if (!req.isAuthenticated()) {
             res.status(401).render("unauthorized");
         } else {
             const user = req.user;
             //  console.log('*********');
             //  console.log(user);
             res.status(200).render("profile", { result: user });
         }
     },
     getUnauthorized(req, res) {
         res.send(res.render("unauthorized"));
     },
     getRegisterForm(req, res) {
         res.status(200).render("register");
     }
 }