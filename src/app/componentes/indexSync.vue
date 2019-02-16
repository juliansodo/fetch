<template>
    <div class="container-fluid">
        <div class="row mt-1">
            <div class="col-md-3 p-2">
                <perfilPropio></perfilPropio>
            </div>
            <div class="col-md-6 mx-auto border teal lighten-3 p-4 ">
              <div class="container-fluid p-0">
                    <form  class="form-group p-0" @submit.prevent="Postear">
                    <textarea name="txtPost"  placeholder="Cuéntanos algo..." v-model="post.post" id="" width="100%" class="form-control" rows="4" style="resize:none;"></textarea>
                    <button class="btn duro btn-block teal white-text mt-2 "  >POSTEAR</button>
                </form>
              </div>
                    <div v-for="post of vista_posts" :key="post + '-first'">
                      
                        <div v-if="post.esREPOST === 0" :key="post + '-second'">
                            <div class="card">
                                <div class="card-body grey lighten-5 pb-0   ">
                                    <div class="col-md-11">
                                            <div class="card border-0 bg-transparent">
                                            <div class="card-body p-0">
                                                <div class="col-md-12 p-0">
                                                    <div class="col-md-12 p-0">
                                                        <div class="row">
                                                            <div class="col-md-2  col-sm-2  col-3 p-0">
                                                                <img  v-bind:src="'/img/' + post.perfil_img" class="w-75 rounded-circle" alt="">   
                                                            </div>
                                                            <div class="col-md-10  col-sm-10 col-9">
                                                                <div class="row">
                                                                        <a  :key="post.usuario + '-first'" v-bind:href="'/perfiles/' + post.usuario" class="black-text mr-2"><h6 :key="post.nombre + '-first'">{{post.nombre}}</h6></a>
                                                                        <label for="" class="text-muted ml-0 p-0 m-0"  :key="post.usuario + '-second'" >@{{post.usuario}}</label>
                                                                        <small class="ml-3 mt-0 text-muted" :key="post.fecha + '-first'">{{post.fecha}}</small>
                                                                    </div>
                                                                    <div class="row  "  style="word-break: break-word;">
                                                                        <p class="d-inline-block " style=""  :key="post.texto">{{post.texto}}</p>
                                                                    </div>
                                                                    <div class="row text-center">
                                                                    <div class="col-md-4 col-4 col-sm-4">
                                                                    <button class="btn btn-default btn-sm" :key="post.shares"><i class="material-icons  black-text" title="repostear">lightbulb_outline</i>{{post.shares}}</button>
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
                        </div>
                        <div v-else-if="post.esREPOST === 1" :key="post  + '-first'">
                            <div class="card">
                                <div class="card-body grey lighten-3 p-1">
                                    <div class="card-title text-center">
                                        <small for="" class="text-muted" :key="post.nombre_reposteador  + '-first'">{{ post.nombre_reposteador }}</small>
                                    </div>
                                    <div class="col-md-11  mx-auto">
                                        <div class="card">
                                            <div class="card-body p-0">
                                                <div class="col-md-12 p-0">
                                                    <div class="col-md-12 p-0">
                                                        <div class="row  p-2">
                                                            <div class="col-md-2  col-sm-2  col-3 ">
                                                                <img v-bind:src="'/img/' + post.perfil_img" :key="post.perfil_img  + '-first'" class="w-75 rounded-circle" alt="">   
                                                            </div>
                                                            <div class="col-md-10  col-sm-10 col-9">
                                                                <div class="row ">
                                                                    <a h v-bind:href="'/perfiles/' + post.usuario" :key="post.usuario  + '-first'" class="black-text mr-2"><h6 :key="post.nombre  + '-first'">{{ post.nombre }}</h6></a>
                                                                    <label for="" class="text-muted ml-0 p-0 m-0" :key="post.usuario  + '-second'">@{{post.usuario}}</label>
                                                                    <small class="ml-3 text-muted" :key="post.fecha  + '-first'">{{post.fecha}}</small>
                                                                </div>
                                                                <div class="row  "  style="word-break: break-word;">
                                                                <p class="d-inline-block " style="" :key="post.texto  + '-first'">{{post.texto}}</p>
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
                        </div>
                </div>
                
                <!--SI EL POST NO ES UN RE-POST -->

            </div>
           
            <div class="col-md-3 p-2">
            
              <perfilesRecomendados></perfilesRecomendados>
            </div>
        </div>
    </div>
</template>

<script>

class Post{
    constructor(texto)
    {
        this.post = texto;
        this.post = "";
    }
}

import perfilesRecomendados from './mod_PerfilesRecomendados.vue';
import perfilPropio from './mod_PerfilPropio.vue';
export default
{
     	components: {
        'perfilesRecomendados': perfilesRecomendados,
        'perfilPropio': perfilPropio
	},
        data()
        {
            return {
                post: new Post(),
                vista_posts : []
            }
        },
        created()
        {
            this.verPosts()
        },
        methods: 
        {
            Postear()
            {
                fetch('/post',
                {
                    method: 'POST',
                    body: JSON.stringify(this.post),
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                this.post = new Post();
                this.verPosts()
            },
            verPosts()
            {
                fetch("/cargarPosts")
                .then(res => res.json())
                .then(data => 
                {
                    this.vista_posts = data
                    //no se muestra la vista
                });
            }
        }
}
</script>

