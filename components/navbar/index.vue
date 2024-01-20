<script setup>

// TODO: 计划任务如下
// 1. 新增左侧、右侧图标
// 2. 新增插槽支持自定义内容

import {computed} from "vue";

import {usePetalUiStore} from "../../stores/petal-ui";
import PuiIcon from "../icon/index.vue";

const puiStore = usePetalUiStore()

const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    placeholder: {
        type: Boolean,
        default: true
    },
    zIndex: {
        type: Number,
        default: 999
    },
    leftArrow: {
        type: Boolean,
        default: false
    },
    rightIcon: {
        type: String,
        default: 'Title'
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

    let leftIcon = ''
    if (props.leftArrow) {
        leftIcon = 'petal-icon-back'
    }

    return {
        titleColor: puiStore.theme['title'],
        bgColor: puiStore.theme['bg-page'],
        paddingTop: puiStore.safeAreaInsets.top + 'px',
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
        class="petal-navbar"
        :style="{
            background: style.bgColor,
            zIndex: props.zIndex,
            paddingTop: style.paddingTop
        }"
    >
        <slot name="default">
            <view class="left-icon" @click="clickLeft">
                <PuiIcon
                    v-if="style.leftIcon"
                    :name="style.leftIcon"
                    :size="40"
                    :color="style.titleColor"
                />
            </view>
            <view
                class="title"
                :style="{
                color: style.titleColor
            }"
            >
                <text v-text="props.title"/>
            </view>

            <PuiIcon
                v-if="props.rightIcon"
                class="right-icon"
                :name="props.rightIcon"
                :size="40"
                :color="style.titleColor"
                @click="clickRight"
            />
        </slot>
    </view>
</template>

<style scoped>

.petal-navbar-placeholder {
    height: 88rpx;
    width: 100%;
}

.petal-navbar {
    height: 88rpx;
    display: flex;
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 999;
    align-items: center;
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

</style>