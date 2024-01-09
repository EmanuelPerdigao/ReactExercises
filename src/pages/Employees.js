import '../index.css';
import Employee from '../components/Employee';
import AddEmployee from '../components/AddEmployee';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from '../components/EditEmployee';

function Employees() {

  const [employees, setEmployees] = useState([

    {
      id: 1,
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);


  //================================================================= CREATE NEW EMPLOYEE


  function newEmployee(name, role, img) {

    const newEmployee = {
      id: uuidv4(),
      name: name,
      role: role,
      img: img
    }

    setEmployees([...employees, newEmployee]);

  };

  //================================================================= DELETE EMPLOYEE


  function deleteEmployee(id) {

    for (let index = 0; index < employees.length; index++) {
      if (id === employees[index].id) {
        const updatedEmployees = [...employees];
        employees.splice(index, 1);
        //updatedEmployees[index] = { id: id, name: newName, role: newRole, img: employees[index].img };
        setEmployees(updatedEmployees);
        break;
      }
    }

  };


  //================================================================= UPDATE EMPLOYEE


  function updateEmployee(id, newName, newRole) {

    //Easiest way
    /* const updatedEmployees = employees.map((employee) => {
      if(id == employee.id){
        return {...employee, name:newName, role:newRole};
      }
      return employee;
    });

    setEmployees(updatedEmployees); */

    //my way

    for (let index = 0; index < employees.length; index++) {
      if (id === employees[index].id) {
        const updatedEmployees = [...employees];
        updatedEmployees[index] = { id: id, name: newName, role: newRole, img: employees[index].img };
        setEmployees(updatedEmployees);
        break;
      }
    }
  };


  return (
    <>
        <div className="flex flex-wrap justify-center">

          {employees.map((employee) => {

            const editEmployee = <EditEmployee
              name={employee.name}
              role={employee.role}
              id={employee.id}
              updateEmployee={updateEmployee}
              deleteEmployee={deleteEmployee}>

            </EditEmployee>

            return (

              <Employee
                id={employee.id}
                name={employee.name}
                role={employee.role}
                img={employee.img}
                editEmployee={editEmployee}>

              </Employee>

            );

          })}

        </div>
        <AddEmployee newEmployee={newEmployee}></AddEmployee>
    </>
  );
}

export default Employees;
