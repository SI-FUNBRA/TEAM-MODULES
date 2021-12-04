import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card'
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import './assets/styles/dataview.css';
import { Button } from 'primereact/button';
import ServicioFotografia from '../../service/ServicioFotografia';


const CardFoto =  ({fotografia}) => {

    const [changeStateDialog, setchangeStateDialog] = useState(false);
    const toast = useRef(null);


    const hidechangeStateDialog = () => {
        setchangeStateDialog(false);
    }

    //esta funcion muestra la ventana de "está seguro de borrar?"
    const confirmChangeState = () =>{
        setchangeStateDialog(true);
    }

    //funcion para cambiar el estado de un usuario
    const deleteFoto = () => {
            const servicioFotografia = new ServicioFotografia
            servicioFotografia.deleteFotos(fotografia.idFotografia).then(res=>{
            //Mostrar mensaje de Proceso realizado
            //toast.current.show({ severity: 'warn', summary: '¡Acción Exitosa!', detail: `Registro eliminado exitosamente`, life: 3000 });
            alert('Registro eliminado')
            window.location.reload(true)
        })
        hidechangeStateDialog();
    }

    //La parte inferior de el dialog de borrado, lo mismo de antes y sus dos botones
    const deleteTipoDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hidechangeStateDialog} />
            <Button label="De acuerdo" icon="pi pi-check" className="p-button-text" onClick={deleteFoto} />
        </>
    );



    return(
        <div>
            <div>
                <div className="p-col-12 p-md-4">
                    <div className="product-grid-item card">
                        <div className="product-grid-item-top">
                            <div>
                                <i className="pi pi-image product-category-icon"></i>
                                    <span className="product-category">{fotografia.idFotografia}</span>
                                        </div>
                                    </div>
                                    <div className="product-grid-item-content">
                                    <img style={{width: '60%'}}
                                        src={`${fotografia.urlFotografia}`}
                                        onError={(e) => e.target.src='http://localhost:3005/default.png'}
                                        alt="fotografía de un animal"/>
                                    </div>
                                    <div className="product-grid-item-bottom">
                                        <Button className="p-button-danger" icon="pi pi-trash" label="Eliminar fotografía" onClick={confirmChangeState}></Button>
                                    </div>
                                </div>
                        </div>
            </div>

            <Dialog visible={changeStateDialog} style={{ width: '450px' }} header="¡Cuidado!" modal footer={deleteTipoDialogFooter} onHide={hidechangeStateDialog}>
                        <div className="flex align-items-center justify-content-center" style={{color:'var(--yellow-700)' }}>
                            <i className="pi pi-exclamation-triangle mr-3 " style={{ fontSize: '3rem' }} />
                            {<span>¿Está seguro de eliminar el registro?</span>}
                        </div>
            </Dialog>
        </div>
    )
}

export default CardFoto
