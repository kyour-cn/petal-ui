<script setup>

import {computed, nextTick, ref, watch} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '提示'
    },
    content: {
        type: String,
        default: '提示内容'
    },
    // confirmText: {
    //     type: String,
    //     default: '确定'
    // },
    // cancelText: {
    //     type: String,
    //     default: '取消'
    // },
    // confirmColor: {
    //     type: String,
    //     default: '#007AFF'
    // },
    // cancelColor: {
    //     type: String,
    //     default: '#999999'
    // },
    // 点击遮罩层是否关闭弹出层
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
})

const emits = defineEmits([
    'update:show',
    // 点击遮罩层
    'clickOverlay'
])

const show = computed({
    get: () => props.show,
    set: (value) => emits('update:show', value)
})

// 隐藏动画中暂时保留内容显示
const closeIng = ref(false)

// 点击遮罩层
const onClickOverlay = () => {
    if (props.closeOnClickOverlay) {
        show.value = false
    }
    emits('clickOverlay')
}

// 创建动画
const animation = uni.createAnimation({
    duration: 500, // 动画持续时间，单位 ms
    timingFunction: 'ease', // 动画缓动函数
    delay: 0 // 动画延迟时间，单位 ms
});

// 将动画应用到 dialog 元素上
const animationData = ref({})

const onChangeShow = (value) => {
    // 显示隐藏动画
    nextTick(() => {
        if (value) {
            // 显示动画
            animationData.value = animation.translateY('0%').step().export()
        } else {
            // 避免动画还未完成就已经隐藏
            closeIng.value = true
            setTimeout(() => {
                closeIng.value = false
            }, 600)
            // 隐藏动画
            animationData.value = animation.translateY('100%').step().export()
        }
    })
}

// 监听show变化
watch(show, onChangeShow)

const style = computed(() => {
    return {
        dialog: {
            marginBottom: puiStore.windowInfo.safeAreaInsets.bottom + 'px',
        },
        content: {
            background: puiStore.theme['bg-body']
        }
    }
})

nextTick(() => {
    // 如果show默认为true，显示动画
    if (show.value) {
        onChangeShow(true)
    }
})

</script>

<template>
    <view v-if="show" class="petal-dialog-overlay" @click.stop="onClickOverlay"/>
    <view
        v-show="show || closeIng"
        :animation="animationData"
        class="petal-dialog"
        :style="style.dialog"
    >
        <view
            class="petal-dialog-content"
            :style="style.content"
        >
            <view v-if="props.title" class="petal-dialog-title">
                <text>{{ props.title }}</text>
            </view>
            <slot name="default">
                <view>{{ props.content }}</view>
            </slot>
        </view>
        <!-- action slot -->
        <slot name="action">
            <view
                class="petal-dialog-action"
            >
                <!-- TODO: action button -->
            </view>
        </slot>
    </view>
</template>

<style scoped>

.petal-dialog-overlay {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1000;
}

.petal-dialog {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1001;
    transform: translateY(100%);
}

.petal-dialog-title {
    padding-bottom: 20rpx;
    font-size: 40rpx;
    font-weight: bold;
}

.petal-dialog-content {
    background: white;
    padding: 30rpx;
    margin: 20rpx;
    border-radius: 40rpx;
}

</style>