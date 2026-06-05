<template>
    <div class="overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1200 48" xmlns="http://www.w3.org/2000/svg" class="w-full block" :class="colorClass" preserveAspectRatio="none">
            <path :d="path" fill="currentColor"/>
        </svg>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    variant?: 'down' | 'up'
    colorClass?: string
}>(), {
    variant: 'down',
    colorClass: 'text-gray-100'
})

const path = computed(() => {
    if (props.variant === 'up') {
        return 'M0,48 L0,24 C150,0 350,48 600,24 C850,0 1050,48 1200,24 L1200,48 Z'
    }
    return 'M0,0 L0,24 C150,48 350,0 600,24 C850,48 1050,0 1200,24 L1200,0 Z'
})
</script>
