import type { Ref } from 'vue';

type Build = (scopeEl: HTMLElement) => void | (() => void);

export function useScrollReveal(scope: Ref<HTMLElement | null>, build: Build) {
    const gsap = useGsap();
    useScrollTrigger();

    let ctx: ReturnType<typeof gsap.context> | null = null;
    let cleanup: void | (() => void);

    onMounted(() => {
        const el = scope.value;
        if (!el) return;
        // reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        registerGsapEases();
        ctx = gsap.context(() => { cleanup = build(el); }, el);
    });

    onBeforeUnmount(() => {
        ctx?.revert();
        cleanup?.();
    });
}
