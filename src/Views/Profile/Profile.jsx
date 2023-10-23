import React, { useState } from 'react';
import './Profile.css'
import { FaEdit,FaSave } from 'react-icons/fa';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { updateUserDataAndPhoto } from '../../redux/action/action';


function Profile() {

  const { currentUser } = useSelector((state) => state.user);

  const [state, setState] = useState({
    nombre: currentUser.displayName || '',
    tel: currentUser.telefon || '',
    departamento: currentUser.departamento || '',
    edad: currentUser.edad || '',
    photoURL: currentUser.photoURL || null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const { nombre, tel, departamento, edad, photoURL } = state;


  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setState({ ...state, photoURL: file });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true); 
  };

  const handleSaveChanges = () => {
    setIsEditing(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateUserDataAndPhoto(currentUser,state,photoURL)

  }

  // https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp
  // className="img-fluid my-5"
  return (
    <div className="container_profile py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-6 mb-4 mb-lg-0">
          <div className="card-profile mb-3">
            <form onSubmit={handleSubmit} className="row g-0">
              <div className="col-md-4 gradient-custom text-center text-white">
              <label htmlFor="file-input">
                  <img
                    src={currentUser.photoURL || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp'}
                    alt="Avatar"
                    className="img-fluid my-5"
                    style={{ cursor: 'pointer' }}
                  />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  id="file-input"
                  disabled={!isEditing}
                />
                <h5>{currentUser.displayName}</h5>
                {isEditing ? (
                  <button type="button" onClick={handleSaveChanges} className='edit-btn btn btn-success'>
                    <FaSave size={20} /> Guardar Cambios
                  </button>
                ) : (
                  <button type="submit" onClick={handleEditClick} className='edit-btn btn btn-warning'>
                    <FaEdit size={20} /> Editar Perfil
                  </button>
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Nombre</h6>
                      <input
                        type="text"
                        className="text-muted"
                        placeholder="Nombre"
                        id="nombre"
                        value={nombre}
                        name="nombre"
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Phone</h6>
                      <input
                        type="tel"
                        className="text-muted"
                        placeholder="Telefono"
                        id="tel"
                        value={tel}
                        name="tel"
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />

                    </div>
                    <div className="col-6 mb-3">
                      <h6>Departamento</h6>
                      <input
                        type="text"
                        className="text-muted"
                        placeholder="Departamento "
                        id="departamento"
                        value={departamento}
                        name="departamento"
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />

                    </div>
                    <div className="col-6 mb-3">
                      <h6>Edad</h6>
                      <input
                        type="text"
                        className="text-muted"
                        placeholder="Edad"
                        id="edad"
                        value={edad}
                        name="edad"
                        onChange={handleChange}
                        required
                        disabled={!isEditing}
                      />

                    </div>
                  </div>
                  <h6>Projects</h6>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Recent</h6>
                      <p className="text-muted">Lorem ipsum</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Most Viewed</h6>
                      <p className="text-muted">Dolor sit amet</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
