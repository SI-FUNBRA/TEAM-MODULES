import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/solicitudAdopcion`;

export class ServicioSolicitudAdopcion {

    getSolicitudes(){
        return axios.get(URL)
    }

    getSolicitudesRechazadas(){
        return axios.get(`${URL}/rechazadas`)
    }

    getSolicitudesAceptadas(){
        return axios.get(`${URL}/aceptadas`)
    }

    createSolicitud(data){
        return axios.post(`${URL}/nueva`,data)
    }

    updateSolicitud(idSolicitudAdopcion, data){
        return axios.put(`${URL}/actualizar/${idSolicitudAdopcion}`,data)
    }

    changeStateSolicitud(idSolicitudAdopcion,ruta){
        return axios.put(`${URL}/${ruta}/${idSolicitudAdopcion}`)
    }

    deleteSolicitud(idSolicitudAdopcion){
        return axios.delete(`${URL}/${idSolicitudAdopcion}`)
    }
}
