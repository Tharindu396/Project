import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../Styles/Modal.css'
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

function Example() {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Instantiate useNavigate hook

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOk = () => {
    if (username === 'admin' && password === 'LM10') {
      navigate('/create'); // Redirect to create page
    } else {
      alert('Password is incorrect');
      navigate('/'); // Redirect to home page
    }
    setShow(false);
  };

  return (
    <>
      <Button className='g w-40' onClick={handleShow}>
        +add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Make sure you are the admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="John"
                autoFocus
                onChange={e => setUsername(e.target.value)} // Update username state when input changes
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder='Password' 
                onChange={e => setPassword(e.target.value)} // Update password state when input changes
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
