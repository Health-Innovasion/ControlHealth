import React, { useState } from 'react';
import './dropdown.css';
import { Menu } from '../../Utils/constants';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { logout } from '../../redux/action/action';
import { useDispatch, useSelector } from 'react-redux';
import icono from '../../Assets/Images/icono-user.png'

const Dropdown = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);


  const handleAuth = () => {
    if (currentUser) {
      dispatch(logout());
    }
  };

  return (
    <>
      {currentUser && (
        <div className='dropdown-container'>
       <div className="user-icon">
            <img src={icono} alt="" onClick={() => setOpen(!open)} />
          </div>

          <p>{currentUser.userName}</p>
        
          {open && (
            <div className={`menu ${open ? 'visible' : ''}`}>
              <div className='user-info'>
              </div>
              <ul onClick={() => setOpen(false)}>
                {Menu.map((item, index) => (
                  <li key={index}>
                    <Link to={item.path}>{item.title}</Link>
                  </li>
                ))}
                <li onClick={handleAuth}>logout</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
