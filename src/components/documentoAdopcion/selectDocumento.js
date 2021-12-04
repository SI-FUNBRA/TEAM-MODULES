import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import ServicioDocumento from '../../service/ServicioDocumento';

const SelectDocumento = (props) => {

    const [documentos, setDocumentos] = useState([])

    useEffect(() => {
        const documentoService = new ServicioDocumento()
        documentoService.getDocumentos().then(res => setDocumentos(res.data));
    }, []);

    const [doc, setDoc] = useState(props.idDocumentoSolicitud)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setDoc(e.value);
        props.onInputChange(e, 'idDocumentoSolicitud_FK')
    }


    return (
        <div className="field">
            <div className="formgrid grid">
            <label>Documentos de solicitudes de adopción</label>
                {
                    documentos.map((_documento )=>(
                        <div key={_documento.idDocumentoSolicitud} className="field-radiobutton col-6">
                            <RadioButton inputId="idDocumentoSolicitud" name="documento" value={_documento.idDocumentoSolicitud} onChange={onCategoryChange} checked={doc === _documento.idDocumentoSolicitud} />
                            <div className="card">
                                <iframe src={_documento.file} style={{width:'100%'}}/>
                            </div>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectDocumento
