<script setup>
import {usePetalUiStore} from "../../stores/petal-ui";
const puiStore = usePetalUiStore()

const props = defineProps({
    show: Boolean,
    disabled: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'update:show'
])

</script>

<template>

    <view class="petal-popover">
        <slot name="content" />
    </view>

</template>

<style scoped>

</style>