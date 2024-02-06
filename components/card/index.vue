<script setup>

import {computed} from "vue"
import {usePetalUiStore} from "../../stores/petal-ui"
import {normalizePaddingString} from "../../lib/utils"

const puiStore = usePetalUiStore()

const props = defineProps({
    background: {
        type: String,
        default: 'bg-body'
    },
    round: {
        type: Number,
        default: 20
    },
    width: {
        type: Number,
        default: -1
    },
    height: {
        type: Number,
        default: -1
    },
    padding: {
        type: Number,
        default: 20
    },
    margin: {
        type: [Number, Array, String],
        default: 20
    },
    _style: {
        type: Object,
        default: () => ({})
    }
})

const style = computed(() => {

    const obj = {
        borderRadius: props.round + 'rpx',
        background: puiStore.theme[props.background] || props.background,
        padding: props.padding + 'rpx',
        ...props._style
    }

    if (props.width >= 0) {
        obj.width = props.width + 'rpx'
    }
    if (props.height >= 0) {
        obj.height = props.height + 'rpx'
    }
    if (props.margin) {
        obj.margin = normalizePaddingString(props.margin)
    }
    return obj
})

</script>

<template>
    <view
        :style="style"
    >
        <slot name="default" />
    </view>
</template>
