<script setup lang="ts">
    import { SITE } from '#shared/constant';

    useHead({
        title: SITE.name,
        meta: [
            { property: "og:type",        content: "article" },
            { property: "og:title",       content: SITE.name },
            { name: "description",        content: SITE.description },
            { property: "og:description", content: SITE.description },
            { property: "og:image",       content: SITE.ogImage },
        ],
        noscript: [{ innerHTML: '<style>.hero-cloak{visibility:visible!important}</style>' }],
    });

    const tags = ["イラスト", "キャラクターデザイン", "コンセプトアート", "デジタル彩色"];

    const client = useMicroCMSClient();

    const { data: worksData } = await useAsyncData<Work[]>('works', async () => {
        const res = await client.getList<Work>({
            endpoint: 'works',
            queries: {
                orders: '-createdAt',
                limit: 100
            } satisfies MicroCMSQueries
        });
        return res.contents;
    }, {
        default: () => [],
        server: true,
    });

    // --- Hero ロード演出 ---
    const gsap = useGsap();
    const SplitText = useSplitText();
    const hero = ref<HTMLElement | null>(null);
    let heroCtx: ReturnType<typeof gsap.context> | null = null;
    let heroSplit: ReturnType<typeof SplitText.create> | null = null;

    onMounted(() => {
        const el = hero.value;
        if (!el) return;
        // reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.querySelector('[data-hero-hatch]')?.classList.add('hero-sketch');
            el.style.visibility = 'visible';
            return;
        }
        registerGsapEases();
        heroCtx = gsap.context(() => {
            const title = el.querySelector('[data-hero-title]') as HTMLElement;
            heroSplit = SplitText.create(title, { type: 'chars', charsClass: 'hero-char' });
            // ハッチはアニメ中はクリーン、登場完了後に手描きラフ(filter)を付与してジャンク回避
            gsap.timeline({ defaults: { ease: 'ease01' }, onComplete: () => title.querySelector('[data-hero-hatch]')?.classList.add('hero-sketch') })
                .from(el.querySelector('[data-hero-eyebrow]'), { opacity: 0, x: -20, duration: 0.5, ease: 'ease02' }, 0)
                .from(heroSplit.chars, { yPercent: 100, opacity: 0, stagger: 0.02, duration: 0.7 }, 0.1)
                .from(el.querySelector('[data-hero-img]'), { opacity: 0, scale: 0.9, duration: 0.9 }, 0.15)
                .from(el.querySelectorAll('[data-hero-deco]'), { opacity: 0, scale: 0.4, stagger: 0.06, duration: 0.5 }, 0.5)
                .from(el.querySelectorAll('[data-hero-item]'), { opacity: 0, y: 20, stagger: 0.08, duration: 0.55, ease: 'ease02' }, 0.55)
                .fromTo(el.querySelector('[data-hero-accent]'),
                    { opacity: 0 },
                    { opacity: 1, duration: 0.4, ease: 'none', keyframes: { opacity: [0, 1, 0, 1, 0.4, 1], easeEach: 'steps(1)' } }, 0.7);
        }, el);

        el.style.visibility = 'visible';
    });

    onBeforeUnmount(() => { heroCtx?.revert(); heroSplit?.revert(); });
</script>
<template>
    <!-- Hero -->
    <section ref="hero" class="hero-cloak relative overflow-hidden">
        <!-- 手描きラフ用の SVG フィルタ (見出しの輪郭/ハッチを揺らす) -->
        <svg aria-hidden="true" width="0" height="0" class="absolute">
            <filter id="hero-sketch">
                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="7" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>

        <!-- decorative backdrop -->
        <div aria-hidden="true" class="pointer-events-none absolute inset-0">
            <div class="absolute inset-y-0 left-[10%] w-px bg-rose-200/50"></div>
            <div class="absolute inset-y-0 right-[14%] w-px bg-rose-200/40 hidden md:block"></div>
        </div>

        <div class="relative max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-8 md:gap-6 items-center min-h-[80vh] pt-16 pb-12">

            <!-- text -->
            <div class="md:col-span-7 order-2 md:order-1">
                <!-- eyebrow -->
                <div data-hero-eyebrow class="flex items-center gap-3 mb-6">
                    <span class="block h-px w-10 bg-rose-400"></span>
                    <span class="font-mono text-[11px] tracking-[0.35em] uppercase text-rose-400">Hey 👋🏻 I'm fuki</span>
                </div>

                <!-- headline (Illustrator のみ斜線ハッチング塗り + 手描きラフ) -->
                <h1 data-hero-title class="font-black tracking-tight leading-[0.92] text-[clamp(2.5rem,7vw,5.5rem)] text-neutral-900">
                    <span class="block">meccha</span>
                    <span class="block">tsuyotsuyo</span>
                    <span data-hero-hatch class="hero-line ink-rose block">Illustrator</span>
                </h1>

                <!-- rule -->
                <div data-hero-item class="mt-7 h-px max-w-md bg-gradient-to-r from-rose-300 via-rose-200 to-transparent"></div>

                <!-- tagline -->
                <p data-hero-item class="mt-5 max-w-md text-gray-600 leading-relaxed">
                    {{ SITE.tagline }}
                </p>

                <!-- skill tags -->
                <ul data-hero-item class="flex flex-wrap gap-2 mt-6">
                    <li
                        v-for="(tag, i) in tags"
                        :key="tag"
                        class="text-xs px-3 py-1 border border-rose-200 text-rose-400 font-mono bg-rose-50"
                        :style="i % 3 === 0
                            ? 'clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)'
                            : i % 3 === 1
                            ? 'clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%, 0 70%)'
                            : 'clip-path: polygon(8% 0, 100% 0, 100% 100%, 0 100%, 0 30%)'"
                    >
                        {{ tag }}
                    </li>
                </ul>

                <!-- contact -->
                <NuxtLink
                    data-hero-item
                    to="/contact"
                    class="group inline-flex items-center gap-2.5 mt-8 px-7 py-3.5 font-semibold text-base bg-neutral-900 text-white hover:bg-rose-500 transition-colors"
                    style="clip-path: polygon(0 0, 92% 0, 100% 22%, 100% 100%, 8% 100%, 0 78%)"
                >
                    Contact
                    <span class="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </NuxtLink>
            </div>

            <!-- profile image with layered decoration -->
            <div class="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
                <div class="relative w-56 h-56 md:w-72 md:h-72">
                    <!-- offset dashed outline (depth) -->
                    <div
                        data-hero-deco
                        aria-hidden="true"
                        class="absolute inset-0 translate-x-3.5 translate-y-3.5 border-2 border-dashed border-rose-300/70"
                        style="border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%"
                    ></div>

                    <!-- image blob -->
                    <div
                        data-hero-img
                        class="relative w-full h-full p-1.5 border-2 border-dashed border-rose-200 bg-white"
                        style="border-radius: 62% 38% 46% 54% / 60% 44% 56% 40%"
                    >
                        <div
                            class="w-full h-full bg-rose-50 overflow-hidden"
                            style="border-radius: 60% 40% 44% 56% / 58% 42% 58% 42%"
                        >
                            <img src="@/assets/image/icon.webp" class="w-full h-full object-cover" alt="fuki icon" />
                        </div>
                    </div>

                    <!-- glitch accent -->
                    <span data-hero-accent class="absolute -top-3 right-6 text-2xl text-rose-400 select-none">✦</span>

                    <!-- small decorative shapes -->
                    <svg data-hero-deco aria-hidden="true" class="absolute -top-2 -left-3 w-7 h-7 text-rose-300" viewBox="0 0 24 24" fill="none">
                        <path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <svg data-hero-deco aria-hidden="true" class="absolute bottom-2 -right-2 w-6 h-6 text-rose-300" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5 L19 19 L5 19 Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    </svg>
                    <span data-hero-deco class="absolute bottom-8 -left-2 block w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                    <span data-hero-deco class="absolute top-10 -right-4 block w-1.5 h-1.5 rounded-full bg-rose-300"></span>
                </div>
            </div>

        </div>
    </section>
    <!-- Hero End -->

    <!-- wave divider -->
    <div class="mt-10">
        <WavyDivider variant="up" color-class="text-gray-100" />
    </div>

    <!-- SocialLinks -->
    <div class="bg-gray-100 py-2">
        <ContentTitle title="SocialLinks" index="— 01 —" />
        <SocialLinks />
    </div>

    <!-- wave divider (flipped) -->
    <WavyDivider color-class="text-gray-100" />

    <!-- Works -->
    <div class="mt-2 mb-10">
        <ContentTitle title="Works" index="— 02 —" />
        <Works :works="worksData" />
    </div>

</template>

<style scoped>
/* ロード演出の初期フラッシュ防止 */
.hero-cloak { visibility: hidden; }
@media (prefers-reduced-motion: reduce) {
    .hero-cloak { visibility: visible; }
}
</style>

<style>
/* Illustrator行 */
.hero-cloak .hero-line,
.hero-cloak .hero-line .hero-char {
    background-image: repeating-linear-gradient(46deg, var(--ink, #2b2b2b) 0, var(--ink, #2b2b2b) 3px, transparent 3px, transparent 6px);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke: 0.02em var(--ink, #2b2b2b);
}
.hero-cloak .ink-rose { --ink: #fb7185; }
.hero-sketch { filter: url(#hero-sketch); }
</style>
