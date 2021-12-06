import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/enfermedad`

export class ServicioEnfermedad {

    getEnfermedad(){
        return axios.get(URL)
    }

    createEnfermerdad(data){
        return axios.post(`${URL}/nueva`,data)
    }

    updateEnfermedad(idEnfermedad,data){
        return axios.put(`${URL}/actualizar/${idEnfermedad}`,data)
    }

    deleteEnfermedad(idEnfermedad){
        return axios.delete(`${URL}/${idEnfermedad}`)
    }
}
