<template>

    <view class="pui-cell">
        <view class="title">
            <text v-text="props.title"/>
            <text
                v-if="props.label !== ''"
                class="label"
                :style="{
                    color: style.labelColor
                }"
                v-text="props.label"
            />
        </view>
        <view
            v-if="props.value !== ''"
            class="value"
            :style="{
                color: style.valueColor
            }"
        >
            <text v-text="props.value"/>
        </view>
    </view>

</template>

<script setup>

// TODO: 计划任务如下
// 1. isLink属性，用于是否显示右侧箭头
// 2. 增加icon属性，用于显示左侧icon
// 3. 所有内容支持插槽，用于自定义内容

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    label: {
        type: String,
        default: ''
    },
    value: {
        type: String,
        default: ''
    }
})

const style = computed(() => {
    return {
        labelColor: puiStore.theme['label'],
        valueColor: puiStore.theme['subtitle']
    }
})

</script>

<style scoped>

.pui-cell {
    display: flex;
}

.title {
    padding: 20rpx 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 28rpx;
}

.label {
    margin-top: 8rpx;
    font-size: 24rpx;
}

.value {
    display: flex;
    font-size: 28rpx;
    align-items: center;
}
</style>