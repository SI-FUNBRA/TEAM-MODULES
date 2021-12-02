
import React from 'react'
import TipoDocumento from './modulos/TipoDocumento'
import TipoUsuario from './modulos/TipoUsuario'

const OtrosModulos = () => {

    return (
        <div className="grid">
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Tipo Documento:</h5>
                    <TipoDocumento/>
                </div>
                <div className="card">
                    <h5>Tipo Documento:</h5>
                    <TipoDocumento/>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Tipo Usuario:</h5>
                    <TipoUsuario/>
                </div>
                <div className="card">
                    <h5>Tipo Documento:</h5>
                    <TipoDocumento/>
                </div>
            </div>

        </div>
    )
}

export default OtrosModulos
