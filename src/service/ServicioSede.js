import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/sede`

export class ServicioSede {

    getSede (){
        return axios.get(URL)
    }

    createSede(data){
        return axios.post(`${URL}/`,data)
    }

    updateSede(idSede,data){
        return axios.put(`${URL}/actualizar/${idSede}`,data)
    }

    deleteSede(idSede){
        return axios.delete(`${URL}/${idSede}`)
    }

}
