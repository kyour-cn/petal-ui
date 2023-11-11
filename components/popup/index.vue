<template>
    <view
        class="petal-popup-overlay"
        v-show="offset !== -props.height"
        :style="{
            zIndex: props.zIndex,
            background: 'rgba(0, 0, 0,'+((1 - (Math.abs(offset)/height)) * 0.5)+')'
        }"
        @click="onClickOverlay"
    >
        <view
            class="petal-popup"
            :style="style"
            @click.stop=""
        >
            <view class="petal-popup-body">
                <slot name="default"/>
            </view>
        </view>
    </view>
</template>

<script setup>

import {computed, ref, watch} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";
import {normalizePadding2} from "../../lib/utils.js"

const puiStore = usePetalUiStore()

const props = defineProps({
    // 弹出层是否显示
    modelValue: {
        type: Boolean,
        default: 0
    },
    // 弹出层高度
    height: {
        type: Number,
        default: 500
    },
    // 弹出层宽度 -1表示自适应
    width: {
        type: Number,
        default: -1
    },
    // 点击遮罩层是否关闭弹出层
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
    // 弹出位置
    position: {
        type: String,
        default: 'center'
    },
    padding: {
        type: [Number, Array],
        default: 20
    },
    zIndex: {
        type: Number,
        default: 1000
    }
})

const emits = defineEmits([
    'update:modelValue',
    // 打开关闭状态变化
    'change',
    // 点击遮罩层
    'clickOverlay'
])

const value = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value)
})

watch(value, () => {
    move()
    emits('change', value.value)
})

// 动画位移
let offset = ref(value.value ? 0 : -props.height)

// 移入移出位移动画
const move = () => {
    setTimeout(() => {
        offset.value = value.value ? offset.value + 10 : offset.value - 10
        if (value.value && offset.value >= 0) {
            offset.value = 0
        } else if (!value.value && offset.value <= -props.height) {
            offset.value = -props.height
        } else {
            move()
        }
    }, 5)
}

// 点击遮罩层
const onClickOverlay = () => {
    if (props.closeOnClickOverlay) {
        value.value = false
    }
    emits('clickOverlay')
}

const style = computed(() => {
    const obj = {
        height: props.height + 'rpx',
        background: puiStore.theme['bg-popup']
    }

    // 如果是中间弹出，使用透明度渐入渐出
    if (props.position === 'center') {
        obj.opacity = 1 - Math.abs(offset.value) / props.height
    }

    // 边距
    let padding = props.padding
    if (!Array.isArray(props.padding)) {
        padding = [padding]
    }
    padding = normalizePadding2(padding)

    // 宽度
    if (props.width > 0) {
        obj.width = props.width + 'rpx'
    } else {
        obj.width = 'calc(100% - ' + (padding[1] + padding[3]) + 'rpx)'
    }

    // 适配不同位置的样式
    switch (props.position) {
        case 'top':
            obj.top = offset.value + 'rpx'
            obj.borderRadius = '0 0 40rpx 40rpx'
            padding[0] = 0
            break;
        case 'bottom':
            obj.bottom = offset.value + 'rpx'
            obj.borderRadius = '40rpx 40rpx 0 0'
            padding[2] = 0
            break;
        case 'center':
        default:
            obj.top = 'calc(50% - ' + (props.height / 2) + 'rpx)'
            obj.borderRadius = '40rpx'
            break;
    }
    obj.margin = padding.join('rpx ') + 'rpx'
    return obj
})

</script>

<style scoped>
.petal-popup-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.petal-popup {
    position: fixed;
    width: 100%;
}

.petal-popup-body {
    padding: 20rpx;
}

</style>
