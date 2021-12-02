import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/tratamiento`

export class ServicioTratamiento {

    getTratamiento(){
        return axios.get(URL)
    }

    getTratamientosDeshabilitados(){
        return axios.get(`${URL}/deshabilitados/`)
    }

    createTratamiento(data){
        return axios.post(`${URL}/nuevo`,data)
    }

    updateTratamiento(idTratamiento,data){
        return axios.put(`${URL}/actualizar/${idTratamiento}`,data)
    }

    changeStateTratamiento(idTratamiento,ruta){
        return axios.put(`${URL}/${ruta}/${idTratamiento}`)
    }

    deleteTratamiento(idTratamiento){
        return axios.delete(`${URL}/${idTratamiento}`)
    }

}
