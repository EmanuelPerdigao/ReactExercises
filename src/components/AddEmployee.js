import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddEmployee(props){

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [img, setImg] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(        
      <>
      
            <button onClick={handleShow} className="block mx-auto m-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Add Employee</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => {
                        //prevent page refresh on submit form
                        e.preventDefault();
                        props.newEmployee(name, role, img);
                        handleClose();

                        setName('');
                        setRole('');
                        setImg('');
                    }}
                         id='editmodal'
                    >

                        <div className="flex min-h-full flex-col justify-center px-2 py-2 lg:px-2">
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label for="employeeName" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                        <div className="mt-2">
                                            <input id="employeeName"
                                                type="text"
                                                placeholder='Toni'
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
                                                placeholder='Junior'
                                                defaultValue={role}
                                                onChange={(e) => { setRole(e.target.value) }}
                                                required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
                                        </div>
                                    </div>

                                    <div>
                                        <label for="eemployeeImg" className="block text-sm font-medium leading-6 text-gray-900">Image URL</label>
                                        <div className="mt-2">
                                            <input id="employeeImg"
                                                type="text"
                                                placeholder='https://www.google.pt'
                                                value={img}
                                                onChange={(e) => { setImg(e.target.value) }}
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
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'  onClick={handleClose} form="editmodal">
                        Add Employee
                    </button>
                </Modal.Footer>
            </Modal>
      </>
    );
}

export default AddEmployee;