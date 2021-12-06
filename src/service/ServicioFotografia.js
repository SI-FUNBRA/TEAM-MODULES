import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/fotografia`;

class ServicioFotografia{

    getFotos(){
        return axios.get(URL)
    }

    sendFotos(file){
        const form = new FormData()
        form.append('file', file)

        return axios.post(`${URL}/upload`, form)
    }

    deleteFotos(idFotografia){
        return axios.delete(`${URL}/${idFotografia}`)
    }
}

export default ServicioFotografia
