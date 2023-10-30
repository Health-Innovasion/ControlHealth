import React from 'react'
import { FaUser } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { BiAccessibility } from "react-icons/bi";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,BarChart, Bar } from 'recharts';


const Home = () => {

    const data = [
        {
            Departamento: 'Chontales',
            tipo_1: 40,
            tipo_2: 25,
        },{
            Departamento: 'Managua',
            tipo_1: 40,
            tipo_2: 25,
        },{
            Departamento: 'Leon',
            tipo_1: 25,
            tipo_2: 30,
        },{
            Departamento: 'Granada',
            tipo_1: 25,
            tipo_2: 50,
        },{
            Departamento: 'Masaya',
            tipo_1: 85,
            tipo_2: 25,
        },{
            Departamento: 'Esteli',
            tipo_1: 25,
            tipo_2: 25,
        },{
            Departamento: 'Matagalpa',
            tipo_1: 60,
            tipo_2: 100,
        },
       
    ];

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
                        <XAxis dataKey="Departamento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="tipo_1" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="tipo_2" stroke="#82ca9d" />
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
                        <XAxis dataKey="Departamento" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="tipo_1" fill="#8884d8" />
                        <Bar dataKey="tipo_2" fill="#474a48" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </main>
    )
}

export default Home
