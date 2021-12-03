import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/rol`

export class ServicioRol {

    getRol(){
        return axios.get(URL)
    }

    createRol(data){
        return axios.post(URL, data)
    }

    updateRol(data, id){
        return axios.put(`${URL}/actualizar/${id}`, data)
    }

    deleteRol(id){
        return axios.delete(`${URL}/${id}`)
    }

}
