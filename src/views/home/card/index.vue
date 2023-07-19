<template>
    <div class="aside-title-box">
        <div class="sidetips">
            <slot name='title'>默认是信息: 我是title</slot>
        </div>
        <slot name='content'> 默认是信息: 我是content </slot>
    </div>
</template>

<script>
export default {
    name: 'asideCard',
}
</script>

<style>

</style>