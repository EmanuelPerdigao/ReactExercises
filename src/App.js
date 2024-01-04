import './index.css';
import Employee from './components/Employee';
import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';

function App() {

  const [employeeRole, setEmployeeRole] = useState('none');
  const [employees, setEmployees] = useState([

    {
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "José",
      role: "test",
      img: "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  return (
    <div className="flex flex-wrap justify-center">

      {employees.map((employee) => {
        return (

          <Employee key= {uuidv4()} name={employee.name} role={employee.role} img={employee.img}></Employee>

        );

      })}
    </div>
  );
}

export default App;
