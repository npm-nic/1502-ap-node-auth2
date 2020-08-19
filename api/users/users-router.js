const usersRouter = require("express").Router();

const Users = require("./users-model");
const authenticateJWT = require("../middlewares/authenticateJWT");
const findUsersInSameDepartment = require("../middlewares/findUsersInSameDepartment");

usersRouter.get("/", authenticateJWT, findUsersInSameDepartment, (req, res) => {
  //  [1]
  const same_department = req.users_in_same_department;
  //  [2]
  Users.find()
    .then((all_users) => {
      res.status(200).json({ same_department, all_users });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = usersRouter;

//  [1]
//  findUsersInSameDepartment adds all users with matching department to the request
//  [2]
//  i don't think this is the best way / exactly what we are going for...
//  currently returning all users + users in same department
//  --> that is why we are finding same dep users in middleware function
//  --> if we will always, only want users in same department...
//      --> [?] change findUsersIn... to checkDepartmentExists
//      --> [?] Users.findBy(req.decodedToken.department) instead of Users.find()
