<template>
    <div style="width: 100%; height: 100vh; padding: 20px;">
        <mavon-editor class="mavon" codeStyle="atom-one-dark" v-model="data" :ishljs="true" ref="md" />
    </div>
</template>

<script>
export default {
    // data() {
    //     return {
    //         data: '',
    //     };
    // },
}
</script>

<style lang="scss">
.mavon {
    height: 100% !important;
}

.v-note-show {
    pre {
        background: transparent !important;
    }

    pre:has(.lang-language) {
        background: #f6f8fa !important;
    }
}

.v-show-content {
    ul {
        li {
            list-style-type: disc;
        }
    }
}
</style>