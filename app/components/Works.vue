<script setup lang="ts">
    const { data: worksData } = await useMicroCMSGetList({
        endpoint: 'works',
        queries: {
            orders: '-createdAt',
            limit: 100
        }
    });

    const contents = computed(() => worksData.value?.contents ?? []);

    const staggerClass = (i: number) => {
        if (i % 3 === 1) return 'md:mt-[60px]';
        if (i % 3 === 2) return 'md:mt-[120px]';
        return '';
    };
</script>

<template>
    <section class="my-8 max-w-5xl mx-auto px-4">

        <!-- SVG clipPath 定義 (WorkCard から参照) -->
        <svg style="position:absolute;width:0;height:0;overflow:hidden" aria-hidden="true">
            <defs>
                <clipPath id="works-notch-clip" clipPathUnits="objectBoundingBox">
                    <path d="
                        M 0.08 0
                        H 0.6333 Q 0.6667 0 0.6667 0.025
                        V 0.0375 Q 0.6667 0.075 0.7167 0.075
                        H 0.92 Q 1 0.075 1 0.135
                        V 0.94 Q 1 1 0.92 1
                        H 0.3667 Q 0.3167 1 0.3167 0.9625
                        V 0.95 Q 0.3167 0.9125 0.2667 0.9125
                        H 0.08 Q 0 0.9125 0 0.8525
                        V 0.06 Q 0 0 0.08 0 Z
                    " />
                </clipPath>
            </defs>
        </svg>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div
                v-for="(content, i) in contents"
                :key="content.id"
                :class="staggerClass(i)"
            >
                <WorkCard :content="content" :index="i" />
            </div>
        </div>
    </section>
</template>
