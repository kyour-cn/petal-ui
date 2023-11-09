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
                <slot name="default">
                    {{style}}
                </slot>
            </view>
        </view>
    </view>
</template>

<script setup>

import {computed, ref, watch} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    // 弹窗是否显示
    modelValue: {
        type: Boolean,
        default: 0
    },
    // 弹窗高度
    height: {
        type: Number,
        default: 500
    },
    // 点击遮罩层是否关闭弹窗
    closeOnClickOverlay: {
        type: Boolean,
        default: true
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
let offset = ref(value.value? 0 : -props.height)

const move = () => {
    setTimeout(() => {
        offset.value = value.value ? offset.value + 10 : offset.value - 10
        if (value.value && offset.value >= 0) {
            offset.value = 0
        }else if(!value.value && offset.value <= -props.height) {
            offset.value = -props.height
        }else{
            move()
        }
    }, 5)
}

const onClickOverlay = () => {
    if (props.closeOnClickOverlay) {
        value.value = false
    }
    emits('clickOverlay')
}

// 位置
const style = computed(() => {
    return {
        height: props.height + 'rpx',
        bottom: offset.value + 'rpx',
        background: puiStore.theme['bg-popup']
    }
})

</script>

<style scoped>
.petal-popup-overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.petal-popup {
    border-radius:  40rpx 40rpx 0 0;
    position: fixed;
    width: 100%;
}
.petal-popup-body {
    padding: 20rpx;
}

</style>
