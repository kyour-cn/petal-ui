<template>
    <image
        :src="props.src"
        :mode="props.mode"
        :lazy-load="props.lazyLoad"
        :style="style"
        @error="imageError"
    />
</template>

<script setup>

import {computed} from "vue";

const props = defineProps({
    src: {
        type: String,
        required: true
    },
    width: {
        type: [Number, String],
        default: -1
    },
    height: {
        type: [Number, String],
        default: -1
    },
    radius: {
        type: [Number, String],
        default: 0
    },
    mode: {
        type: String,
        default: "scaleToFill"
    },
    lazyLoad: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'error'
])

const imageError = () => {
    emits('error')
}

const style = computed(() => {
    let obj = {
        borderRadius: typeof props.radius === "number" ? props.radius + "rpx" : props.radius
    }

    if (props.width !== -1) {
        obj.width = typeof props.width === "number" ? props.width + "rpx" : props.width
    }
    if (props.height !== -1) {
        obj.height = typeof props.height === "number" ? props.height + "rpx" : props.height
    }

    return obj
})

</script>

<style scoped>

</style>