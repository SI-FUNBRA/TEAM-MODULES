import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/animal`

export class ServicioAnimal {

    getAnimales(){
        return axios.get(URL)
    }

    getAnimalesAdoptados(){
        return axios.get(`${URL}/adoptados`)
    }

    getAnimalesEnTratamiento(){
        return axios.get(`${URL}/enTratamiento`)
    }

    getAnimalesEnProcesoAdopcion(){
        return axios.get(`${URL}/enProcesoAdopcion`)
    }

    createAnimal(data){
        return axios.post(`${URL}/create`,data)
    }

    updateAnimal(idAnimal,data){
        return axios.put(`${URL}/actualizar/${idAnimal}`,data)
    }

    changeStateAnimal(idAnimal,ruta){
        return axios.put(`${URL}/${ruta}/${idAnimal}`)
    }

}
