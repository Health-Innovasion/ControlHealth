import React from 'react'
import Dropdown from '../../Components/Dropdown/Dropdown';
import Home from '../../Components/HomeAdmin/Home'
import "./Admin.css"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
        <div className='container-user'>
            <div className="navbar">
            <Link to="/homeAdmin">
                <Button variant="primary" style={{ marginTop: '5px', marginLeft:'5px' }}>
                     <AiOutlineArrowLeft />
                </Button>

            </Link> 
                    <Dropdown />
                </div>
            </div>
      <Home/>
    </div>
  )
}

export default Admin
