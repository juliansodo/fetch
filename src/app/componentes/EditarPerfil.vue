<template>
    <div class="container">
        <div class="card">
            <div class="card-header text-center p-2 teal lighten-1 text-white">
                <div class="title">
                    <h2 class="duro">Editar perfil</h2>
                </div>
            </div>
            <div class="card-body  teal lighten-3">
                <div class="col-md-5 mx-auto  ">
                    <div class="row">
                        <form action="/setEditarPerfil" method="POST" class="row"  enctype="multipart/form-data">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="duro">Usuario</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">@</div>
                                        </div>
                                        <input type="text" class="form-control" autocomplete="off"  v-model="vista_perfil.usuario" name="usuario" maxlength="12" placeholder="Usuario">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text   p-0 m-0"><span v-if="vista_perfil.usuario.length>0 || vista_perfil.usuario.length>13"><i class="material-icons green-text">check</i></span> <span class="text-danger" v-if="vista_perfil.usuario.length<=0 || vista_perfil.usuario.length>14"><i class="material-icons red-text">close</i></span></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">Contraseña</label>
                                    <input type="password" name="clave" autocomplete="off" placeholder="Contraseña" class="rounded-0 form-control">
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">Apodo</label>
                                    <input type="text" name="fullname" :value="this.vista_perfil.nombre" class="form-control rounded-0" placeholder="Apodo">
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">E-mail</label>
                                    <input type="email" name="email" v-model="vista_perfil.email" class="form-control rounded-0" placeholder="Email" >
                                </div>
                                   <div class="form-group">
                                    <label class="duro">Género</label>
                                    <select  v-model="vista_perfil.genero" name="genero" id="generos" class="form-control">
                                        <option value="0">Sin Especificar</option>
                                        <option value="1">Masculino</option>
                                        <option value="2">Femenino</option>
                                        <option value="3">Otro</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="" class="duro">Fecha de nacimiento</label>
                                    <input type="date" name="fechaNacimiento" v-model="vista_perfil.fechaNacimiento" class="form-control rounded-0" >
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">Sitio web</label>
                                    <input type="url" name="web" v-model="vista_perfil.web" class="form-control rounded-0" placeholder="Sitio web" >
                                </div>
                                <div class="form-group bg-transparent">
                                    <label for="" class="duro">Foto de perfil</label>
                                    <div class="custom-file">
                                        <input type="file"  class="custom-file-input" name="image" accept="image/x-png,image/gif,image/jpeg" lang="es-AR">
                                        <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
                                    </div>
                                </div>
                                <div class="form-group" >
                                    <label for="" class="duro">HEADER</label>
                                    <textarea v-model="vista_perfil.header" name="header" class="form-control" id="" cols="30" rows="3" style="resize: none; overflow: hidden; " maxlength="60"></textarea>
                                </div>
                                <button class="btn btn-success btn-block">Guardar</button>
                            </div>  
                        </form>
                        <div class="col-md-12">
                            <div v-if="estado.estado!=0" class="alert mt-2" :class="{'alert-success':estado.estado==1, 'alert-danger':!estado.estado==2}" role="alert">
                            {{estado.mensaje}}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
       
</template>
<script>
export default {
    data()
    {
        return{
            models:{usuario:'', nombre:'', header:'', genero:'', email:''},
            vista_perfil:[],
            estado:{
                estado:0,
                mensaje:''
            },
             files: []
        }
    },
    created()
    {
        this.getPerfil()
    },
    methods:
    {
        
        getPerfil()
        {
            fetch("/getEditarPerfil")
            .then(res=>res.json())
            .then(data=>
            {
                this.vista_perfil = data
            })
        },
        
        actualizarPerfil()
        {
            fetch("/setEditarPerfil",
            {
                method:"post",
                  headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(this.vista_perfil)
              
            })
            .then(res => res.json())
            .then(data=>
            {
               this.estado = data;
            })
        }
    }
}
</script>
