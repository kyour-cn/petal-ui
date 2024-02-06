<script setup>

import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";

const puiStore = usePetalUiStore()

const props = defineProps({
    // 背景
    background: {
        type: String,
        default: 'bg-page'
    },
    _style: {
        type: Object,
        default: {}
    }
})

const style = computed(() => {
    const {background, _style} = props

    return {
        minHeight: '100%',
        background: puiStore.theme[background] || background,
        ..._style
    }
})

</script>

<template>
    <view :style="style">
        <slot name="default"/>
    </view>
</template>

