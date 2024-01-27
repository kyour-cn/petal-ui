<script setup>

// TODO: 计划任务如下
// 1. 支持内容插槽
// 2. 支持内容左右滑动切换

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: {
        type: Number,
        default: 0
    },
    list: {
        type: Array,
        default: () => []
    },
    key: {
        type: String,
        default: 'name'
    }
})

const emits = defineEmits([
    'update:modelValue',
    'change'
])

// 生成随机ID
const tabId = 'tabs_' + Math.floor(Math.random() * 10000)

// 滚动到指定位置
const showIntoId = computed(() => {
    return tabId + (active.value -1)
})

const onChange = (key) => {
    active.value = key
}

const active = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits('update:modelValue', value)
        emits('change', value)
    }
})

const style = computed(() => {
    return {
        color: puiStore.theme['title'],
    }
})

</script>

<template>
    <scroll-view
        class="hide-scrollbar"
        :scroll-x="true"
        :show-scrollbar="false"
        :scroll-with-animation="true"
        :scroll-into-view="showIntoId"
    >
        <view class="petal-tabs" :style="style">
            <view
                v-for="(item, key) in list"
                :id="tabId+ key"
                :key="key"
                :class="{
                    'tab-item': true,
                    'active': active === key
                }"
                @click="onChange(key)"
            >
                {{item?.[props.key]}}
            </view>
        </view>
    </scroll-view>

</template>

<style scoped>

.petal-tabs {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.petal-tabs .tab-item {
    font-size: 35rpx;
    margin: 10rpx;
    padding-bottom: 8rpx;
    white-space: nowrap;
}

.petal-tabs .active {
    font-size: 50rpx;
    /*color: #0051ff;
    border-bottom: 4rpx solid #0051ff;*/
    padding-bottom: 4rpx;
}

scroll-view::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
    color: transparent;
}

.hide-scrollbar ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}

</style>
