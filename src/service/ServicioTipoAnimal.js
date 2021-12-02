import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/tipoAnimal`

export class ServicioTipoAnimal {

    getTipoAnimal(){
        return axios.get(URL)
    }

    createTipoAnimal(data){
        return axios.post(`${URL}/nuevo`,data)
    }

    updateTipoAnimal(idTipoAnimal,data){
        return axios.put(`${URL}/actualizar/${idTipoAnimal}`,data)
    }

    deleteTipoAnimal(idTipoAnimal){
        return axios.delete(`${URL}/${idTipoAnimal}`)
    }

}
