import React, { useEffect, useState } from 'react';
import ServicioDocumento from '../../service/ServicioDocumento';
import CardDocumento from './cardDocumento';

const ListDocs= () => {
    const [lista, setList] = useState([]);
    const [updatedList, setUpdatedList] = useState(false)


    const servicioDocumento = new ServicioDocumento();

    const getDocumentosSolicitud=()=>{
        servicioDocumento.getDocumentos().then(res => setList(res.data));
    }

    useEffect(() => {
        getDocumentosSolicitud()
    }, [updatedList]);


    return (
        <div className="dataview-demo">
            <div className="card">
                {
                lista.map((documento, index)=>(
                    <CardDocumento
                    key={index}
                    documento={documento}
                    />
                ))
            }
            </div>

        </div>
    );
}

export default ListDocs
