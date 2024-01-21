import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddCustomer from "../components/AddCustomer";
import { data } from "../SharedData";

function Customers() {

    const url = "http://127.0.0.1:8000/api/customers";
    const [customers, setCustomers] = useState();
    const [apiResponse, setApiResponse] = useState();
    const [show, setShow] = useState(false);

    function toggleShow() {
        setShow(!show);
    }

    useEffect(() => {
        fetch(url)
            .then((response) => {

                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                return response.json();
            })
            .then((data) => {
                setCustomers(data.customers);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    function newCustomer(name, industry) {

        const url = data.baseURL + 'api/customers/';
        const customerData = { name: name, industry: industry };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('something wen wrong!');
                }
                return response.json();
            })
            .then((data) => {
                toggleShow();
                setCustomers([...customers, data.customer]);
            })
            .catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <h1>Here are our Customers</h1>
            <ul>
                {customers
                    ? customers.map((customer) => {
                        return (

                            <li key={customer.id}>
                                <Link to={"/api/customer/" + customer.id}>{"Customer name: " + customer.name}
                                    {" Customer industry: " + customer.industry}
                                </Link>
                            </li>

                        );
                    })
                    : null
                }
            </ul>
            <AddCustomer newCustomer={newCustomer} show={show} toggleShow={toggleShow}></AddCustomer>

        </>

    );
}
export default Customers;
