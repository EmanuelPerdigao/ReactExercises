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
                console.log(data.customers);
                setCustomers(data.customers);
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    return (
        <>
            <div>
                <p>Hello From Customers</p>
            </div>

            {customers ? (
                <>
                    {customers.map((customer) => {
                        return (
                            <p>
                                <Link to={"/api/customer/" + customer.id}>{"Customer name: " + customer.name}</Link>
                                {"Customer industry:" + customer.industry}
                            </p>
                        );
                    })}
                </>
            ) : null
            }
        </>

    );
}
export default Customers;
