import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token')


axios.interceptors.response.use(config=>{
    axios.defaults.headers.common['token'] = localStorage.getItem('token')
    return config;
  }, err=> {
    // Do something with request error
    console.log("algo salio mal en axios")
    if (err.response.status === 401) {
        localStorage.removeItem('token')
        alert(err.response.data.error)
        window.location.href = '/';
    }
  });
