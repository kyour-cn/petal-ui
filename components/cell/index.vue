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

import {computed, defineProps} from "vue";

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
    padding: 10rpx 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 30rpx;
}

.label {
    margin-top: 8rpx;
    font-size: 24rpx;
}

.value {
    display: flex;
    font-size: 30rpx;
    align-items: center;
}
</style>