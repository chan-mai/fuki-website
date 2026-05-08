<script setup lang="ts">
const isOpen = ref(false)
const close = () => { isOpen.value = false }

// ページ遷移時に閉じる
const router = useRouter()
router.afterEach(() => { isOpen.value = false })
</script>

<template>
    <!-- MENU / CLOSE button (fixed top-left) -->
    <div class="fixed top-0 left-0 z-50">
        <button
            @click="isOpen = !isOpen"
            :aria-label="isOpen ? 'メニューを閉じる' : 'メニューを開く'"
            class="flex flex-col items-center justify-center gap-2 w-[100px] py-5 select-none cursor-pointer text-white"
            :class="isOpen ? 'bg-rose-400' : 'bg-rose-300'"
            style="clip-path: polygon(0 0, 100% 0, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0 100%)"
        >
            <!-- dots -->
            <div class="flex gap-[5px]">
                <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-white/60"></span>
            </div>

            <!-- label / icon -->
            <span v-if="!isOpen" class="font-bold text-[11px] tracking-[0.35em]">MENU</span>
            <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-white">
                <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>

            <!-- dots -->
            <div class="flex gap-[5px]">
                <span v-for="n in 7" :key="n" class="block w-[3px] h-[3px] rounded-full bg-white/60"></span>
            </div>
        </button>
    </div>

    <!-- full-screen overlay -->
    <Teleport to="body">
        <Transition name="menu-overlay">
        <div
            v-if="isOpen"
            class="fixed inset-0 z-40 bg-rose-100 flex items-center overflow-hidden"
        >
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
            <div class="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-16 pt-24 pb-10">

                <!-- tagline -->
                <p class="text-[11px] font-mono text-rose-400 tracking-widest leading-loose mb-10">
                    Illustrator Portfolio<br/>
                    Provide customers with valuable inspiration<br/>
                    through attractive illustrations.
                </p>

                <div class="grid md:grid-cols-[1fr_auto] gap-12 items-start">

                    <!-- nav links -->
                    <nav>
                        <ul class="flex flex-col gap-1 mb-8">
                            <li>
                                <NuxtLink
                                    to="/"
                                    class="block font-black text-4xl md:text-6xl tracking-wider uppercase text-neutral-800 hover:text-rose-400 transition-colors leading-tight"
                                >HOME</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink
                                    to="/"
                                    class="block font-black text-4xl md:text-6xl tracking-wider uppercase text-neutral-800 hover:text-rose-400 transition-colors leading-tight"
                                >WORKS</NuxtLink>
                            </li>
                        </ul>

                        <!-- secondary -->
                        <div class="flex flex-col gap-2 mt-6">
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
                        <p class="text-[10px] font-mono text-rose-400 tracking-[0.3em] uppercase">Official SNS</p>

                        <NuxtLink
                            v-for="account in [
                                { name: 'X',       handle: '@fuuuuuki_0910', url: 'https://x.com/fuuuuuki_0910',                  icon: 'simple-icons:x'       },
                                { name: 'Bluesky', handle: '@fuuuuki',        url: 'https://bsky.app/profile/fuuuuki.bsky.social', icon: 'simple-icons:bluesky' },
                                { name: 'Misskey', handle: '@Fuuuuuki',       url: 'https://misskey.io/@Fuuuuuki',                  icon: 'simple-icons:misskey' },
                                { name: 'Pixiv',   handle: 'user:32685096',   url: 'https://www.pixiv.net/users/32685096',          icon: 'simple-icons:pixiv'   },
                            ]"
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
                                <div class="text-[10px] font-mono text-rose-400">{{ account.handle }}</div>
                            </div>
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.menu-overlay-enter-active,
.menu-overlay-leave-active {
    transition: clip-path 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.menu-overlay-enter-from,
.menu-overlay-leave-to {
    clip-path: polygon(0 0, 100% 0, 100% 35%, 72% 35%, 72% 65%, 45% 65%, 45% 100%, 0 100%);
}
.menu-overlay-enter-to,
.menu-overlay-leave-from {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 0 100%);
}
</style>
