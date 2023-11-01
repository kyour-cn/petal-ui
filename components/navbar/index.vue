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

import {computed, defineProps} from "vue";

import {usePetalUiStore} from "../../stores/petal-ui";

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
})

const style = computed(() => {
    return {
        titleColor: puiStore.theme['title'],
        bgColor: puiStore.theme['bg-page'],
        paddingTop: puiStore.safeAreaInsets.top + 'px'
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
}

.title {
    padding-left: 20rpx;
    flex: 1;
    font-size: 30rpx;
    line-height: 80rpx;
}

</style>