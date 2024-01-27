<script setup>

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";
import PuiIcon from "../icon"

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
    },
    isLink: {
        type: Boolean,
        default: false
    },
})

const emits = defineEmits([
    "click"
]);

const onClick = () => {
    emits('click')
}

const style = computed(() => {

    let rightIcon = ''
    if (props.isLink) {
        rightIcon = 'petal-icon-arrow-right'
    }

    return {
        labelColor: puiStore.theme['label'],
        valueColor: puiStore.theme['subtitle'],
        rightIcon
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

    <view
        class="petal-form-item"
        @click="onClick"
    >
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
            class="value"
            :style="{
                color: style.valueColor
            }"
        >
            <slot name="value">
                <text v-if="props.value !== ''" v-text="props.value"/>
            </slot>
        </view>
        <PuiIcon
            v-if="style.rightIcon"
            class="right-icon"
            :name="style.rightIcon"
            :color="style.valueColor"
        />
    </view>

</template>

<style scoped>

.petal-form-item {
    display: flex;
    padding: 0 20rpx;

    align-items: center;
}

.title {
    padding: 30rpx 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 32rpx;
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