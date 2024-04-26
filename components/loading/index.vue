<script setup>

import PuiIcon from "../icon"

const props = defineProps({
    size: {
        type: [Number, String],
        default: 50
    },
    src: {
        type: String,
        default: '//qiniu.kyour.cn/petal-ui/loading.webp'
    }
})

</script>

<template>
    <PuiIcon :name="props.src" :size="props.size" />
</template>
