import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/tipodoc`

export class ServicioTipoDoc {

    getTiposDoc(){
        return axios.get(URL)
    }

}
