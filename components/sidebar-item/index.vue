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
        background: isActive.value ? puiStore.theme['bg-page'] : puiStore.theme['bg-body'],
    }
})

const titleStyle = computed(() => {
    return {
        color: puiStore.theme['title']
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

<template>
    <view
        class="petal-sidebar-item"
        :style="style"
        @click="onClick"
    >
        <view
            class="petal-sidebar-item-before"
            :style="{background: isActive ? puiStore.theme.primary : ''}"
        />
        <text
            class="petal-sidebar-title"
            :style="titleStyle"
            v-text="props.title"
        />
    </view>

</template>

<style scoped lang="scss">

.petal-sidebar-item {
    min-height: 80rpx;
    padding: 10rpx 5rpx;
    background: white;
    display: flex;
    align-items: center;

    &-before {
        content: '';
        width: 6rpx;
        height: 40rpx;
    }

    .petal-sidebar-title {
        flex: 1;
        text-align: center;
        font-size: 28rpx;
    }

    &-active .petal-sidebar-title {
        font-weight: bold;
    }
}

</style>