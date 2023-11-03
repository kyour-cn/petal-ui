<template>
    <view class="petal-tabbar-item" @click="activeIndex = index">
        <pui-icon
            class="icon"
            :name="props.icon"
            :style="{
                color: style.titleColor
            }"
        />
        <text
            class="title"
            :style="{
                color: style.titleColor
            }"
            v-text="name"
        />
    </view>
</template>

<script setup>

import PuiIcon from "../icon"
import {usePetalUiStore} from "../../stores/petal-ui";
import {computed, defineProps, inject, ref} from "vue";

const props = defineProps({
    icon: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
})

const puiStore = usePetalUiStore()

// 使用inject方法获取计算index的函数
const index = ref(inject('index')());
const activeIndex = inject('activeIndex', ref(0))

const isActive = computed(() => {
    return activeIndex.value === index.value
})

const style = computed(() => {
    return {
        titleColor: isActive.value ? puiStore.theme['primary'] : puiStore.theme['title'],
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