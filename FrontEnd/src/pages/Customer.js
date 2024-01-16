import { useEffect, useState, useSyncExternalStore } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { data } from "../SharedData";

function Customer() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState();
    const [NotFound, setNotFound] = useState();

    useEffect(() => {
        fetch(data.baseURL + 'api/customer/' + id)
            .then((response) => {

                if (response.status === 404) {
                    /* console.log("error");
                    navigate("/404"); */

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
            })
            .catch((e) => {
                console.log(e.message);
            });
    }, []);

    return (
        <>
            {NotFound ? <NotFound/> : null}
            {customer ?
                <div>
                    <p>{customer.id}</p>
                    <p>{customer.name}</p>
                    <p>{customer.industry}</p>
                </div>
                :
                null
            }
        </>

    );
}
export default Customer;
