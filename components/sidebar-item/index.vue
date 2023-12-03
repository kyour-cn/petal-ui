<template>
    <view
        :class="{
            'petal-sidebar-item':true,
            'petal-sidebar-item-active': isActive
        }"
        :style="style"
        @click="onClick"
    >
        <text class="petal-sidebar-title">
            {{ props.title }}
        </text>
    </view>

</template>

<script setup>

import {computed, inject, ref} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const props = defineProps({
    title: {
        type: String,
        default: ''
    }
})

const puiStore = usePetalUiStore()

// 使用inject方法获取计算index的函数
const index = ref(inject('index')());
const activeIndex = inject('activeIndex')

const isActive = computed(() => {
    return activeIndex.value === index.value
})

const onClick = () => {
    activeIndex.value = index.value
}

const style = computed(() => {
    return {
        // color: isActive.value ? puiStore.theme['primary'] : puiStore.theme['title'],
        background: isActive.value ? puiStore.theme['bg-body'] : puiStore.theme['bg-page'],
    }
})

</script>

<script>
// 小程序去除自定义组件节点
export default {
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
}
</script>

<style scoped>

.petal-sidebar-item {
    width: 100%;
    min-height: 80rpx;
    margin: 10rpx 5rpx;
    background: white;
    display: flex;
    align-items: center;
}

.petal-sidebar-item:before {
    content: '';
    width: 6rpx;
    height: 40rpx;
}

.petal-sidebar-item-active {
    font-weight: bold;
}

.petal-sidebar-item-active:before {
    background: #2550F7;
}

.petal-sidebar-title {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #333;
}

</style>