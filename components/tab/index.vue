<template>
    <view class="petal-tab" :style="style">
        <view
            v-for="(item, key) in tabList"
            :key="key"
            :class="{
                'tab-item': true,
                'active': active === key
            }"
            @click="active = key"
        >
            {{item.name}}
        </view>
    </view>
</template>

<script setup>
import {computed} from "vue";
import {usePetalUiStore} from "../../stores/petal-ui";

const puiStore = usePetalUiStore()

const props = defineProps({
    modelValue: {
        type: Number,
        default: 1
    },
    tabList: {
        type: Array,
        default: () => []
    }
})

const emits = defineEmits([
    'update:modelValue',
    'change'
])

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

<style scoped>

.petal-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.petal-tab .tab-item {
    margin: 10rpx;
    padding-bottom: 8rpx;
}

.petal-tab .active {
    color: #0051ff;
    border-bottom: 4rpx solid #0051ff;
    padding-bottom: 4rpx;
}

</style>

<style scoped>

.petal-tab {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.petal-tab.tab-item {
    margin: 10rpx;
}

.petal-tab.active {
}

</style>