import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioTipoDoc } from '../../service/ServicioTipoDoc';

const SelectTipoDocumento = (props) => {

    const [tiposDoc, setTiposDoc] = useState([])

    useEffect(() => {
        const servicioTipoDoc = new ServicioTipoDoc();
        servicioTipoDoc.getTiposDoc().then(res => setTiposDoc(res.data));
    }, []);

    const [tipoDoc, setTipoDOc] = useState(props.idTipoDoc)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setTipoDOc(e.value);
        props.onInputChange(e, 'idTipoDocumento_FK')
    }


    return (
        <div className="field">
            <label>Tipo Documento</label>
            <div className="formgrid grid">
                {
                    tiposDoc.map((_tipoDoc )=>(
                        <div key={_tipoDoc.idTipoDoc} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_tipoDoc.idTipoDoc} onChange={onCategoryChange} checked={tipoDoc === _tipoDoc.idTipoDoc} />
                            <label htmlFor="category1">{_tipoDoc.nombreTipoDoc}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectTipoDocumento
