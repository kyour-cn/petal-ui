<template>
    <view class="petal-sidebar-item" :style="style" @click="onClick">
        <text class="petal-sidebar-title">
            {{ props.title}}
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
    height: 80rpx;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.petal-sidebar-title {
    padding-left: 6rpx;
    border-left: #2550F7 6rpx solid;
}

</style>