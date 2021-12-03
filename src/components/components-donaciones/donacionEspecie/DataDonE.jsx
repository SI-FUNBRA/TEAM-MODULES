import React from 'react';

const DataDonE = ({dataa, deleteDataa}) => {
    return dataa.map((data)=>(
                <tr key={data.idTipoArticuloDonado_FK}>
                    <td>{data.idTipoArticuloDonado_FK}</td>
                    <td>{data.nombreArticuloDonado}</td>
                    <td>{data.cantidadArticuloDonado}</td>
                    <td onClick={()=>deleteDataa(data.idTipoArticuloDonado_FK)}>
                        <i class='bx bxs-trash-alt' style={{'color':'#ff0000', 'cursor': 'pointer'}}></i>
                    </td>
                </tr>
            ))
}

export default DataDonE
