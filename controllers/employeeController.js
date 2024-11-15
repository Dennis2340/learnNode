const mongoose = require('mongoose');
const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
    const employee = await Employee.find();
    if (!employee || employee.length === 0) {
        return res.status(204).json({"message": "No employees found!"});
    }
    res.json(employee);
};

// create employee using id
const createNewEmployee = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({"message": "First and Last name required"});
    }
    try {
        const result = await Employee.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message": "Internal Server Error"});
    }
};

// update employee using id
const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({"message": "ID parameter is required."});
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return res.status(400).json({"message": "Invalid employee ID."});
    }

    const result = await Employee.findByIdAndUpdate(
        req.body.id,
        {
            firstname: req.body.firstname,
            lastname: req.body.lastname
        },
        { new: true }
    );
    
    if (!result) {
        return res.status(404).json({"message": `No employee found with ID ${req.body.id}.`});
    }
    
    res.json(result);
};

// delete employee using id
const deleteEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({"message": "Employee ID required"});
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return res.status(400).json({"message": "Invalid employee ID."});
    }

    const singleEmployee = await Employee.findById(req.body.id);
    if (!singleEmployee) {
        return res.status(404).json({"message": `No employee found with ID ${req.body.id}.`});
    }

    const result = await singleEmployee.deleteOne();
    res.json(result);
};

const getEmployee = async (req, res) => {
    if (!req?.params?.id) {
        return res.status(400).json({"message": "Employee ID required"});
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({"message": "Invalid employee ID."});
    }

    const singleEmployee = await Employee.findById(req.params.id);
    if (!singleEmployee) {
        return res.status(404).json({"message": `Employee with ID ${req.params.id} not found.`});
    }

    res.json(singleEmployee);
};

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
};
