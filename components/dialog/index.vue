<script setup>

import PuiButton from "../button/index.vue";
import {computed, nextTick, ref, watch} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    // 是否显示弹出层(双向绑定)
    show: {
        type: Boolean,
        default: false
    },
    // 弹出层标题
    title: {
        type: String,
        default: '提示'
    },
    // 弹出层内容
    content: {
        type: String,
        default: ''
    },
    // 弹出层操作按钮
    actions: {
        type: Array,
        default: () => []
    },
    // 点击遮罩层是否关闭弹出层
    closeOnClickOverlay: {
        type: Boolean,
        default: true
    },
})

const emits = defineEmits([
    'update:show',
    // 点击遮罩层
    'clickOverlay',
    // 点击操作按钮
    'action'
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

// 操作按钮
const actionBtn = computed(() => {
    // 默认按钮样式
    const defaultBtn = {
        color: puiStore.theme.primary,
        background: 'transparent'
    }

    const buttons = [];
    for(let i in props.actions) {
        const item = props.actions[i]
        if(typeof item === 'string') {
            buttons.push({
                text: item,
                ...defaultBtn,
            })
        } else {
            buttons.push({
                ...defaultBtn,
                ...item
            })
        }
    }
    return buttons
})

const onClickAction = (index, action) => {
    emits('action', index, action)
}

// 监听show变化
watch(show, onChangeShow)

const style = computed(() => {
    return {
        dialog: {
            marginBottom: puiStore.windowInfo.safeAreaInsets.bottom + 'px',
        },
        content: {
            background: puiStore.theme['bg-body'],
            color: puiStore.theme['title']
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
            <view
                v-if="props.title"
                class="petal-dialog-title"
            >
                <text>{{ props.title }}</text>
            </view>
            <slot name="default">
                <view
                >{{ props.content }}</view>
            </slot>
            <!-- action slot -->
            <slot name="action">
                <view
                    v-if="actionBtn.length"
                    class="petal-dialog-action"
                >
                    <view
                        :class="[
                            'petal-dialog-btn',
                            {'petal-dialog-btn-line': !puiStore.dark && index < actionBtn.length - 1},
                            {'petal-dialog-btn-line-dark': puiStore.dark && index < actionBtn.length - 1}
                        ]"
                        v-for="(item, index) in actionBtn"
                        :key="index"
                        :style="item?.style"
                    >
                        <PuiButton
                            block
                            :color="item.color"
                            :background="item.background"
                            @click="onClickAction(index, item)"
                        >{{item.text}}</PuiButton>
                    </view>
                </view>
            </slot>
        </view>
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

.petal-dialog-action {
    display: flex;
    flex-direction: row;
    margin-top: 20rpx;
}

.petal-dialog-btn {
    flex: 1;
    padding: 0 10rpx;
}
.petal-dialog-btn-line {
    border-right: 1px solid #CECECE;
}
.petal-dialog-btn-line-dark {
    border-right: 1px solid #4C4D4F;
}

</style>