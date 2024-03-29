<script setup>

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
    return tabId + (active.value - 1)
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
                :style="{
                    color: active === key ? puiStore.theme['title'] : puiStore.theme['subtitle']
                }"
                @click="onChange(key)"
            >
                {{ item?.[props.key] }}
            </view>
        </view>
    </scroll-view>

</template>

<style scoped lang="scss">

.petal-tabs {
    display: flex;
    flex-direction: row;
    align-items: center;

    .tab-item {
        line-height: 50rpx;
        font-size: 35rpx;
        margin: 15rpx 10rpx 0 10rpx;
        white-space: nowrap;
        transition: font-size 0.2s ease;
    }
    .active {
        font-size: 45rpx;
        margin-top: 0;
    }
}

.hide-scrollbar ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
</style>
