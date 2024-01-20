<script setup>

const props = defineProps({
    width: {
        type: Number,
        default: 0
    },
    col: {
        type: Number,
        default: 5
    }
})

</script>

<template>
    <view
        class="petal-grid"
        :style="{
            gridTemplateColumns: `repeat(${props.col}, 1fr)`
        }"
    >
        <slot name="default"></slot>
    </view>
</template>

<style scoped>

.petal-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

</style>