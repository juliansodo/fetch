<template>
    
    <div class="container">
        <div class="card">
            <div class="card-header text-center p-2 teal lighten-1 text-white">
                <div class="title">
                    <h2 class="duro">Editar perfil</h2>
                </div>
            </div>
            <div class="card-body  teal lighten-3">
        <div class="card-md-12">
            <div class="row ">
                    <div class="col-md-3 ">
                        <form action="/editarPerfil" method="post" class="form-group">
                                <div class="form-group">
                                    <label for="" class="duro">Usuario</label>
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">@</div>
                                        </div>
                                        <input type="text" class="form-control" name="usuario" maxlength="12" placeholder="Usuario" value="<%= usuario.usuario %>">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text">✓</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">Contraseña</label>
                                    <input type="password" name="clave" placeholder="Contraseña" class="rounded-0 form-control">
                                </div>
                                <div class="form-group">
                                    <label for="" class="duro">Apodo</label>
                                    <input type="text" name="fullname" class="form-control rounded-0" placeholder="Apodo" value="<%= usuario.nombre %>">
                                </div>
                                <div class="form-group bg-transparent">
                                        <label for="" class="duro">Foto de perfil</label>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" name="imagen" lang="es-AR">
                                        <label class="custom-file-label" for="customFileLang">Seleccionar Archivo</label>
                                      </div>
                                 </div>
                        </div>
                        <div class="col-md-3 ">
                                    <div class="form-group">
                                        <label for="inputState" class="duro">Género</label>
                                        <select id="inputState" name="genero" class="form-control">
                                          <option selected value="0">No especificar</option>
                                          <option value="1">Masculino</option>
                                          <option value="2">Femenino</option>
                                          <option value="3">Otro</option>
                                        </select>
                                      </div>
                                        <div class="form-group">
                                            <label for="" class="duro">HEADER</label>
                                           <textarea name="header" class="form-control" id="" cols="30" rows="3" style="resize: none; overflow: hidden; " maxlength="60"><%= usuario.header %></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-success">Guardar</button>
                                        <%if (locals.error) {%>
                                            <div class="alert alert-warning" role="alert">
                                                    <%= mensaje %>
                                            </div>
                                        <%}%>
                                    </form>
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
            vista_perfil:[]
        }
    },
    created()
    {
        getPerfil()
    }
}
</script>
