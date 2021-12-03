import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/pais`

export class ServicioPais {

    getPaises__Ciudad(){
        return axios.get(`${URL}/paises__ciudad`)
    }

    getPais(){
        return axios.get(URL)
    }

    createPais(data){
        return axios.post(URL, data)
    }

    updatePais(data, id){
        return axios.put(`${URL}/actualizar/${id}`, data)
    }

    deletePais(id){
        return axios.delete(`${URL}/${id}`)
    }

}
