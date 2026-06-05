<script setup lang="ts">
defineProps<{
    content: any
    index: number
}>()

const num = (i: number) => String(i + 1).padStart(2, '0')

const root = ref<HTMLElement | null>(null);
const gsap = useGsap();

useScrollReveal(root, (el) => {
    const curtain = el.querySelector('[data-curtain]');
    const folio = el.querySelector('[data-folio]');
    gsap.set(curtain, { scaleY: 1, transformOrigin: 'top center' });   // 画像を覆う
    gsap.set(folio, { opacity: 0, y: 14 });
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
        // カード本体: フェード + スライド + 微スケール
        .from(el, { opacity: 0, y: 40, scale: 0.96, duration: 0.6, ease: 'ease02' }, 0)
        // 画像カーテン: notch 形状を保ったまま上にめくれて出現
        .to(curtain, { scaleY: 0, duration: 0.7, ease: 'ease01' }, 0.15)
        // index folio: 少し遅れて静かにフェード + ライズ
        .to(folio, { opacity: 1, y: 0, duration: 0.5, ease: 'ease02' }, 0.3)
        // title / description: 少し遅れてフェードアップ
        .from(el.querySelectorAll('[data-text]'), {
            opacity: 0,
            y: 12,
            stagger: 0.06,
            duration: 0.5,
            ease: 'ease02',
        }, 0.4);
});
</script>

<template>
    <div ref="root">
        <NuxtLink
            :to="'/works/' + content.id"
            class="relative block group"
        >
            <div class="relative">
                <!-- image area -->
                <div class="relative aspect-[3/4]">
                    <div
                        class="absolute inset-0 bg-white shadow-lg overflow-hidden"
                        style="clip-path: url(#works-notch-clip)"
                    >
                        <img
                            class="w-full h-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                            :src="content.image[0].url"
                            :alt="content.title"
                            :style="{ viewTransitionName: 'vt-work-' + content.id }"
                        />
                        <!-- reveal curtain (親の clip-path で notch 形状にクリップされる) -->
                        <div
                            data-curtain
                            aria-hidden="true"
                            class="absolute inset-0 bg-rose-200"
                            style="transform: scaleY(0)"
                        ></div>
                    </div>
                </div>

                <!-- top-right notch: label -->
                <div class="absolute top-0.5 right-4 max-w-[28%] truncate text-xs text-gray-500 font-mono select-none z-10">
                    {{ num(index) }}・{{ content.title }}
                </div>

                <!-- bottom-left: index folio (細アウトライン + ラベル) -->
                <div data-folio class="absolute bottom-5 left-2 z-10 select-none leading-none">
                    <div class="flex items-center gap-1.5 mb-1.5">
                        <span class="block h-px w-5 bg-rose-300"></span>
                        <span class="text-[10px] font-mono tracking-[0.35em] text-rose-400 uppercase">No.</span>
                    </div>
                    <span
                        class="block font-bold leading-[0.8] -ml-0.5"
                        style="font-size: clamp(56px, 8vw, 92px); color: transparent; -webkit-text-stroke: 1.5px #fb7185;"
                    >{{ num(index) }}</span>
                </div>
            </div>

            <!-- text below card -->
            <div class="mt-6 pl-2">
                <h3 data-text class="text-xl font-bold mb-2 text-gray-900">{{ content.title }}</h3>
                <p v-if="content.description" data-text class="text-sm text-gray-600 leading-relaxed line-clamp-3">{{ content.description }}</p>
            </div>
        </NuxtLink>
    </div>
</template>
