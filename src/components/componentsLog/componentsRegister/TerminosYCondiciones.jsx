import React from 'react'

import { Accordion, AccordionTab } from 'primereact/accordion';

const TerminosYCondiciones = () => {
    return (
        <div>
            <Accordion className="accordion-custom" activeIndex={0}>
                <AccordionTab header={<React.Fragment><i className="pi pi-calendar"></i><span> CONDICIONES DE USO</span></React.Fragment>}>
                    <p>
                        Al ingresar, revisar, donar, adoptar o solicitar participacion en la fundacion usted se compromete a leer, informarse y cumplir los términos y condiciones de uso, además se obliga a respetar las políticas de privacidad. De conformidad con la legislación Colombiana sobre el tema, pues el contenido, productos y ofertas que usted encuentra en proyectoadsi2021@gmail.com aplican únicamente para Colombia
                        ZOOPPORT podrá realizar modificaciones en cualquier momento de los términos y condiciones aquí descritas. En todo caso, sí éstos términos y condiciones varían lo informaremos por todos los canales de difusión  para que usted los conozca y acepte nuevamente.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-user"></i><span> INFORMACIÓN DE LOS USUARIOS</span></React.Fragment>}>
                    <p>
                        En nuestro sitio web, de manera sencilla podra encontrar cada apartado para realizar (adopciones, participaciones, donaciones y mas), en la parte de adopciones, abra un campo especifico donde se tendra que llenar una solicitud y de ahi solamente es esperar a que la fundacion continue con el proceso y luego saber como sera el siguiente paso, lo mismo para las participaciones. Para las donaciones; una vez escoge su forma de pago, se puede realiza la donacion, tenemos pago por transferencia bancaria o mediante tarjeta de crédito y Pse con la aplicación Paypal , para tal efecto se requiere de información personal y confidencial. Esta información será de uso exclusivo de ZOOPPORT y no será revelada a terceros, salvo la información que requiera ZOOPPORT para efectos de procesar las transacciones electrónicas de pago.
                        Buscando la seguridad en las transacciones, queda expresamente prohibido a los usuarios el compartir con terceros su contraseña o el password; pues dicha información es de uso exclusivo del usuario y no se podrá utilizar para fines no autorizados.
                        Los datos referidos en estos términos y condiciones tendrán como finalidad validar todas las solicitudes, para mejorar la labor de información y comercialización de los servicios prestados por la fundacion a las personas. Sólo podrán ser conocidos ademas por las empresas filiales o relacionadas con ZOOPPORT  en ningún caso serán traspasados a terceros. Dicha entrega será revocable por el usuario mediante solicitud en nuestro correo proyectoadsi2021@gmail.com o en el PBX 6071235.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> REGISTRO Y CONTRASEÑA</span></React.Fragment>}>
                    <p>
                        El registro de cada usuario se verificará completando y suscribiendo el formulario que se encuentra en el sitio y su posterior envío, el cual se realiza automáticamente pulsando «click» en el elemento respectivo.
                        Una vez registrado el usuario dispondrá de un nombre y contraseña o clave definitiva que le permitirá el acceso personalizado, confidencial y seguro a proyectoadsi2021@gmail.com y podrá cambiar la clave de acceso, para lo cual deberá sujetarse al procedimiento establecido en el sitio respectivo.
                        El usuario es totalmente responsable por el mantenimiento de la confidencialidad de su clave secreta registrada en este sitio web, por medio de la cual podrá efectuar compras, solicitar servicios y obtener información. Dicha clave es de uso personal y su entrega a terceros no involucra responsabilidad de ZOOPPORT, ni de las empresas relacionadas en caso de indebida utilización.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> DERECHOS DEL USUARIO</span></React.Fragment>}>
                    <p>
                        En ZOOPPORT somos respetuosos de los derechos de los consumidores y en nuestras políticas internas tenemos como directriz la aplicación de las leyes referentes a la materia. El usuario gozará de todos los derechos que le reconoce la legislación Colombiana sobre Protección al Consumidor y Protección de Datos personales, por tal razón, podrá radicar sus peticiones, quejas, reclamos y sugerencias (PQRS) a través de las diferentes herramientas y mecanismos de comunicación establecidos por la página.
                        Igualmente, el usuario también podrá presentarlas de manera presencial en nuestra oficina.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> TIEMPOS DE ENVIO</span></React.Fragment>}>
                    <p>
                        Una vez recibamos y sea verificado las solicitudes realizadas en nuestra pagina web, ZOOPPORT imediatamente revisara estas peticiones y via correo electrónico la fundacion contestara a su mensaje con una respuesta concreta, se debe tener en cuenta que la respuesta si llega a demorar, puede ser por tiempo vacacional del personal, o por proteccion de la solicitud, ya que esta aun se esta tratando.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> SOLICITUDES</span></React.Fragment>}>
                    <p>
                        Para poder realizar cualquier solicitud se necesitan tener todos los datos reales a la mano (nos referimos a datos personales) para que asi el proceso sea mas rapido en cuanto a lo que usted necesita, Es importante ademas cumplir con todos los requisitos para que no pierda su solicitud luego, tambien tener la disposicion para poder reunirse con la fundacion tanto via remoto como presencialmente.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> MEDIOS DE PAGO</span></React.Fragment>}>
                    <ol>
                        <li>Consignacion o transferencia Bancolombia</li>
                        <li>
                            Tarjetas de crédito ( Aplican cargos adicionales )  mediante MERCADOPAGO quien es el encargado de procesar la transacción, las franquicias aceptadas son:
                            <ul>
                                <li>VISA</li>
                                <li>AMERICAN EXPRESS</li>
                                <li>MASTERCARD</li>
                                <li>DINERS CLUB</li>
                                <li>CODENSA</li>
                            </ul>
                        </li>
                        <li>Pago en efectivo en tienda o contra entrega en toda colombia</li>
                        <li>Pagos por PSE a través de MERCADO PAGO</li>
                        <li>Personalmente a la fundación</li>
                        <li>Por medio de la solicitud donacion especie</li>
                    </ol>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> NUESTROS SERVICIOS</span></React.Fragment>}>
                    <p>
                        Todo lo realizado en ZOOPPORT es transparente y veloz con nuestro sistema de informacion, por lo cual se te es garantizado que todo sera confiable y podras usar de nuestros servicios cuando tu quieras, bien sean adopciones, participaciones como colaboraciones o donaciones de cualquier tipo.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> TUS DATOS SE MANTENDRÁN BAJO ESTRICTA CONFIDENCIALIDAD</span></React.Fragment>}>
                    <p>
                        proyectoadsi2021@gmail.com usa un sistema de seguridad llamado SSL (Secure Socket Layer), que actualmente es el estándar usado por las compañías más importantes del mundo para realizar transacciones electrónicas seguras bien sea (de dinero o datos importantes en las solicitudes que se enviaran por la pagina), lo que significa que toda tu información personal no podrá ser leída, ni capturada por terceros mientras viaja por la red.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> COMPROMISO CON LA SEGURIDAD</span></React.Fragment>}>
                    <p>
                        En relación a nuestro Sitio proyectoadsi2021@gmail.com ZOOPPORT , hace esta declaración de seguridad y privacidad en orden a demostrar y comunicar su compromiso con una práctica de negocios de alto nivel ético y dotada de los controles internos apropiados. Además hace esta declaración para garantizar el compromiso con la protección de los datos personales de los usuarios del Sitio:
                        Nuestro Sitio está protegido con una amplia variedad de medidas de seguridad, tales como procedimientos de control de cambios, claves y controles de acceso físico. También empleamos otros mecanismos para asegurar que la información y los Datos Personales que usted proporciona no sean extraviados, mal utilizados o modificados inapropiadamente. Esos controles incluyen políticas de confidencialidad y respaldo periódico de bases de datos.
                    </p>
                </AccordionTab>
                <AccordionTab header={<React.Fragment><i className="pi pi-search"></i><span> MAYOR INFORMACIÓN</span></React.Fragment>}>
                    <p>
                        La presente Política rige a partir de su publicación y se entiende vigente durante todo el término de la relación existente entre usted y ZOOPPORT. La presente Política se rige por las leyes de la República de Colombia.
                    </p>
                </AccordionTab>

            </Accordion>
        </div>
    )
}

export default TerminosYCondiciones
