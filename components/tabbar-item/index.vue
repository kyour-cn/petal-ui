<template>
    <view class="petal-tabbar-item">
        <pui-icon
            class="icon"
            name="home"
            :style="{
                color: style.titleColor
            }"
        />
        <text
            class="title"
            :style="{
                color: style.titleColor
            }"
        >
            首页
        </text>
    </view>
</template>

<script setup>

import PuiIcon from "../icon"
import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";
const puiStore = usePetalUiStore()

const style = computed(() => {
    return {
        titleColor: puiStore.theme['title'],
        bgColor: puiStore.theme['bg-body'],
        paddingBottom: puiStore.safeAreaInsets.bottom + 'px'
    }
})

</script>

<style scoped>

.petal-tabbar-item {
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
}

/* 按下样式 */
.petal-tabbar-item:active {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;
    opacity: 0.7;
}

.icon {
    padding-top: 10rpx;
}

.title {
    font-size: 20rpx;
}

</style>