import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BiAccessibility } from "react-icons/bi";
import { dataUser } from '../../redux/action/DoctorAction';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, LabelList } from 'recharts';



const Home = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataArray = await dataUser();
                setData(dataArray)
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        }
        fetchData();
    }, []);

    console.log(data)
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
                    <h1>50</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>doctors</h3>
                        <FaUserDoctor className='card-admin-icon' />
                    </div>
                    <h1>25</h1>
                </div>
                <div className='card-admin'>
                    <div className='car-inner'>
                        <h3>Quotes</h3>
                        <BiAccessibility className='card-admin-icon' />
                    </div>
                    <h1>100</h1>
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
                        <Bar dataKey="tipo_1" fill="#4843b0">
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} position="top" value={entry.tipo_1} />
                                ))
                            }
                        </Bar>
                        <Bar dataKey="tipo_2" fill="#474a48">
                            {
                                data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} position="top" value={entry.tipo_2} />
                                ))
                            }
                        </Bar>
                    </BarChart>

                </ResponsiveContainer>
            </div>

        </main>
    )
}

export default Home
