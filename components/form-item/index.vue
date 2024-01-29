<script setup>

import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";
import PuiIcon from "../icon"

const puiStore = usePetalUiStore()

const props = defineProps({
    // 标题
    title: {
        type: String,
        default: 'Title'
    },
    // 描述信息
    label: {
        type: String,
        default: ''
    },
    // 值
    value: {
        type: String,
        default: ''
    },
    // 是否必填
    required: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    "click"
]);

const onClick = () => {
    emits('click')
}

const style = computed(() => {

    let rightIcon = ''

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
        <view class="item-box">
            <view class="title">
                <text v-if="props.required" class="required">*</text>
                <text v-text="props.title"/>
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
        <view
            v-if="props.label !== ''"
            class="label"
            :style="{
                    color: style.labelColor
                }"
        >
            <slot name="label">
                <text v-text="props.label"></text>
            </slot>
        </view>
    </view>

</template>

<style scoped>

.petal-form-item {
    padding: 0 20rpx;
}

.item-box {
    display: flex;
    align-items: center
}

.title {
    padding: 30rpx 0;
    flex: none;
    font-size: 32rpx;
    width: 6em;
}

.required {
    color: red;
}

.value {
    display: flex;
    flex: 1;
    font-size: 28rpx;
    justify-content: right;
}

.label {
    padding-bottom: 20rpx;
}

</style>