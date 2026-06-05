<script setup lang="ts">
    import { PRICING, PRICING_NOTE, SOCIAL_ACCOUNTS, SITE } from '#shared/constant';

    useHead({
        title: `Contact | ${SITE.name}`,
        meta: [
            { name: "description",        content: "イラストのご依頼・ご相談、料金表。" },
            { property: "og:title",       content: `Contact | ${SITE.name}` },
            { property: "og:description", content: "イラストのご依頼・ご相談、料金表。" },
            { property: "og:image",       content: SITE.ogImage },
        ],
        noscript: [{ innerHTML: '<style>.contact-cloak{visibility:visible!important}</style>' }],
    });

    const twitter = SOCIAL_ACCOUNTS.find((a) => a.name === "Twitter")!;

    // 料金表セクション (ファーストビュー外) をスクロールでリビール
    const priceSection = ref<HTMLElement | null>(null);
    const gsap = useGsap();

    useScrollReveal(priceSection, (el) => {
        const trigger = { trigger: el, start: 'top 80%', once: true } as const;
        gsap.from(el.querySelectorAll('[data-price-head]'), {
            opacity: 0, y: 16, stagger: 0.12, duration: 0.5, ease: 'ease02', scrollTrigger: trigger,
        });
        gsap.from(el.querySelectorAll('[data-price-row]'), {
            opacity: 0, y: 14, stagger: 0.05, duration: 0.5, ease: 'ease02', scrollTrigger: trigger,
        });
        gsap.from(el.querySelectorAll('[data-price-note]'), {
            opacity: 0, y: 10, duration: 0.5, ease: 'ease02', scrollTrigger: trigger,
        });
        const img = el.querySelector('[data-price-img]');
        if (img) gsap.from(img, {
            opacity: 0, y: 24, scale: 0.97, duration: 0.7, ease: 'ease01',
            scrollTrigger: { trigger: img, start: 'top 90%', once: true },
        });
    });

    // --- ヘッダー (ファーストビュー) のロードイントロ ---
    const SplitText = useSplitText();
    const header = ref<HTMLElement | null>(null);
    let headerCtx: ReturnType<typeof gsap.context> | null = null;
    let headerSplit: ReturnType<typeof SplitText.create> | null = null;

    onMounted(() => {
        const el = header.value;
        if (!el) return;
        // reduced-motion: 即表示してアニメしない
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.style.visibility = 'visible';
            return;
        }
        registerGsapEases();
        headerCtx = gsap.context(() => {
            const title = el.querySelector('[data-c-title]') as HTMLElement;
            headerSplit = SplitText.create(title, { type: 'chars' });
            gsap.timeline({ defaults: { ease: 'ease02' } })
                .from(el.querySelector('[data-c-eyebrow]'),   { opacity: 0, y: 12, duration: 0.5 }, 0)
                .from(headerSplit.chars,                       { yPercent: 100, opacity: 0, stagger: 0.05, duration: 0.7, ease: 'ease01' }, 0.1)
                .from(el.querySelector('[data-c-underline]'),  { opacity: 0, scaleX: 0, transformOrigin: 'left center', duration: 0.5 }, 0.45)
                .from(el.querySelectorAll('[data-c-item]'),    { opacity: 0, y: 20, stagger: 0.1, duration: 0.55 }, 0.5);
        }, el);
        el.style.visibility = 'visible';   // 初期状態を組んだ後に表示 (フラッシュ防止)
    });

    onBeforeUnmount(() => { headerCtx?.revert(); headerSplit?.revert(); });
</script>

<template>
    <!-- Header -->
    <section ref="header" class="contact-cloak pt-20 pb-10 px-4 flex flex-col items-center text-center">
        <span data-c-eyebrow class="text-xs font-mono tracking-[0.35em] text-rose-400 mb-3">— CONTACT —</span>
        <h1 data-c-title class="overflow-hidden text-4xl md:text-6xl font-black tracking-tight mb-3 leading-[1.1]">Contact</h1>
        <svg data-c-underline viewBox="0 0 200 12" xmlns="http://www.w3.org/2000/svg" class="w-28 mb-6 text-rose-300">
            <path d="M0,6 C25,12 50,0 75,6 C100,12 125,0 150,6 C175,12 187,3 200,6" fill="none" stroke="currentColor" stroke-width="1.5"/>
        </svg>

        <p data-c-item class="max-w-md text-gray-600 leading-relaxed mb-8">
            イラストのご依頼・ご相談はお気軽にどうぞ。<br/>
            ご連絡はTwitter(自称𝕏)のDMが確実です。
        </p>

        <!-- X (Twitter) CTA -->
        <a
            data-c-item
            :href="twitter.url"
            target="_blank"
            rel="me noopener"
            class="group inline-flex items-center gap-4 pl-6 pr-7 py-4 bg-black text-white hover:bg-gray-800 transition-colors"
            style="clip-path: polygon(0 0, 94% 0, 100% 22%, 100% 100%, 6% 100%, 0 78%)"
        >
            <Icon name="simple-icons:x" class="w-6 h-6 shrink-0" />
            <span class="text-left">
                <span class="block font-bold text-base leading-tight">Twitterでお問い合わせ</span>
                <span class="block text-xs font-mono opacity-70">{{ twitter.shortHandle }}</span>
            </span>
            <svg class="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 16 16" fill="none">
                <path d="M4 12L12 4M12 4H6.5M12 4V9.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </a>
    </section>

    <!-- wave divider -->
    <WavyDivider variant="up" color-class="text-gray-100" />

    <!-- Price -->
    <div ref="priceSection" class="bg-gray-100 pt-2 pb-12">
        <ContentTitle title="料金表" index="— Price —" />

        <section class="max-w-5xl mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <div
                    v-for="(group, gi) in PRICING"
                    :key="group.title"
                    class="relative bg-rose-100/70 p-2"
                    :style="{ borderRadius: gi % 2 === 0 ? '30px 10px 30px 10px / 10px 30px 10px 30px' : '10px 30px 10px 30px / 30px 10px 30px 10px' }"
                >
                    <div
                        class="h-full bg-white/85 px-6 py-6 md:px-8"
                        :style="{ borderRadius: gi % 2 === 0 ? '26px 8px 26px 8px / 8px 26px 8px 26px' : '8px 26px 8px 26px / 26px 8px 26px 8px' }"
                    >
                        <h3 data-price-head class="flex items-center gap-2 text-rose-400 font-bold tracking-wide mb-5">
                            <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                            {{ group.title }}
                        </h3>
                        <ul class="space-y-3.5">
                            <li
                                v-for="item in group.items"
                                :key="item.label"
                                data-price-row
                                class="flex items-baseline gap-3"
                            >
                                <span class="shrink-0 text-sm md:text-base text-gray-700">{{ item.label }}</span>
                                <span class="flex-1 -translate-y-1 border-b border-dotted border-rose-300/70"></span>
                                <span class="whitespace-nowrap font-mono font-bold text-rose-500">{{ item.prefix }}¥{{ item.price }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- note -->
            <div
                data-price-note
                class="mt-6 max-w-3xl mx-auto p-4 border border-dashed border-rose-300 bg-rose-50/70 text-xs leading-relaxed text-rose-500"
                style="border-radius: 18px 6px 18px 6px / 6px 18px 6px 18px"
            >
                <p v-for="(line, i) in PRICING_NOTE" :key="i" class="flex gap-1.5">
                    <span class="select-none">※</span><span>{{ line }}</span>
                </p>
            </div>

            <!-- 料金表イラスト -->
            <figure class="mt-10 mx-auto">
                <div
                    style="border-radius: 26px 8px 26px 8px / 8px 26px 8px 26px"
                >
                    <img
                        data-price-img
                        src="/pricing.jpg"
                        alt="イラスト料金表"
                        loading="lazy"
                        class="block w-full h-auto"
                        style="border-radius: 22px 6px 22px 6px / 6px 22px 6px 22px"
                    />
                </div>
            </figure>
        </section>
    </div>

    <!-- wave divider (flipped) -->
    <WavyDivider color-class="text-gray-100" />
</template>

<style scoped>
.contact-cloak { visibility: hidden; }
@media (prefers-reduced-motion: reduce) {
    .contact-cloak { visibility: visible; }
}
</style>
