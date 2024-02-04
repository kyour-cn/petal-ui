<script setup>

import {computed} from "vue";

import {usePetalUiStore} from "../../stores/petal-ui";
import PuiIcon from "../icon/index.vue";

const puiStore = usePetalUiStore()

// 判断是否是小程序
const isMp =
    // #ifdef MP
    true
    // #else
    false
    // #endif

// 获取小程序右上角按钮位置
let mpBtnRight
// #ifdef MP
let mpBtn = uni.getMenuButtonBoundingClientRect()
mpBtnRight = puiStore.windowInfo.screenWidth - mpBtn.left
// #endif

const props = defineProps({
    // 标题
    title: {
        type: String,
        default: ''
    },
    // 是否显示占位符
    placeholder: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: 999
    },
    // 左侧返回箭头
    leftArrow: {
        type: Boolean,
        default: false
    },
    // 左侧图标
    leftIcon: {
        type: String,
        default: ''
    },
    // 右侧图标
    rightIcon: {
        type: String,
        default: ''
    },
    // 暗黑模式是否添加背景
    darkBg: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits([
    "click-left",
    "click-right"
]);

const clickLeft = () => {
    emits('click-left')
}

const clickRight = () => {
    emits('click-right')
}

const style = computed(() => {

    // 左侧图标
    let leftIcon = props.leftIcon
    if (props.leftArrow) {
        leftIcon = 'petal-icon-back'
    }

    return {
        titleColor: puiStore.theme['title'],
        bgColor: puiStore.theme['bg-page'],
        paddingTop: puiStore.windowInfo.safeAreaInsets.top + 'px',
        leftIcon
    }
})

</script>

<template>
    <view
        v-if="props.placeholder"
        class="petal-navbar-placeholder"
        :style="{
            paddingTop: style.paddingTop
        }"
    />
    <view
        v-if="props.darkBg && puiStore.dark"
        class="petal-navbar-bar"
        :style="{
            zIndex: props.zIndex + 1,
            height: style.paddingTop,
            background: puiStore.theme['bg-body'],
        }"
    />
    <view
        class="petal-navbar"
        :style="{
            background: style.bgColor,
            zIndex: props.zIndex,
            paddingTop: style.paddingTop
        }"
    >
        <slot name="default">
            <slot name="left">
                <view class="left-icon" @click="clickLeft">
                    <PuiIcon
                        v-if="style.leftIcon"
                        :name="style.leftIcon"
                        :size="40"
                        :color="style.titleColor"
                    />
                </view>
            </slot>
            <view
                class="title"
                :style="{
                color: style.titleColor
            }"
            >
                <text v-text="props.title"/>
            </view>

            <slot name="right">
                <PuiIcon
                    v-if="props.rightIcon"
                    class="right-icon"
                    :name="props.rightIcon"
                    :size="40"
                    :color="style.titleColor"
                    @click="clickRight"
                />
            </slot>
        </slot>
        <!--小程序胶囊占位-->
        <view v-if="isMp" class="mp-capsule" :style="{width: mpBtnRight + 'px'}"/>
    </view>
</template>

<style scoped>

.petal-navbar-placeholder {
    height: 88rpx;
    width: 100%;
}

.petal-navbar {
    position: fixed;
    top: 0;
    height: 88rpx;
    display: flex;
    width: 100%;
    align-items: center;
}

.petal-navbar-bar {
    position: fixed;
    width: 100%;
    top: 0;
}

.left-icon {
    margin-left: 20rpx;
}

.right-icon {
    margin-left: auto;
    margin-right: 20rpx;
}

.left-icon:active {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    opacity: 0.7;
}

.petal-navbar .title {
    padding-left: 20rpx;
    flex: 1;
    font-size: 30rpx;
    font-weight: 700;
    line-height: 88rpx;
}

.mp-capsule {
    height: 88rpx;
}

</style>