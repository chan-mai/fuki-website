<script setup lang="ts">
    import { SOCIAL_ACCOUNTS, SITE } from '#shared/constant';

    const nowYear: string = (new Date).getFullYear().toString();
</script>

<template>
    <footer class="relative overflow-hidden bg-neutral-900 text-white">

        <!-- SVG decorative pattern (same as header overlay) -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="footer-pattern" x="0" y="0" width="72" height="72" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="5" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                    <circle cx="60" cy="8" r="2" fill="#fda4af" opacity="0.4"/>
                    <line x1="34" y1="28" x2="44" y2="28" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <line x1="39" y1="23" x2="39" y2="33" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <path d="M 8 58 L 14 48 L 20 58 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.5"/>
                    <path d="M 60 38 L 66 44 L 60 50 L 54 44 Z" fill="none" stroke="#fda4af" stroke-width="1" opacity="0.45"/>
                    <circle cx="48" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                    <circle cx="54" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                    <circle cx="60" cy="62" r="1.5" fill="#fda4af" opacity="0.35"/>
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#footer-pattern)"/>
        </svg>

        <!-- wavy top edge -->
        <div class="relative overflow-hidden leading-none">
            <svg viewBox="0 0 1200 40" xmlns="http://www.w3.org/2000/svg" class="w-full block text-neutral-900" preserveAspectRatio="none" style="margin-bottom: -2px;">
                <path d="M0,20 C150,40 350,0 600,20 C850,40 1050,0 1200,20 L1200,0 L0,0 Z" fill="white"/>
            </svg>
        </div>

        <!-- content -->
        <div class="relative z-10 max-w-5xl mx-auto px-8 pt-10 pb-8">

            <div class="grid md:grid-cols-[1fr_auto] gap-10 items-end">

                <!-- left: branding -->
                <div>
                    <p class="text-[11px] font-mono text-rose-400 tracking-widest mb-3">illustrator portfolio</p>
                    <div
                        class="text-4xl font-black tracking-wider uppercase mb-4"
                        style="color: transparent; -webkit-text-stroke: 1.5px #fda4af; filter: drop-shadow(2px 1px 0 rgba(134,239,172,0.5)) drop-shadow(-2px -1px 0 rgba(251,113,133,0.4));"
                    >{{ SITE.brand }}</div>
                    <p class="text-xs text-neutral-400 leading-relaxed max-w-xs">
                        {{ SITE.tagline }}
                    </p>
                </div>

                <!-- right: links -->
                <div class="flex flex-col gap-3 md:items-end">
                    <p class="text-[10px] font-mono text-rose-400 tracking-[0.3em] uppercase mb-1">Links</p>
                    <a
                        v-for="account in SOCIAL_ACCOUNTS"
                        :key="account.name"
                        :href="account.url"
                        target="_blank"
                        rel="noopener"
                        class="text-xs font-mono text-neutral-400 hover:text-rose-400 transition-colors tracking-wider"
                    >{{ account.name }} ↗</a>
                </div>

            </div>

            <!-- divider -->
            <div class="flex items-center gap-4 mt-10 mb-6">
                <div class="flex gap-[5px]">
                    <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-rose-400/40"></span>
                </div>
                <div class="flex-1 border-t border-neutral-700"></div>
                <div class="flex gap-[5px]">
                    <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-rose-400/40"></span>
                </div>
            </div>

            <!-- copyright -->
            <p class="text-center text-[10px] font-mono text-neutral-600 tracking-widest">
                © {{ SITE.copyrightStartYear }} – {{ nowYear }} {{ SITE.brand }} · All rights reserved.
            </p>

        </div>
    </footer>
</template>
