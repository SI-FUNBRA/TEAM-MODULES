import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/tipodoc`

export class ServicioTipoDoc {

    getTiposDoc(){
        return axios.get(URL)
    }

    createTipoDoc(data){
        return axios.post(URL, data)
    }

    updateTipoDoc(data, id){
        return axios.put(`${URL}/actualizar/${id}`, data)
    }

    deleteTipoDoc(id){
        return axios.delete(`${URL}/${id}`)
    }

}
