<template>
    <button @click="$event=> onClick()" :style="{background: color }" class = "btn">{{ text }}</button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String,
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
            console.log('button click')
        }
    }
}
</script>