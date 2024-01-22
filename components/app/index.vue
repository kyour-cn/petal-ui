<script setup>

import {usePetalUiStore} from "../../stores/petal-ui";
import {computed} from "vue";

const puiStore = usePetalUiStore()

const props = defineProps({
    _style: {
        type: Object,
        default: {}
    }
})

const style = computed(() => {
    return {
        background: puiStore.theme['bg-page'],
        ...props._style
    }
})

</script>

<template>
    <view class="petal-app" :style="style">
        <slot name="default"></slot>
    </view>
</template>

<style scoped>
.petal-app {
    min-height: 100%;
}
</style>
