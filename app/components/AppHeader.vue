<script setup lang="ts">
import { SOCIAL_ACCOUNTS, SITE } from '#shared/constant';

const gsap = useGsap();

const isOpen = ref(false);
const close = () => { isOpen.value = false; };

// ページ遷移時に閉じる
const router = useRouter();
router.afterEach(() => { isOpen.value = false; });

// ease01 / ease02 を登録 (useGsapEases.ts と共有)
onMounted(() => registerGsapEases());

// --- clip-path 定数 (前後で8頂点・% 統一 / GSAP が数値補間できる形) ---
const BUTTON_SHAPE = 'polygon(0% 0%, 100% 0%, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0% 100%)';
const FULL_SHAPE   = 'polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 0% 100%)';

const prefersReduced = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lockScroll = (lock: boolean) => {
    const lenis = useNuxtApp().$lenis as { stop: () => void; start: () => void } | undefined;
    if (lenis) {
        if (lock) lenis.stop(); else lenis.start();
    } else {
        // reduced-motion 等で Lenis 無効時のフォールバック
        document.documentElement.style.overflow = lock ? 'hidden' : '';
    }
};


const stagger    = (root: Element) => root.querySelectorAll('[data-menu-stagger]');                     // コンテンツ (上スライド + 点滅)
const flickering = (root: Element) => root.querySelectorAll('[data-menu-stagger], [data-menu-close]');  // コンテンツ + CLOSE (点滅)
const shapes     = (root: Element) => root.querySelectorAll('[data-menu-echo], [data-menu-panel]');     // メイン + エコー
const one        = (root: Element, sel: string) => root.querySelector(sel) as HTMLElement | null;


const FLICKER_OPACITY = [0, 1, 0, 1, 0.4, 1];

// Vue TransitionのフックでGSAPタイムラインをよしなに
const onBeforeEnter = (el: Element) => {
    const root = el as HTMLElement;
    lockScroll(true);
    gsap.set(shapes(root), { clipPath: BUTTON_SHAPE });   // メイン + エコーを同じ初期形状に
    gsap.set(one(root, '[data-menu-scrim]'), { opacity: 0 });
    gsap.set(flickering(root), { opacity: 0 });           // CLOSE + コンテンツ
    gsap.set(stagger(root), { y: 28 });                   // 上スライド コンテンツのみ
};

const onEnter = (el: Element, done: () => void) => {
    const root = el as HTMLElement;
    const r = prefersReduced();

    if (r) {
        gsap.set(shapes(root), { clipPath: FULL_SHAPE });
        gsap.set(one(root, '[data-menu-scrim]'), { opacity: 1 });
        gsap.set(flickering(root), { opacity: 1 });
        gsap.set(stagger(root), { y: 0 });
        done();
        return;
    }

    const tl = gsap.timeline({ onComplete: done });

    // パネルの時差移動
    tl.to(one(root, '[data-menu-scrim]'), { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0);
    tl.to(shapes(root), {
        clipPath: FULL_SHAPE,
        duration: 0.55,
        ease: 'ease01',
        stagger: 0.07,
    }, 0);

    // コンテンツ表示
    tl.to(stagger(root), { y: 0, duration: 0.45, ease: 'ease01', stagger: 0.05 }, 0.15);
    tl.to(flickering(root), {
        duration: 0.3,
        ease: 'none',
        stagger: 0.05,
        keyframes: { opacity: FLICKER_OPACITY, easeEach: 'steps(1)' },
    }, 0.15);
};

const onLeave = (el: Element, done: () => void) => {
    const root = el as HTMLElement;
    const r = prefersReduced();
    const tl = gsap.timeline({ onComplete: () => { lockScroll(false); done(); } });

    // コンテンツ + CLOSEを消す
    tl.to(flickering(root), {
        opacity: 0,
        duration: r ? 0.001 : 0.2,
        ease: 'power1.in',
        stagger: r ? 0 : { each: 0.03, from: 'end' },
    }, 0);

    // パネルを上層から順に畳む
    tl.to(shapes(root), {
        clipPath: BUTTON_SHAPE,
        duration: r ? 0.001 : 0.4,
        ease: 'ease02',
        stagger: r ? 0 : { each: 0.06, from: 'end' },
    }, r ? 0 : 0.1);

    // スクリムを戻す
    tl.to(one(root, '[data-menu-scrim]'), { opacity: 0, duration: r ? 0.001 : 0.35, ease: 'power2.in' }, r ? 0 : 0.1);
};

onBeforeUnmount(() => {
    if (typeof document !== 'undefined') document.documentElement.style.overflow = '';
});
</script>

<template>
    <!-- MENU opener (fixed top-left) -->
    <div class="fixed top-0 left-0 z-50" :class="{ 'pointer-events-none': isOpen }">
        <button
            @click="isOpen = true"
            aria-label="メニューを開く"
            class="menu-open flex flex-col items-center justify-center gap-2 w-[100px] h-[84px] select-none cursor-pointer text-white bg-rose-300 transition-[opacity,transform] duration-300 ease-out"
            :class="isOpen ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100'"
            style="clip-path: polygon(0 0, 100% 0, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0 100%)"
        >
            <!-- dots -->
            <div class="flex gap-[5px]">
                <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-white/60"></span>
            </div>

            <span class="font-bold text-[11px] tracking-[0.35em]">MENU</span>

            <!-- dots -->
            <div class="flex gap-[5px]">
                <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-white/60"></span>
            </div>
        </button>
    </div>

    <!-- full-screen overlay -->
    <Teleport to="body">
        <Transition :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <div v-if="isOpen" class="fixed inset-0 z-40">

            <!-- メニュー領域外を暗くする scrim (クリックで閉じる) -->
            <div data-menu-scrim @click="close" class="absolute inset-0 bg-neutral-900/30"></div>

            <!-- エコー: メニューと同形状の図形を色・タイミングをずらして reveal/移動 -->
            <div
                data-menu-echo aria-hidden="true"
                class="absolute inset-y-0 left-0 w-full md:w-1/2 bg-rose-300"
                style="clip-path: polygon(0% 0%, 100% 0%, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0% 100%)"
            ></div>
            <div
                data-menu-echo aria-hidden="true"
                class="absolute inset-y-0 left-0 w-full md:w-1/2 bg-rose-200"
                style="clip-path: polygon(0% 0%, 100% 0%, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0% 100%)"
            ></div>

            <!-- メインパネル -->
            <div
                data-menu-panel
                class="absolute inset-y-0 left-0 w-full md:w-1/2 bg-rose-100 flex items-center overflow-hidden md:shadow-2xl"
                style="clip-path: polygon(0% 0%, 100% 0%, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0% 100%)"
            >
                <!-- CLOSE (点滅のみ・上スライドしない) -->
                <button
                    data-menu-close
                    @click="close"
                    aria-label="メニューを閉じる"
                    class="menu-close absolute top-0 left-0 z-20 w-[100px] h-[84px] flex items-center justify-center overflow-hidden select-none cursor-pointer"
                >
                    <span class="menu-close__inner">
                        CLOSE
                        <span></span><span></span><span></span><span></span>
                    </span>
                </button>

                <!-- SVG decorative pattern -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="menu-pattern" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
                            <!-- small circle outline -->
                            <circle cx="12" cy="12" r="5" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                            <!-- dot -->
                            <circle cx="60" cy="8" r="2" fill="#fda4af" opacity="0.4"/>
                            <!-- cross/plus -->
                            <line x1="34" y1="28" x2="44" y2="28" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                            <line x1="39" y1="23" x2="39" y2="33" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                            <!-- triangle outline -->
                            <path d="M 8 58 L 14 48 L 20 58 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                            <!-- diamond outline -->
                            <path d="M 60 38 L 66 44 L 60 50 L 54 44 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                            <!-- small dot cluster -->
                            <circle cx="48" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                            <circle cx="54" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                            <circle cx="60" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#menu-pattern)"/>
                </svg>

                <!-- content -->
                <div class="relative z-10 w-full max-w-5xl md:max-w-none mx-auto px-8 md:px-16 pt-24 pb-10">

                    <!-- tagline -->
                    <p data-menu-stagger class="text-[11px] font-mono text-rose-400 tracking-widest leading-loose mb-10">
                        Fuki Portfolio<br/>
                        {{ SITE.tagline }}<br/>
                    </p>

                    <div class="grid grid-cols-1 gap-12 items-start">

                        <!-- nav links -->
                        <nav>
                            <ul class="flex flex-col gap-1 mb-8">
                                <li data-menu-stagger>
                                    <NuxtLink
                                        to="/"
                                        class="block font-black text-4xl md:text-6xl tracking-wider uppercase text-neutral-800 hover:text-rose-400 transition-colors leading-tight"
                                    >HOME</NuxtLink>
                                </li>
                                <li data-menu-stagger>
                                    <NuxtLink
                                        to="/"
                                        class="block font-black text-4xl md:text-6xl tracking-wider uppercase text-neutral-800 hover:text-rose-400 transition-colors leading-tight"
                                    >WORKS</NuxtLink>
                                </li>
                                <li data-menu-stagger>
                                    <NuxtLink
                                        to="/contact"
                                        class="block font-black text-4xl md:text-6xl tracking-wider uppercase text-neutral-800 hover:text-rose-400 transition-colors leading-tight"
                                    >CONTACT</NuxtLink>
                                </li>
                            </ul>

                            <!-- secondary -->
                            <div data-menu-stagger class="flex flex-col gap-2 mt-6">
                                <NuxtLink
                                    to="https://mq1.dev/about"
                                    target="_blank" rel="noopener"
                                    @click="close"
                                    class="text-xs font-mono text-rose-400 hover:text-rose-600 transition-colors tracking-wider"
                                >This site was created by chan-mai.↗</NuxtLink>
                            </div>
                        </nav>

                        <!-- SNS section -->
                        <div class="flex flex-col gap-5 md:pt-2 md:min-w-[200px]">
                            <p data-menu-stagger class="text-[10px] font-mono text-rose-400 tracking-[0.3em] uppercase">Official SNS</p>

                            <NuxtLink
                                data-menu-stagger
                                v-for="account in SOCIAL_ACCOUNTS"
                                :key="account.name"
                                :to="account.url"
                                target="_blank"
                                rel="noopener me"
                                @click="close"
                                class="flex items-center gap-3 group"
                            >
                                <div
                                    class="w-9 h-9 border border-rose-200 group-hover:border-rose-500 bg-white/50 flex items-center justify-center shrink-0 transition-colors"
                                    style="clip-path: polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)"
                                >
                                    <Icon :name="account.icon" class="w-4 h-4 text-rose-400 group-hover:text-rose-600 transition-colors"/>
                                </div>
                                <div class="leading-tight">
                                    <div class="text-sm font-bold text-neutral-800 group-hover:text-rose-600 transition-colors">{{ account.name }}</div>
                                    <div class="text-[10px] font-mono text-rose-400">{{ account.shortHandle }}</div>
                                </div>
                            </NuxtLink>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.menu-close::before {
    content: "";
    position: absolute;
    inset: 0;
    background: #fb7185; /* rose-400 */
    transform: scaleY(0);
    transform-origin: top center;
    transition: transform 0.45s cubic-bezier(0.27, 0.76, 0, 1);
    z-index: 0;
}

.menu-close__inner {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 63px;
    height: 42px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    color: #f43f5e; /* rose-500 */
    transition: color 0.45s cubic-bezier(0.27, 0.76, 0, 1);
}

/* 四隅の斜線バー */
.menu-close__inner span {
    width: 10px;
    height: 1px;
    display: inline-block;
    background: #f43f5e; /* rose-500 */
    position: absolute;
    transition: background 0.45s cubic-bezier(0.27, 0.76, 0, 1),
                transform 0.45s cubic-bezier(0.27, 0.76, 0, 1);
}
.menu-close__inner span:nth-of-type(1) { top: 0;    left: 10px;  transform: rotate(45deg); }
.menu-close__inner span:nth-of-type(2) { top: 0;    right: 10px; transform: rotate(-45deg); }
.menu-close__inner span:nth-of-type(3) { bottom: 0; right: 10px; transform: rotate(45deg); }
.menu-close__inner span:nth-of-type(4) { bottom: 0; left: 10px;  transform: rotate(-45deg); }

@media (hover: hover) {
    .menu-close:hover::before { transform: scaleY(1); }
    .menu-close:hover .menu-close__inner { color: #fff; }
    .menu-close:hover .menu-close__inner span { background: #fff; }
    .menu-close:hover .menu-close__inner span:nth-of-type(1) { transform: rotate(45deg)  translateX(2.5px); }
    .menu-close:hover .menu-close__inner span:nth-of-type(2) { transform: rotate(-45deg) translateX(-2.5px); }
    .menu-close:hover .menu-close__inner span:nth-of-type(3) { transform: rotate(45deg)  translateX(-2px); }
    .menu-close:hover .menu-close__inner span:nth-of-type(4) { transform: rotate(-45deg) translateX(2px); }
}

/* 未展開 MENU */
@media (hover: hover) {
    .menu-open:hover {
        animation: menu-open-flicker 0.26s steps(1) forwards;
    }
}
@keyframes menu-open-flicker {
    0%        { background-color: #fda4af; } /* rose-300 */
    12%       { background-color: #fb7185; } /* rose-400 */
    24%       { background-color: #fda4af; }
    40%       { background-color: #fb7185; }
    55%       { background-color: #fda4af; }
    70%, 100% { background-color: #fb7185; } /* rose-400 で落ち着く */
}
</style>
