import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CardSolDonEsp from './CardSolDonEsp';

const ListSolDonEsp = () => {

    const URL='http://localhost:3005/api/solicitudDonacionEspecie';

    const getData=async()=>{
        const response=await axios.get(URL);
        return response;
    }

    const [listSolDonEsp, setListSolDonEsp] = useState([]);

    useEffect(() => {
        getData().then((response)=>{
            setListSolDonEsp(response.data)
        })
    }, [])

    return (
        <div>
            <h1 className="text-center my-5">Lista Solicitudes Donación</h1> 
            <div className="container-fluid container">
                <Link to='/donaciones' className="btn btn-secondary my-3"><i class='bx bx-left-arrow-alt'></i> Regresar</Link>
                <div className="row">
                    <div className="col">
                        <table className="table table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">id Donacion</th>
                                    <th scope="col">Estado Donacion</th>
                                    <th scope="col">Fecha Entrega</th>
                                    <th scope="col">Lugar Entrega</th>
                                    <th scope="col">Mas</th>
                                </tr>
                            </thead>
                            {
                                listSolDonEsp.map((SolDonEsp, i)=>(
                                    <CardSolDonEsp key={i} SolDonEsp={SolDonEsp} />
                                ))
                            }
                        </table> 
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ListSolDonEsp;



                
                
