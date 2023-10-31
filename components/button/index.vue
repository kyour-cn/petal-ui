<template>
    <button
        :class="classList"
        :style="style"
        :disabled="props.disabled"
        @click="onClick"
        @touchstart="onTouchStart"
        @touchend="onTouchEnd"
    >
        <slot name="default">
            <text v-text="props.text"></text>
        </slot>
    </button>
</template>

<script setup>

import {computed, defineProps, ref} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    text: {
        type: String,
        default: '按钮'
    },
    block: {
        type: Boolean,
        default: false
    },
    round: {
        type: Number,
        default: -1
    },
    width: {
        type: Number,
        default: -1
    },
    height: {
        type: Number,
        default: -1
    },
    fontSize: {
        type: Number,
        default: -1
    },
    fontColor: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'normal'
    },
    color: {
        type: String,
        default: ''
    },
    background: {
        type: String,
        default: 'primary'
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    "click",
    "touchstart",
    "touchend"
]);

const onClick = () => {
    emits('click')
}
const onTouchStart = () => {
    isHover.value = true
    emits('touchstart')
}
const onTouchEnd = () => {
    isHover.value = false
    emits('touchend')
}

const sizeMap = {
    "mini": {w: 0, h: 40, fontSize: 16, round: 20},
    "small": {w: 0, h: 60, fontSize: 22, round: 30},
    "normal": {w: 0, h: 80, fontSize: 32, round: 40},
    "large": {w: 0, h: 100, fontSize: 40, round: 50}
}

const sizeObj = computed(() => {
    let fontSize = (props.fontSize === -1 ? sizeMap[props.size].fontSize : props.fontSize)
    return {
        w: props.width === -1 ? 'auto' : props.width + 'rpx',
        h: (props.height === -1 ? sizeMap[props.size].h : props.height) + 'rpx',
        fontSize: fontSize + 'rpx',
        round: (props.round === -1 ? sizeMap[props.size].round : props.round) + 'rpx',
        padding: fontSize + 'rpx'
    }
})

let isHover = ref(false);

const classList = computed(() => {
    const list = [
        'petal-btn'
    ]

    if (isHover.value) {
        list.push('petal-btn-hover')
    }
    if (props.disabled) {
        list.push('petal-btn-disabled')
    }
    return list
})

const style = computed(() => {

    let color = props.color || 'white',
        background = puiStore.theme[props.background] || props.background;

    if (puiStore.theme[color]) {
        color = puiStore.theme[color]
    }

    return {
        color: color,
        background: background,
        fontSize: sizeObj.value.fontSize,
        padding: '0 ' + sizeObj.value.padding,
        borderRadius: sizeObj.value.round,
        height: sizeObj.value.h,
        width: sizeObj.value.w,
        lineHeight: sizeObj.value.h,
        fontWeight: 700,
        display: props.block ? 'block' : 'inline-block',
    }
})

</script>

<style scoped>

.petal-btn {
    text-align: center;
}

.petal-btn-hover {
    opacity: 0.7;
}

.petal-btn-disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

</style>