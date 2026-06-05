import Lenis from 'lenis';

// 慣性スクロール (Lenis) を初期化し、GSAP ScrollTrigger と同期させる。client 限定 (window 依存)。
// gsap-nuxt-module は enforce:'post' で ScrollTrigger を非同期登録するため、dependsOn で登録完了を待つ。
export default defineNuxtPlugin({
    name: 'lenis',
    dependsOn: ['gsap-nuxt-module'],
    setup(nuxtApp) {
        // reduced-motion 時は無効化してネイティブスクロールのまま
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const gsap = useGsap();
        const ScrollTrigger = useScrollTrigger();

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),   // expo out
            // wheel はスムーズ / touch はネイティブ (Lenis のデフォルト)
        });

        // ScrollTrigger と同期: スクロールで update、ticker で raf を駆動
        lenis.on('scroll', () => ScrollTrigger.update());
        gsap.ticker.add((time: number) => lenis.raf(time * 1000));   // ticker は秒、lenis.raf は ms
        gsap.ticker.lagSmoothing(0);

        // メニュー等から stop/start するため公開
        nuxtApp.provide('lenis', lenis);

        // ページ遷移時は先頭へ + トリガー位置を再計算
        nuxtApp.hook('page:finish', () => {
            lenis.scrollTo(0, { immediate: true });
            ScrollTrigger.refresh();
        });
    },
});
