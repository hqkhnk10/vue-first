<template>
<div>
    <h1>Unauthorize</h1>
<el-button type="primary" icon="el-icon-arrow-left" @click="navigate">Previous Page</el-button>

    </div>
</template>

<script>
import router from '../routes';
export default {
    methods: {
        navigate() {
                router.go(-1);
        },}
}
</script>