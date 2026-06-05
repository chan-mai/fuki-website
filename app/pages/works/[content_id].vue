<script setup lang="ts">
    import { SITE } from '#shared/constant';

    const route = useRoute();
    const content_id = route.params?.content_id as string;

    const client = useMicroCMSClient();
    const { data: content } = await useAsyncData<Work>(`work-${content_id}`, async () => {
        return await client.getListDetail<Work>({
            endpoint: 'works',
            contentId: content_id,
            queries: {
                depth: 2
            } satisfies MicroCMSQueries,
        });
    }, {
        server: true,
    });

    if (!content.value?.id) throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });

    useHead({
        title: computed(() => SITE.name + " | " + (content.value?.title ?? '')),
        meta: [
            { property: 'og:type',        content: 'article' },
            { property: 'og:title',       content: computed(() => SITE.name + " | " + (content.value?.title ?? '')) },
            { name: 'description',        content: computed(() => content.value?.description ?? '') },
            { property: 'og:description', content: computed(() => content.value?.description ?? '') },
            { property: 'og:image',       content: computed(() => content.value?.image?.[0]?.url ?? '') },
        ],
    });

    const galleryImages = computed(() => content.value?.image?.slice(1) ?? []);

    const root = ref<HTMLElement | null>(null);
    const gsap = useGsap();
    const SplitText = useSplitText();
    const nuxtApp = useNuxtApp();

    useScrollReveal(root, (el) => {
        let cleanup: (() => void) | undefined;

        // VTの後に再生されるよう少し遅らせる
        const heading = el.querySelector('[data-title]') as HTMLElement;
        const split = SplitText.create(heading, { type: 'chars' });
        cleanup = () => split.revert();
        gsap.timeline({ delay: 0.4 })
            .from(el.querySelector('[data-reveal="back"]'), { opacity: 0, x: -12, duration: 0.5, ease: 'ease02' }, 0)
            .from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.03, duration: 0.6, ease: 'ease01' }, 0.05)
            .from(el.querySelectorAll('[data-reveal="info"]'), { opacity: 0, y: 18, stagger: 0.08, duration: 0.5, ease: 'ease02' }, 0.1);


        // ギャラリー見出し
        const galHead = el.querySelector('[data-reveal="gallery-head"]');
        if (galHead) {
            gsap.from(galHead, {
                opacity: 0, y: 14, duration: 0.6, ease: 'ease02',
                scrollTrigger: { trigger: galHead, start: 'top 88%', once: true },
            });
        }

        // ギャラリー画像
        gsap.utils.toArray<HTMLElement>('[data-gallery]').forEach((item) => {
            const c = item.querySelector('[data-curtain]');
            gsap.set(c, { scaleY: 1, transformOrigin: 'top center' });
            gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 88%', once: true } })
                .from(item, { opacity: 0, y: 30, scale: 0.96, duration: 0.6, ease: 'ease02' }, 0)
                .to(c, { scaleY: 0, duration: 0.7, ease: 'ease01' }, 0.1);
        });

        return cleanup;
    });
</script>

<template>
    <div ref="root" class="w-full px-4 pt-6 max-w-5xl mx-auto mb-20">

        <!-- back nav -->
        <NuxtLink
            data-reveal="back"
            to="/"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 dark:text-neutral-500 hover:text-rose-400 transition-colors mb-10"
        >
            <svg class="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6L8 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Works
        </NuxtLink>

        <!-- main: hero image + info -->
        <div class="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-16">

            <!-- hero image (index カードと view-transition で morph) -->
            <div class="relative aspect-[3/4] rounded-2xl overflow-hidden bg-rose-50 dark:bg-neutral-800">
                <img
                    class="w-full h-full rounded-2xl object-cover"
                    :src="content?.image?.[0]?.url"
                    :alt="content?.title"
                    :style="{ viewTransitionName: 'vt-work-' + content?.id }"
                />
            </div>

            <!-- info panel -->
            <div class="flex flex-col justify-start pt-4 md:pt-8">

                <!-- eyebrow -->
                <span data-reveal="info" class="text-xs font-mono tracking-widest text-rose-400 mb-3">— illustration</span>

                <!-- title (文字分割スライド) -->
                <h1 data-title class="text-3xl md:text-4xl font-bold leading-tight mb-2 overflow-hidden">{{ content?.title }}</h1>

                <!-- wavy underline -->
                <svg data-reveal="info" viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" class="w-32 mb-8 text-rose-200 dark:text-rose-800">
                    <path d="M0,5 C25,10 50,0 75,5 C100,10 125,0 150,5 C175,10 187,3 200,5" fill="none" stroke="currentColor" stroke-width="1.5"/>
                </svg>

                <!-- description -->
                <div data-reveal="info" class="border-l-2 border-rose-200 dark:border-rose-800 pl-4 mb-8">
                    <p class="text-sm text-gray-600 dark:text-neutral-400 leading-relaxed">{{ content?.description }}</p>
                </div>

                <!-- external link -->
                <NuxtLink
                    v-if="content?.url"
                    data-reveal="info"
                    :to="content?.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 text-xs font-mono text-rose-400 hover:text-rose-600 dark:hover:text-rose-300 transition-colors"
                >
                    <span
                        class="px-3 py-1.5 border border-rose-200 dark:border-rose-800 hover:border-rose-400 transition-colors truncate max-w-xs"
                        style="clip-path: polygon(0 0, 88% 0, 100% 25%, 100% 100%, 12% 100%, 0 75%)"
                    >
                        {{ content?.url }}
                    </span>
                </NuxtLink>

            </div>
        </div>

        <!-- gallery section (2枚目以降) -->
        <template v-if="galleryImages.length > 0">
            <!-- divider -->
            <div data-reveal="gallery-head">
                <div class="flex items-center gap-4 mb-2">
                    <div class="flex-1 border-t-2 border-dashed border-gray-200 dark:border-neutral-700"></div>
                    <span class="text-xs font-mono tracking-widest text-rose-400">— Gallery —</span>
                    <div class="flex-1 border-t-2 border-dashed border-gray-200 dark:border-neutral-700"></div>
                </div>
                <svg viewBox="0 0 200 10" xmlns="http://www.w3.org/2000/svg" class="w-24 mx-auto mb-8 text-rose-200 dark:text-rose-800">
                    <path d="M0,5 C25,10 50,0 75,5 C100,10 125,0 150,5 C175,10 187,3 200,5" fill="none" stroke="currentColor" stroke-width="1.5"/>
                </svg>
            </div>

            <!-- gallery grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 items-start">
                <div
                    v-for="(img, i) in galleryImages"
                    :key="img.url"
                    data-gallery
                    class="relative aspect-square overflow-hidden border border-gray-100 dark:border-neutral-800"
                    :style="{
                        borderRadius: ['32px 8px 24px 8px / 8px 32px 8px 24px', '8px 32px 8px 24px / 24px 8px 32px 8px', '24px 8px 32px 8px / 8px 24px 8px 32px', '8px 24px 8px 32px / 32px 8px 24px 8px'][i % 4],
                        marginTop: i % 3 === 1 ? '24px' : i % 3 === 2 ? '48px' : '0'
                    }"
                >
                    <img
                        class="w-full h-full object-cover"
                        loading="lazy"
                        :src="img.url"
                        :alt="content?.title"
                    />
                    <!-- reveal curtain -->
                    <div data-curtain aria-hidden="true" class="absolute inset-0 bg-rose-200 dark:bg-neutral-700" style="transform: scaleY(0)"></div>
                </div>
            </div>
        </template>

    </div>
</template>
