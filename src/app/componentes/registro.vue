<template>
    <div class="container-fluid p-5  ">
    <div class="container text-white">
        <div class="col-md-9 mx-auto">
            <div class="card p-3 teal lighten-3">
                <div class="rows">
            <div class="col-md-6 float-left">
            <div class="card-title text-center  border-bottom">
                    <h3 class="duro">Iniciar sesion</h3>
            </div>
            <form method="POST" action="/login" class=" form-group col-md-9 mx-auto">
                <label for="" class="mt-3 duro">Usuario</label>
                <input type="text" name="usuario"  placeholder="Usuario" class="form-control">
                <label for="" class="mt-3  duro">Contraseña</label>
                <input type="password" name="clave" placeholder="Contraseña" class="form-control">
                <button type="submit" class="btn btn-primary text-white btn-block mt-2 duro" >Acceder</button>
              
                    <h6 class="white-text"></h6>
                   
            </form>
            </div>
            <div class="col-md-6 float-right  border-left">
            <div class="card-title border-bottom text-center">
                <h3 class="duro">Registrarse</h3>
            </div>
            <form method="POST" action="/ingreso" class="form-group col-md-9 mx-auto ">
                <label for="" class="mt-3 duro">Usuario</label>
                <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text">@</div>
                        </div>
                        <input type="text" class="form-control" v-on:keyup="validationUser" name="usuario" id="user" placeholder="Usuario">
                      </div>
                <label for="" class="mt-3 duro">Contraseña</label>
                <input type="password"  id="pass" name="clave" v-on:keyup="validationPass"  placeholder="Contraseña" class="form-control">
                <label for=""  class="mt-3 duro">Apodo</label>
                <input type="text " id="apodo" name="fullname" placeholder="Apodo" v-on:keyup="validationUser" class="form-control">
                <label for="" class="mt-3 duro">Genero</label>
                <select id="inputState" name="genero" class="form-control">
                <option selected value="0">No especificar</option>
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
                <option value="3">Otro</option>
              </select>
                <button type="submit" class="btn teal text-white btn-block mt-2 duro" >Registrarse</button>
                
                    <h6 class="white-text"></h6>
               
            </form>
        </div>
    </div>
            </div>
        </div>
    </div>
    
   
</div>
</template>
<script>
export default {
    data(){
        return{

    }
     },
    methods:{
        validationPass(e){
            if(e.target.value.length<=6){
                e.target.classList.add('is-invalid')
                 e.target.classList.remove('is-valid')
            }else{
                e.target.classList.add('is-valid')
                 e.target.classList.remove('is-invalid')
            }
        },
        validationUser(e){
            if(e.target.value.length<=2){
                e.target.classList.add('is-invalid')
                 e.target.classList.remove('is-valid')
            }else{
                e.target.classList.add('is-valid')
                 e.target.classList.remove('is-invalid')
            }
        }
    }
}

</script>
