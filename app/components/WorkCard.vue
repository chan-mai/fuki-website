<script setup lang="ts">
defineProps<{
    content: any
    index: number
}>()

const num = (i: number) => String(i + 1).padStart(2, '0')
</script>

<template>
    <NuxtLink
        :to="'/works/' + content.id"
        class="relative block group"
    >
        <div class="relative">
            <!-- image area -->
            <div class="relative aspect-[3/4]">
                <div
                    class="absolute inset-0 bg-white dark:bg-neutral-800 shadow-lg overflow-hidden"
                    style="clip-path: url(#works-notch-clip)"
                >
                    <img
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        :src="content.image[0].url"
                        :alt="content.title"
                    />
                </div>
            </div>

            <!-- top-right notch: label -->
            <div class="absolute top-0.5 right-4 max-w-[28%] truncate text-xs text-gray-500 dark:text-neutral-400 font-mono select-none z-10">
                {{ num(index) }}・{{ content.title }}
            </div>

            <!-- bottom-left notch: glitch number -->
            <div
                class="absolute bottom-6 left-0 font-bold leading-none select-none z-10"
                style="font-size: clamp(60px, 8vw, 100px); color: transparent; -webkit-text-stroke: 1.5px #fda4af; filter: drop-shadow(3px 1px 0 rgba(134,239,172,0.75)) drop-shadow(-3px -1px 0 rgba(251,113,133,0.6));"
            >
                {{ num(index) }}
            </div>
        </div>

        <!-- text below card -->
        <div class="mt-6 pl-2">
            <h3 class="text-xl font-bold mb-2 text-gray-900 dark:text-neutral-100">{{ content.title }}</h3>
            <p v-if="content.description" class="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed line-clamp-3">{{ content.description }}</p>
        </div>
    </NuxtLink>
</template>
