const express = require("express");
const router = express.Router();
const path = require("path");
const Roles_List = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");


const employeeController = require("../../controllers/employeeController")

router.route("/")
     .get(employeeController.getAllEmployees)
     .post(verifyRoles(Roles_List.Admin, Roles_List.Editor),employeeController.createNewEmployee)
     .put(verifyRoles(Roles_List.Admin, Roles_List.Editor),employeeController.updateEmployee)
     .delete(verifyRoles(Roles_List.Admin),employeeController.deleteEmployee);

router.route("/:id")
     .get(employeeController.getEmployee);

module.exports = router;