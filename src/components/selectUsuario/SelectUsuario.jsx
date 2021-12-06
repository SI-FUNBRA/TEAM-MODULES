import React, { useEffect, useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import { ServicioUsu } from '../../service/ServicioUsu';

const SelectUsuario = (props) => {

    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const servicioUsuario = new ServicioUsu();
        servicioUsuario.getUsuarios().then(res => setUsuarios(res.data));
    }, []);

    const [usuario, setUsuario] = useState(props.idUsuario)

    //Esto es para que el select funcione bien
    const onCategoryChange = (e) => {
        setUsuario(e.value);
        props.onInputChange(e, 'idUsuario')
    }


    return (
        <div className="field">
            <label>Usuarios</label>
            <div className="formgrid grid">
                {
                    usuarios.map((_usuario )=>(
                        <div key={_usuario.idUsuario} className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value={_usuario.idUsuario} onChange={onCategoryChange} checked={usuario === usuario.idUsuario} />
                            <label htmlFor="category1">{_usuario.nombreUsuario}</label>
                        </div>
                ))
                }
            </div>
        </div>
    )
}

export default SelectUsuario
