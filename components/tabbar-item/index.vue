<script setup>

import PuiIcon from "../icon"
import {usePetalUiStore} from "../../stores/petal-ui"
import {computed, inject, ref} from "vue"

const props = defineProps({
    // 默认图标
    icon: {
        type: String,
        default: ''
    },
    // 激活时图标，为空时使用默认图标
    activeIcon: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
})

const puiStore = usePetalUiStore()

// 从父组件中获取allowChange属性，是否可以切换
const allowChange = inject('allowChange', true)

// 使用inject方法获取计算index的函数
const index = ref(inject('index')());
const activeIndex = inject('activeIndex', ref(0))

const isActive = computed(() => {
    return activeIndex.value === index.value
})

const emits = defineEmits([
    "click"
]);

const onClick = () => {
    if (allowChange) {
        activeIndex.value = index.value
    }
    emits('click')
}

const style = computed(() => {

    // 激活图标为空时使用默认图标
    let activeIcon = props.activeIcon ? props.activeIcon : props.icon

    return {
        titleColor: isActive.value ? puiStore.theme['primary'] : puiStore.theme['title'],
        bgColor: puiStore.theme['bg-body'],
        paddingBottom: puiStore.windowInfo.safeAreaInsets.bottom + 'px',
        icon: isActive.value ? activeIcon : props.icon
    }
})

</script>

<script>
// 小程序去除自定义组件节点
export default {
    options: {
        virtualHost: true
    }
}
</script>

<template>
    <view class="petal-tabbar-item" @click="onClick">
        <PuiIcon
            class="icon"
            :name="style.icon"
            :size="40"
            :color="style.titleColor"
        />
        <text
            class="name"
            :style="{
                color: style.titleColor
            }"
            v-text="name"
        />
    </view>
</template>

<style scoped lang="scss">

.petal-tabbar-item {
    display: flex;
    align-items: center;
    flex: 1;
    flex-direction: column;
    padding: 20rpx 0;

    /* 按下样式 */
    &:active {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 20rpx;
        opacity: 0.7;
    }
    .icon {
        padding-bottom: 5rpx;
    }
    .name {
        font-size: 22rpx;
    }
}

</style>