<template>
    <div class="bdc__header">
        <h2>{{ headers.title }}</h2>
        <div class="bdc__header-content-msg">
            <span class="fa fa-hashtag">{{ headers.tag }}</span>
            <span class="fa fa-clock-o">{{ headers.createTime }}</span>
            <span class="fa fa-eye">{{ headers.views }}</span>
            <span class="fa fa-comments-o">{{ headers.comments }}</span>
        </div>
        <em v-if="headers.type === '原创'">{{ statement }}</em>
        <hr />
    </div>
</template>

<script>
export default {
    name: 'ContenHeader',
    props: {
        headers: {
            type: Object,
            required: true,
            default: function () {
                return {};
            },
        },
    },
    data() {
        return {
            statement: '版权声明：本文为博主原创文章，转载请说明来源',
        };
    },
};
</script>

<style scoped>
.bdc__header {
    width: 100%;
    height: max-content;
    user-select: none;
}

.bdc__header h2 {
    color: var(--color-text-default);
    max-width: 90%;
    font-size: 36px;
}

.bdc__header .bdc__header-content-msg {
    margin-top: 5px;
    height: 45px;
    color: #a0a0a0;
    /* text-indent 属性规定文本块中首行文本的缩进。 */
    text-indent: 6px;
    font-size: 1rem;
    display: flex;
    align-items: center;
}

.bdc__header .bdc__header-content-msg span {
    padding-right: 10px;
}

.bdc__header-content-msg span::before {
    margin-right: 5px;
}

.bdc__header em {
    display: block;
    text-indent: 4px;
    color: var(--marked-color);
    font-size: 18px;
}

.bdc__header hr {
    margin: 1rem 0;
    /* border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1); */
}
</style>
