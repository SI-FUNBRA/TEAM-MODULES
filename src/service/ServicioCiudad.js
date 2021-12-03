import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/ciudad`

export class ServicioCiudad {

    getCiudades(){
        return axios.get(URL)
    }

    createCiudad(data){
        return axios.post(URL, data)
    }

    updateCiudad(data, id){
        return axios.put(`${URL}/actualizar/${id}`, data)
    }

    deleteCiudad(id){
        return axios.delete(`${URL}/${id}`)
    }

}
