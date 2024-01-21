import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { data } from "../SharedData";
import { isEqual } from "lodash";

function Customer() {

    const { id } = useParams();
    const navigate = useNavigate();
    //Customer information
    const [customer, setCustomer] = useState();
    //A copy of the Customer information
    const [tempCustomer, setTempCustomer] = useState();
    //A variable to know when some input of the customer has been changed
    const [inputChanged, setInputChanged] = useState(false);
    const [NotFound, setNotFound] = useState();


    useEffect(() => {
        fetch(data.baseURL + 'api/customer/' + id)
            .then((response) => {

                if (response.status === 404) {
                    setNotFound(true);
                }

                if (!response.ok) {
                    navigate("/404");
                    console.log("error")
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

        if(isEqual(customer, tempCustomer)){
            setInputChanged(false);
        }

    }, [tempCustomer]);

    function deleteCustomer() {
        const url = data.baseURL + 'api/customer/' + id;

        fetch(url, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
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

    function updateCustomer() {

        const url = data.baseURL + 'api/customer/' + id;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('something wen wrong!');
                }
                return response.json();
            })
            .then((data) => {
                setInputChanged(false);
                setCustomer(data.customer);
            })
            .catch((e) => {
                console.log(e);
            })
    }

return (
    <>
        {NotFound ? <NotFound /> : null}
        {customer ?
            <div>
                <input className='m-2 block px-2' type="text" value={tempCustomer.name} onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, name: e.target.value });
                    setInputChanged(true);                    
                }}></input>
                <input className='m-2 block px-2' type="text" value={tempCustomer.industry} onChange={(e) => {
                    setTempCustomer({ ...tempCustomer, industry: e.target.value });
                    setInputChanged(true);                    
                }}></input>

                {inputChanged ?
                    <>
                        <button className='block' onClick={(e) => {
                            setTempCustomer({ ...customer });
                            setInputChanged(false);
                        }}>Cancel</button>

                        <button className='block' onClick={updateCustomer}>Save</button>
                    </>
                    : null}
            </div >
            :
            null
        }

        <button onClick={deleteCustomer}>Delete</button>
        <br></br>
        <Link to='/customers'>Go Back</Link>
    </>

);
}
export default Customer;
