  'use strict'

  module.exports = {
      getLoginForm(req, res) {
          res.status(200).render("users/login");
      },
      getProfile(req, res) {
          if (!req.isAuthenticated()) {
              res.status(401).render("noplacetogo/unauthorized");
          } else {
              const user = req.user;
              res.status(200).render("users/profile", { user: user });
          }
      },
      getUnauthorized(req, res) {
          res.send(res.render("noplacetogo/unauthorized"));
      },
      getRegisterForm(req, res) {
          res.status(200).render("users/register");
      }
  }