<script setup>

import {usePetalUiStore} from "../../stores/petal-ui"

const puiStore = usePetalUiStore()

const props = defineProps({
    // 节点列表
    steps: {
        type: Array,
        default: () => [
            // { label: '步骤1'}
        ]
    },
    // 当前步骤
    current: {
        type: Number,
        default: 0
    },
    // 线条颜色
    lineColor: {
        type: String,
        default: 'primary'
    },
    // 圆点颜色
    circleColor: {
        type: String,
        default: 'primary'
    }
})

</script>

<template>
    <view class="petal-steps">
        <view class="petal-steps__item" v-for="(item, index) in props.steps" :key="index">
            <view class="marks">
                <view
                    class="step-line"
                    :style="{
                        background: index === 0 ?
                            'transparent' :
                            (props.current < index + 1 ? puiStore.theme['divider'] : puiStore.theme[props.lineColor])
                    }"
                />
                <view
                    class="step-circle"
                    :style="{
                        background: props.current < index + 1 ? puiStore.theme['divider'] : puiStore.theme[props.circleColor]
                    }"
                />
                <view
                    class="step-line"
                    :style="{
                        background: index === props.steps.length - 1 ?
                        'transparent' :
                        (props.current < index + 2 ? puiStore.theme['divider'] : puiStore.theme[props.lineColor])
                    }"
                />
            </view>
            <view class="step-text">
                {{ item.label }}
            </view>
        </view>
    </view>

</template>

<style scoped lang="scss">

.petal-steps {
    display: flex;
    align-items: center;

    &__item {
        flex: 1;

        .marks {
            flex: 1;
            display: flex;
            align-items: center;
            margin: 10rpx 0;
        }

        .step-line {
            flex: 1;
            height: 2rpx;
        }

        .step-circle {
            width: 20rpx;
            height: 20rpx;
            border-radius: 50%;
            margin: 0 10rpx;
        }

        .step-text {
            text-align: center;
        }
    }
}

</style>