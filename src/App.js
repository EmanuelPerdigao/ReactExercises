import './App.css';
import Employee from './components/Employee';
import {useState} from 'react';

function App() {
  
  const[employeeRole, setEmployeeRole] = useState('none');
  const showEmployees = true;

  return (
    <div className="App">
      {showEmployees ? 

        <>
        <input type='text' onChange={(e) => {

          console.log(e.target.value);
          setEmployeeRole(e.target.value);


        }}/>
        <Employee name = "Caleb" role = {employeeRole}></Employee>
        </>

      :
        <p>You cannot see the employees</p>
      }   

        
        
    </div>
  );
}

export default App;
