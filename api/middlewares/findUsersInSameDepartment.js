const db = require("../users/users-model");

module.exports = (req, res, next) => {
  const department = req.decodedToken.department;
  db.findBy({ department })
    .then((users_in_same_department) => {
      req.users_in_same_department = users_in_same_department; //  [1]
      next();
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "urm...does that department actually exist?" });
    });
};

//  [1]
//  adds users_in_same_department to the request
//  --> users-router will then return that to the client
