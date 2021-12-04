import axios from "axios";
const URL = `${process.env.REACT_APP_API_URL}/documentoSolicitud`;

class ServicioDocumento{

    getDocumentos(){
        return axios.get(URL)
    }

    sendDocumentos(file){
        const form = new FormData()
        form.append('file', file)

        return axios.post(`${URL}/upload`, form)
    }

    updateDocumentos(file, idDocumentoSolicitud){
        const form = new FormData()
        form.append('file', file)

        return axios.put(`${URL}/actualizar/${idDocumentoSolicitud}`, form)
    }

    deleteDocumento(idDocumentoSolicitud){
        return axios.delete(`${URL}/${idDocumentoSolicitud}`)
    }
}

export default ServicioDocumento
