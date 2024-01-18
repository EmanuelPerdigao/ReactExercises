import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Customers() {

    const url = "http://127.0.0.1:8000/api/customers";
    const [customers, setCustomers] = useState();
    const [apiResponse, setApiResponse] = useState();

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

        </>

    );
}
export default Customers;
