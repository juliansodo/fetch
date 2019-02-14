import Vue from 'vue';
import indexSync from './componentes/indexSync.vue';
import indexNoSync from './componentes/indexNoSync.vue';
new Vue({
    render: h => h(indexSync)
}).$mount("#indexSync");


new Vue({

    render: h => h(indexNoSync)
}).$mount("#indexNoSync");

