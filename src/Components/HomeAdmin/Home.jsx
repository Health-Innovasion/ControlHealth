import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BiAccessibility } from "react-icons/bi";
import { dataUser } from '../../redux/action/DoctorAction';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, LabelList } from 'recharts';
import { dataAdminCard, dataAdminCard2, dataAdminCard3 } from '../../redux/action/UserAction';


const Home = () => {

    const [data, setData] = useState([]);
    const [numUser, setNumUser] = useState([]);
    const [numDoc, setNumDoc] = useState([]);
    const [citasE, setCitasE] = useState([]);
    const [citasA, setCitasA] = useState([]);
    const [citasT, setCitasT] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataArray = await dataUser();
                setData(dataArray);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData(); // Llama a la función fetchData para obtener los datos y actualizar el estado
    }, [data]);

    useEffect(() => {
        const fetchDataNumUser = async () => {
            try {
                const unsubscribe = dataAdminCard('users',(dataArray) => {
                    setNumUser(dataArray);
                });

                return () => {
                    // Detener la escucha de cambios cuando el componente se desmonta
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchDataNumUser();
    }, [numUser]);

    useEffect(() => {
        const fetchDataNumUser = async () => {
            try {
                const unsubscribe = dataAdminCard2((dataArray) => {
                    setNumDoc(dataArray);
                });

                return () => {
                    // Detener la escucha de cambios cuando el componente se desmonta
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchDataNumUser();
    }, [numDoc]);
    
    useEffect(() => {
        const fetchDataNumUser3 = async () => {
            try {
                const unsubscribe = dataAdminCard3((dataArray) => {

                    const citasFiltradas = dataArray.filter(cita => {
                         return cita.data.data.status === 'En revisión'
                        
                    });
                    setCitasE(citasFiltradas)
                    const citasFiltradasAprovadas = dataArray.filter(cita => {
                        return cita.data.data.status === 'Aprobada'
                       
                   });
                   setCitasA(citasFiltradasAprovadas)

                   setCitasT(dataArray);
                });
                
                
                return () => {
                    // Detener la escucha de cambios cuando el componente se desmonta
                    unsubscribe();
                };
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchDataNumUser3();
    }, []);

    
    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>users</h3>
                        <FaUser className='card-admin-icon' />
                    </div>
                    <h1>{numUser.length}</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>doctors</h3>
                        <FaUserDoctor className='card-admin-icon' />
                    </div>
                    <h1>{numDoc.length}</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>Quotes</h3>
                        <BiAccessibility className='card-admin-icon' />
                    </div>
                    <h1>{citasT.length}</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>Quotes En revision </h3>
                        <BiAccessibility className='card-admin-icon' />
                    </div>
                    <h1>{citasE.length}</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>Quotes Aprobadas</h3>
                        <BiAccessibility className='card-admin-icon' />
                    </div>
                    <h1>{citasA.length}</h1>
                </div>
                
            </div>

            <div className='charts'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="departamento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tipo_1" stroke="#8884d8" activeDot={{ r: 8 }}>
                            <LabelList dataKey="tipo_1" position="top" />
                        </Line>
                        <Line type="monotone" dataKey="tipo_2" stroke="#82ca9d">
                            <LabelList dataKey="tipo_2" position="top" />
                        </Line>
                    </LineChart>


                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="departamento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tipo1" fill="#008DD8">
                            {data && data.map((entry, index) => (
                                <Cell key={`cell-${index}`} position="top" value={entry.tipo1} />
                            ))}
                        </Bar>
                        <Bar dataKey="tipo2" fill="#131a15">
                            {data && data.map((entry, index) => (
                                <Cell key={`cell-${index}`} position="top" value={entry.tipo2} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>

            </div>

        </main>
    )
}

export default Home;
