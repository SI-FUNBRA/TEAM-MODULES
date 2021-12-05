import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/cita`

export class ServicioCita {

    getCita (){
        return axios.get(URL)
    }

    createCita(data){
        return axios.post(`${URL}/`,data)
    }

    updateCita(idCita,data){
        return axios.put(`${URL}/actualizar/${idCita}`,data)
    }

    deleteCita(idCita){
        return axios.delete(`${URL}/${idCita}`)
    }

}
