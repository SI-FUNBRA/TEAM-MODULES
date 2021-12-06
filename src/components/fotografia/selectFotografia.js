import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import ServicioFotografia from '../../service/ServicioFotografia';


const SelectFotografia = (props) => {

    const [fotografias, setFotografias] = useState([])

    useEffect(() => {
        const fotografiaService = new ServicioFotografia()
        fotografiaService.getFotos().then(res => setFotografias(res.data));
    }, []);

    const [foto, setFoto] = useState(props.idFotografia)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setFoto(e.value);
        props.onInputChange(e, 'idFotografia_FK')
    }


    return (
        <div className="field">
            <label>Fotografía</label>
            <div className="formgrid grid">
                {
                    fotografias.map((_fotografia )=>(
                        <div key={_fotografia.idFotografia} className="field-radiobutton col-6">
                            <RadioButton inputId="idFotografia" name="fotografia" value={_fotografia.idFotografia} onChange={onCategoryChange} checked={foto === _fotografia.idFotografia} />
                            <div className="card">
                                <img src={_fotografia.urlFotografia} style={{width:'20%'}}/>
                            </div>

                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectFotografia
