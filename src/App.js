import './App.css';
import Employee from './components/Employee';

function App() {
  console.log("TEST");
  const showEmployees = true;
  return (
    <div className="App">
      {showEmployees ? 

        <Employee></Employee>

      :
        <p>You cannot see the employees</p>
      }   

        
        
    </div>
  );
}

export default App;
