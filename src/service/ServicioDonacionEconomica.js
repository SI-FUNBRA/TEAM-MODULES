import axios from 'axios';

const URL = `${process.env.REACT_APP_API_URL}/donacionEconomica`

export class ServicioDonacionEconomica {

    getDonacionesE(){
        return axios.get(URL)
    }

}
