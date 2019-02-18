
<template>
        <div class="container-fluid mt-1">

        <div class="row">
            <div class="col-md-3 col-sm-3 ">
                <perfilPropio></perfilPropio>
            </div>
            <div class="col-md-6 col-sm-6">
                    <misestadisticas></misestadisticas>
                    <strPostear :getposts="getPosts"></strPostear>
                   <div class="teal lighten-4">
                       <div v-for="posts of miperfil_posts" :key="posts + '-primero'">
                       <div v-if="posts.esREPOST == 0">
                            <formatoPost :post="posts"></formatoPost>  
                       </div>
                        <div v-else-if="posts.esREPOST==1">
                            <formatoRePost  :post="posts"></formatoRePost>
                        </div>
                   </div>
                   </div>
            </div>
            <div class="col-md-3 col-sm-3 ">
                <perfilesRecomendados> </perfilesRecomendados>
            </div>
        </div>
</div>
</template>

<script>
import perfilesRecomendados from './mod_PerfilesRecomendados.vue';
import perfilPropio from './mod_PerfilPropio.vue';
import misestadisticas from './mod_MisEstadisticas.vue';
import posts from './mod_MiPerfil_posts.vue';
import reposts from './mod_MiPerfil_reposts.vue';
import postear from './mod_postear.vue';
export default
{
     	components: {
        'perfilesRecomendados': perfilesRecomendados,
        'perfilPropio': perfilPropio,
        'misestadisticas':misestadisticas,
        'formatoPost':posts,
        'formatoRePost':reposts,
        'strPostear': postear
    },
    data(){
        return{
            miperfil_posts:[],
            estados:this.estados
        }
    },
    created()
    {
        this.getPosts()
    },
    methods:
    {
        getPosts(){
            fetch("/getPostsMiPerfil")
            .then(res=>res.json())
            .then(data=>
            {
                this.miperfil_posts = data;
            });
        }
    }

}
</script>

