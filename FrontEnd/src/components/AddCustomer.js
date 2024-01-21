import { useEffect, useState} from "react";
import { Link, useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { data } from "../SharedData";

function AddCustomer(props) {

    const [name, setName] = useState('');
    const [industry, setIndustry] = useState('');
    const navigate = useNavigate();

    const [show, setShow] = useState(props.show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <button onClick={props.toggleShow} className="block mx-auto m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">+ Add Customer</button>

            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => {
                        //prevent page refresh on submit form
                        e.preventDefault();

                        props.newCustomer(name, industry)

                        handleClose();

                        setName('');
                        setIndustry('');
                    }}
                        id='editmodal'
                    >

                        <div className="flex min-h-full flex-col justify-center px-2 py-2 lg:px-2">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input id="name"
                                                type="text"
                                                placeholder='Toni'
                                                Value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            </input>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="Industry" className="block text-sm font-medium leading-6 text-gray-900">Industry</label>
                                        <div className="mt-2">
                                            <input id="Industry"
                                                type="text"
                                                placeholder='Robotics'
                                                defaultValue={industry}
                                                onChange={(e) => { setIndustry(e.target.value) }}
                                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                        </div>
                                    </div>


                                </form>
                            </div>
                        </div>
                    </form>


                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={props.toggleShow}>
                        Close
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' form="editmodal">
                        Add Customer
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddCustomer;