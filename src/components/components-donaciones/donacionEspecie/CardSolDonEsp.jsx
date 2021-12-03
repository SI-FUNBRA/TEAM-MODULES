import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';

const CardSolDonEsp = ({SolDonEsp}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
            <tbody>
                <tr>
                    <th scope="row">{SolDonEsp.idDonacionEspecie}</th>
                    <td>{SolDonEsp.estadoSolicitud}</td>
                    <td>{SolDonEsp.fechaEntrega}</td>
                    <td>{SolDonEsp.lugarEntrega}</td>
                    {/* Button abrir modal */}
                    <td><Button variant="primary" onClick={handleShow}>
                    <i class='bx bx-dots-horizontal-rounded'></i>
                    </Button></td>

                    {/* Modal */}
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Articulos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Posibles articulos que deseen donar!
                            {
                                SolDonEsp.ArticuloDonados.map((e)=>(
                                    <ul key={e.idTipoArticuloDonado_FK}>
                                        <li><strong>Tipo Articulo:</strong> {e.idTipoArticuloDonado_FK}</li>
                                        <li><strong>Nombre Articulo:</strong> {e.nombreArticuloDonado}</li>
                                        <li><strong>Cantidad Articulo:</strong> {e.cantidadArticuloDonado}</li>
                                    </ul>
                                ))
                            }
                                
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal>  
                </tr>
            </tbody>
    );
};

export default CardSolDonEsp;
