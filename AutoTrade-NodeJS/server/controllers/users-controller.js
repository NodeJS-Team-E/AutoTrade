  'use strict'

  let notifier = require("../utilities/notifier");

  module.exports = function(data) {
      return {
          getLoginForm(req, res) {
              res.status(200).render("users/login");
          },
          getProfile(req, res) {
              //console.log("()()()()");
              //console.log(req);

              if (!req.isAuthenticated()) {
                  res.status(401).render("noplacetogo/unauthorized");
              } else if (Object.keys(req.params).length == 0) {
                  const user = req.user;
                  res.status(200).render("users/profile", { user: user });
              } else {
                  //console.log(req.params);
                  //console.log(data);
                  const otherUsername = req.params.username;
                  data.userData.findByUsername(otherUsername)
                      .then((otherUser) => {
                          otherUser = otherUser[0];
                          //console.log(otherUser);
                          if (!otherUser) {
                              //console.log("nqma takav user");
                              notifier.error("No such user");
                              return res.status(400).redirect('/home');
                          }
                          //console.log("ima takav user");
                          //console.log(otherUser);
                          return res.status(200).render("users/otherUsersProfile", { otherUser: otherUser });
                      })
                      .catch((err) => {
                          //console.log('greshka 500');
                          res.status(500).redirect('/unauthorized');
                      })
              }

          },
          getUnauthorized(req, res) {
              res.send(res.render("noplacetogo/unauthorized"));
          },
          getRegisterForm(req, res) {
              res.status(200).render("users/register");
          }
      };
  }