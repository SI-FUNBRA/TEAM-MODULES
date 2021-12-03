
import React from 'react'
import Ciudades from './modulos/Ciudades'
import Paises from './modulos/Paises'

const OtrosModulosPaisesCiudades = () => {

    return (
        <div className="grid">
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Paises:</h5>
                    <Paises/>
                </div>
            </div>
            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Ciudades:</h5>
                    <Ciudades/>
                </div>
            </div>

        </div>
    )
}

export default OtrosModulosPaisesCiudades
