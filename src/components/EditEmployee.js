import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditEmployee(props) {
    const [name, setName] = useState(props.name);
    const [role, setRole] = useState(props.role);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <button onClick={handleShow} className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Edit</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Person Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => {
                        //prevent page refresh on submit form
                        e.preventDefault();
                        props.updateEmployee(props.id,name,role);
                        handleClose();
                    }}
                         id='editmodal'
                    >

                        <div className="flex min-h-full flex-col justify-center px-2 py-2 lg:px-2">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label for="employeeName" className="block text-sm font-medium leading-6 text-gray-900">Employee Name</label>
                                        <div className="mt-2">
                                            <input id="employeeName"
                                                type="text"
                                                autocomplete="email"
                                                Value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                            </input>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="employeeRole" className="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                        <div className="mt-2">
                                            <input id="employeeRole"
                                                type="text"
                                                defaultValue={role}
                                                onChange={(e) => { setRole(e.target.value) }}
                                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </form>


                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={handleClose}>
                        Close
                    </button>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' form="editmodal">
                        Save Changes
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditEmployee;