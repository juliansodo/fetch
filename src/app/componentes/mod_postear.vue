<template>
        <div class="container-fluid p-0  teal lighten-3">
<div class="card">
    <div class="card-body">
            <form  @submit.prevent="Postear" method="post" class="form-group">
                <div class="p-0">
                <textarea v-model="post.post" name="post" class="form-control" id="" style="resize: none; overflow: hidden; " cols="6" rows="2" placeholder="Cuéntanos algo..." maxlength="200"></textarea>
                </div>   
                <div class="row float-right ">
                    <label v-if="post.post.trim().length>180" class="text-danger mt-3 mb-0">El post no puede superar los 180 caracteres.</label>
                <button class="btn teal duro text-white mt-1" :class="{'disabled':post.post.trim().length==0 || post.post.trim().length>180}">POSTEAR</button>
                </div>
            </form> 
    </div>
</div>
</div>
</template>


<script>
class Post{
    constructor(texto)
    {
        this.post=texto;
        this.post="";
        
    }
}
export default {
    props:['getposts'],
    data()
    {
        return{
            post: new Post(),
            getposts:this.getposts
        }
    },
    methods:
    {
        Postear()
        {
        if(this.post.post.length<=0 && this.post.post.length>180){return;}
        fetch("/post",
            {
                method:'post',
                body:JSON.stringify(this.post),
                headers:
                {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            this.getposts();
            this.post = new Post();
        }
    }
}
</script>
