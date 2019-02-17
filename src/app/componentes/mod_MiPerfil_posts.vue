<template>
    <div class="card">
<div class="card-body grey lighten-5">
    <div class="col-md-11">
            <div class="card border-0 bg-transparent">
                <div class="card-body p-0">
                    <div class="col-md-12 p-0">
                        <div class="col-md-12 p-0">
                            <div class="row">
                                <div class="col-md-2  col-sm-2  col-3 p-0">
                                    <img :src="'/img/'+post.perfil_img" class="w-75 rounded-circle" alt="">   
                                </div>
                                <div class="col-md-10  col-sm-10 col-9">
                                    <div class="row">
                                        <a :href="'/perfiles/'+post.usuario" :key="usuario+'-post_perfil_1'" class="black-text mr-2"><h6>{{post.nombre}}</h6></a>
                                        <label for="" class="text-muted ml-0 p-0 m-0" :key="usuario+'-post_perfil_2'" >@{{post.usuario}}</label>
                                        <small class="ml-3 text-muted">{{post.fecha}}</small>
                                  </div>
                                    <div class="row  "  style="word-break: break-word;">
                                        <p class="d-inline-block " style="">{{post.texto}}</p>
                                    </div> 
                                    <div class="row text-center">
                                       <div class="col-md-4 col-4 col-sm-4">
                                            <button class="btn btn-default btn-sm"><i class="material-icons black-text" title="favorito"  :key="post.likes">lightbulb_outline</i>{{post.likes}}</button>
                                            </div>
                                            <div class="col-md-4 col-4 col-sm-4">
                                            <button class="btn btn-default btn-sm"><i class="material-icons black-text" title="favorito"  :key="post.likes">favorite</i>{{post.likes}}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    props:['post'],
   data()
   {
       return{
           post: this.post
       }
   },
    methods:{
        
    }
}
</script>

