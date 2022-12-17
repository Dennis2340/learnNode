const Employee = require("../model/Employee")


const getAllEmployees = async (req,res) => {

    const employee = await Employee.find()
    if(!employee) return res.sendStatus(204).json({"message" : "No employees found!"})
    res.json(employee)
   
 }
 // create employee using id
const createNewEmployee = async (req,res) => {
  
    if(!req?.body?.firstname || !req?.body?.lastname) return res.sendStatus(400).json({"message" : "First and Last name required"})
    try{
       const result = await Employee.create({
        firstname : req.body.firstname,
        lastname : req.body.lastname
    })
    res.sendStatus(201).json(result)
  }catch(error){
    console.log(error);
  }
   
}
 // update employee using id
const updateEmployee = async (req,res) => {
 if(!req?.body?.id)
 {
  return res.sendStatus(400).json({"message" : "ID parameter is required."})
 }
 const singleEmployee = await Employee.findOne({_id : req.body.id}).exec()
  if(!singleEmployee)
  {
    return res.status(204).json({"message" : `No employee matches ${req.body.id}.`});

  }

  if(req.body?.firstname) singleEmployee.firstname = req.body.firstname;
  if(req.body?.lastname) singleEmployee.lastname = req.body.lastname;

   const result = await singleEmplyee.save()
   res.json(result) 
}
  // delete employee using id
 const deleteEmployee = async (req,res) => {
  if(!req?.body?.id) return res.sendStatus(400).json({"message" : "Employee ID required"})

  const singleEmployee = await Employee.findOne({_id : req.body.id}).exec();

  if(!singleEmployee)
  {
    return res.status(204).json({"message" : `No employee matches ${req.body.id}.`});

  }
 
  const result = await singleEmployee.deleteOne({_id: req.body.id});
  res.json(result)

}

const getEmployee = async (req,res) => {
  if(!req?.params?.id) return res.sendStatus(400).json({"message" : "Employee ID required"})
  const singleEmployee =  await Employee.findOne({_id : req.params.id}).exec()

  if(!singleEmployee)
  {
    return res.status(204).json({"message" : `No employee matches ${req.params.id}.`});

  }
   res.json(singleEmployee);

 }

 module.exports = {
  getAllEmployees, 
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee
};
