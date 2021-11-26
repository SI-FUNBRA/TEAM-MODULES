import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import CardDonEcon from './CardDonEcon';

import {AiOutlineArrowLeft} from 'react-icons/ai';

const ListDonEcon = () => {

    const URL="http://localhost:3005/api/donacionEconomica";

    const getData=async()=>{
        const response=await axios.get(URL);
        return response;
    }

    const [listDonEcon, setListDonEcon]=useState([]);

    useEffect(() => {
        getData().then((response)=>{
            setListDonEcon(response.data)
        })
    }, []);

    return (
        <div>
            <h1 className="text-center my-5">Lista Donaciones Economicas</h1>
            <div className="container-fluid container">
                <Link to='/donaciones' className="btn btn-secondary my-3"><AiOutlineArrowLeft /> Regresar</Link>
                <div className="row">
                    <div className="col">
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">id Donacion</th>
                                    <th scope="col">Fecha Donacion</th>
                                    {/* <th scope="col">Nombre Usuario</th>
                                    <th scope="col">Correo Electronico Usuario</th> */}
                                    <th scope="col">Valor Donacion</th>
                                </tr>
                            </thead>
                            {
                                listDonEcon.map((DonEcon, i)=>(
                                    <CardDonEcon key={i} DonEcon={DonEcon} />
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListDonEcon
