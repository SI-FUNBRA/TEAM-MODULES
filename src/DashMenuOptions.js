 export class DashMenuOptions {

    optionsMenu(idRol){
        switch (idRol) {
            case 1:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'}
                            ]
                        },
                        {
                            label: "Admin",
                            items:[
                                {label:'Permisos', icon: 'pi pi-fw pi-pencil', to:'/dash/permisos'},
                                {label:'Extra Usuarios', icon:'pi pi-fw pi-th-large', to:'/dash/otrosmodulos'},
                                {label:'Paises y Ciudades', icon:'pi pi-fw pi-globe', to:'/dash/otrosmodulosPaisCiudad'}
                            ]
                        },
                        {
                            label: 'Modulos',
                            items: [
                                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/dash/usuarios'},
                                {label:'Donacion Economica', icon:'pi pi-fw pi-money-bill', to:'/dash/donacionEconomica'},
                                {label:'Donacion Especie', icon:'pi pi-fw pi-wallet', to:'/dash/donacionEspecie'},
                                {label:'Cita', icon:'pi pi-fw pi-wallet', to:'/dash/cita'},
                                {label:'Sede', icon:'pi pi-fw pi-wallet', to:'/dash/sede'},

                                {label:'Solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/dash/solicitudesAdopcion'},
                                {label:'Documentos de solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/dash/documentoSolicitud'},
                                {label:'Animales', icon:'pi pi-fw pi-twitter', to:'/dash/animal'},
                                {label:'Tipos de animal', icon:' pi-fw pi-th-large', to:'/dash/tipoAnimal'},
                                {label:'Enfermedades', icon:'pi pi-fw pi-clone', to:'/dash/enfermedad'},
                                {label:'Tratamientos', icon:'pi pi-fw pi-heart', to:'/dash/tratamiento'},
                                {label:'Fotografia', icon:'pi pi-fw pi-heart', to:'/dash/fotografia'}
                            ]
                        }
                    ];
            case 2:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'}
                            ]
                        },
                        {
                            label: 'Modulos',
                            items: [
                                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/dash/usuarios'},
                                {label:'Donacion Economica', icon:'pi pi-fw pi-money-bill', to:'/dash/donacionEconomica'},
                                {label:'Donacion Especie', icon:'pi pi-fw pi-wallet', to:'/dash/donacionEspecie'},
                                {label:'Cita', icon:'pi pi-fw pi-wallet', to:'/dash/cita'},
                                {label:'Sede', icon:'pi pi-fw pi-wallet', to:'/dash/sede'},

                                {label:'Solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/dash/solicitudesAdopcion'},
                                {label:'Documentos de solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/dash/documentoSolicitud'},
                                {label:'Animales', icon:'pi pi-fw pi-twitter', to:'/dash/animal'},
                                {label:'Tipos de animal', icon:' pi-fw pi-th-large', to:'/dash/tipoAnimal'},
                                {label:'Enfermedades', icon:'pi pi-fw pi-clone', to:'/dash/enfermedad'},
                                {label:'Tratamientos', icon:'pi pi-fw pi-heart', to:'/dash/tratamiento'},
                                {label:'Fotografia', icon:'pi pi-fw pi-heart', to:'/dash/fotografia'}
                            ]
                        }
                    ];

            default:
                return [
                        {
                            label: 'Principal',
                            items: [
                                {label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash'},
                                {label:'Perfil', icon: 'pi pi-fw pi-id-card', to:'/dash/perfil'},
                                {label:'Sede', icon:'pi pi-fw pi-wallet', to:'/dash/sede'}
                            ]
                        }
                ]
        }
    }

}
