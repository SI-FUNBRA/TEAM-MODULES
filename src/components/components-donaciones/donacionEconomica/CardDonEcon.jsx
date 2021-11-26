import React from 'react'

const CardDonEcon = ({DonEcon}) => {
    return (
        <tbody>
                <tr>
                    <th scope="row">{DonEcon.idDonacionEconomica}</th>
                    <td>{DonEcon.fechaDonacion}</td>
                    <td>{DonEcon.montoDonacion}</td>
                </tr>
        </tbody>
    )
}

export default CardDonEcon
