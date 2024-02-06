import { useEffect, useState, useSyncExternalStore, useContext } from "react";
import { Link, useNavigate, useParams, useLocation} from "react-router-dom";
import { data } from "../SharedData";
import { isEqual } from "lodash";
import { LoginContext } from "../App";

function Customer() {

    //ID from url
    const { id } = useParams();

    //navigate var
    const navigate = useNavigate();

    //Customer information
    const [customer, setCustomer] = useState();

    //A copy of the Customer information
    const [tempCustomer, setTempCustomer] = useState();

    //A variable to know when some input of the customer has been changed
    const [inputChanged, setInputChanged] = useState(false);

    const [notFound, setNotFound] = useState();
    const [error, setError] = useState();
    const location = useLocation();

    //to know when 
    const [loggedIn,setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        fetch(data.baseURL + 'api/customer/' + id, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => {

                if (response.status === 401) {
                   
                    setLoggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                else if (response.status === 404) {
                    setNotFound(true);
                }
                else if (!response.ok) {
                    navigate("/404");
                    throw new Error('Something went wrong!');
                }

                return response.json();
            })
            .then((data) => {
                setCustomer(data.customer);
                setTempCustomer(data.customer);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    //Check if the customer information is equal to the newTempCustomer if it is does not show the buttons
    useEffect(() => {

        if (isEqual(customer, tempCustomer)) {
            setInputChanged(false);
        }

    }, [tempCustomer]);

    function deleteCustomer() {
        const url = data.baseURL + 'api/customer/' + id;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('something wen wrong!');
                }
                navigate('/customers');
            })
            .catch((e) => {
                console.log(e);
            })
    }


    //
    function updateCustomer(e) {

        e.preventDefault();

        console.log("updated");

        const url = data.baseURL + 'api/customer/' + id;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'),
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {

                if (response.status === 401) {
                    setLoggedIn(false);
                    navigate('/login', {
                        state: {
                            previousUrl: location.pathname,
                        },
                    });
                }
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                return response.json();
            })
            .then((data) => {
                setInputChanged(false);
                setCustomer(data.customer);
                setError();
            })
            .catch((e) => {
                setError(e.message);
            })
    }

    function test() {
        console.log("test button submition");
    }

    return (
        <>
            {notFound ? <notFound /> : null}
            {customer ?
                <div>


                    <form id="customerInformation" onSubmit={updateCustomer}>
                        <label for="Name">Name</label>

                        <input id="Name" className='my-2 block' type="text" value={tempCustomer.name} onChange={(e) => {
                            setTempCustomer({ ...tempCustomer, name: e.target.value });
                            setInputChanged(true);
                        }}></input>

                        <label for="Industry" >Industry</label>
                        <input id="Industry" className='my-2 block' type="text" value={tempCustomer.industry} onChange={(e) => {
                            setTempCustomer({ ...tempCustomer, industry: e.target.value });
                            setInputChanged(true);
                        }}></input>



                        {/* Delete button */}
                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border' onClick={deleteCustomer}>Delete</button>

                        {inputChanged ?
                            <>

                                <button className='bg-white hover:bg-blue-500 text-blue-500 font-semibold hover:text-blue-500 py-1 px-2 border border-blue-500 hover:border-transparent border' onClick={(e) => {
                                    setTempCustomer({ ...customer });
                                    setInputChanged(false);
                                }}>Cancel</button>

                                <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 border' type="submit" id="customerInformation">Save</button>
                            </>
                            : null}

                    </form>
                </div >
                :
                null
            }

            {/* Display errors */}
            {error ? <p className="text-red font-bold">{error}</p> : null}

            <Link to='/customers'>Go Back</Link>
        </>

    );
}
export default Customer;
