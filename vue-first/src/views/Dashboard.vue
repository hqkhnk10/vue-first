<template>
<div>
    <button @click="abc"></button>
    <button @click="addLocal"></button>
</div>
</template>
<script>
export default{
    methods:{
        addLocal(){
            
        },
        abc(){
            console.log(localStorage)
            for (var i = 0; i < localStorage.length; i++){
    console.log((localStorage.key(i)));
}

        }
    }
}
</script>
