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
        <PuiIcon
            v-if="style.leftIcon"
            class="left-icon"
            :name="style.leftIcon"
            :size="40"
            @click="clickLeft"
        />
        <view
            class="title"
            :style="{
                color: style.titleColor
            }"
        >
            <text v-text="props.title"/>
        </view>
    </view>
</template>

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
        default: 'Title'
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
    }
})

const emits = defineEmits([
    "click-left"
]);

const clickLeft = () => {
    emits('click-left')
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

<style scoped>

.petal-navbar-placeholder {
    height: 80rpx;
    width: 100%;
}

.petal-navbar {
    height: 80rpx;
    display: flex;
    top: 0;
    font-weight: 700;
    width: 100%;
    position: fixed;
    z-index: 999;
    align-items: center;
}

.left-icon {
    margin-left: 20rpx;
}

.left-icon:active {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    opacity: 0.7;
}

.title {
    padding-left: 20rpx;
    flex: 1;
    font-size: 30rpx;
    line-height: 80rpx;
}

</style>