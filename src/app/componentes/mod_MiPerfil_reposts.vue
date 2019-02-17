<template>
    <div class="card">
<div class="card-body grey lighten-3 p-1">
    <div class="card-title text-center">
        <small for="" class="text-muted" :key="post.nombre + '-repost_perfil_1'">{{post.nombre}} re-posteó</small>
    </div>
    <div class="col-md-11  mx-auto">
            <div class="card">
            <div class="card-body p-0">
            <div class="col-md-12 p-0">
                <div class="col-md-12 p-0">
                    <div class="row  p-2">
                        <div class="col-md-2  col-sm-2  col-3 ">
                            <img :src="'/img/'+post.perfil_img" class="w-75 rounded-circle" alt="">   
                        </div>
                                <div class="col-md-10  col-sm-10 col-9">
                                <div class="row ">
                                    <a :key="post.usuario+'-repost_perfil_2'" :href="'/perfiles/' + post.usuario" class="black-text mr-2"><h6 :key="post.nombre+'-repost_perfil_2'" >{{post.nombre}}</h6></a>
                                    <label :key="post.usuario+'-repost_perfil_1'" for="" class="text-muted ml-0 p-0 m-0">@{{post.usuario}}</label>
                                    <small :key="post.fecha+'-repost_perfil_1'" class="ml-3 text-muted">{{post.fecha}}</small>
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
