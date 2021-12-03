import React from 'react';
import CardSolDonEsp from './CardSolDonEsp';

const ListArtDon = () => {

    const URL='http://localhost:3005/api/articuloDonado';

    const getData=async()=>{
        const response=await axios.get(URL);
        return response;
    }

    const [listArtDon, setListArtDon] = useState([]);

    useEffect(() => {
        getData().then((response)=>{
            setListArtDon(response.data)
            console.log(response)
        })
    }, [])

    return (
        <div>
            {
                listArtDon.map((ArtDon, i)=>(
                    <CardSolDonEsp key={i} ArtDon={ArtDon} />
                ))
            }
        </div>
    )
}

export default ListArtDon
