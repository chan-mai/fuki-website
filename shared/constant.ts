// サイト各所で共有する構造化データ
// 型定義は shared/types/constants.d.ts (グローバル宣言)

/** 公式SNSアカウント一覧 (X / Bluesky / Misskey / Pixiv) */
export const SOCIAL_ACCOUNTS: readonly SocialAccount[] = [
    {
        name: "Twitter",
        url: "https://x.com/fuuuuuki_0910",
        icon: "simple-icons:x",
        handle: "@fuuuuuki_0910",
        shortHandle: "@fuuuuuki_0910",
        description: "お問い合わせはこちら",
    },
    {
        name: "Bluesky",
        url: "https://bsky.app/profile/fuuuuki.bsky.social",
        icon: "simple-icons:bluesky",
        handle: "@fuuuuki.bsky.social",
        shortHandle: "@fuuuuki",
        description: "日常やイラストを投稿しています",
    },
    {
        name: "Misskey",
        url: "https://misskey.io/@Fuuuuuki",
        icon: "simple-icons:misskey",
        handle: "@Fuuuuuki@misskey.io",
        shortHandle: "@Fuuuuuki",
        description: "近況やラフを気軽に共有",
    },
    {
        name: "Pixiv",
        url: "https://www.pixiv.net/users/32685096",
        icon: "simple-icons:pixiv",
        handle: "fuki / user:32685096",
        shortHandle: "user:32685096",
        description: "完成イラストを掲載しています",
    },
];

/** お問い合わせ先 (Twitter) のURL */
export const CONTACT_URL: string = SOCIAL_ACCOUNTS.find((a) => a.name === "Twitter")!.url;

/** サイト全体のメタ情報 */
export const SITE: SiteMeta = {
    name: "fuki's website",
    brand: "fuki",
    description: "Hey 👋 I'm fuki",
    tagline: "Cute, bold, and a little bit extra.",
    url: "https://fuki.foo/",
    ogImage: "https://fuki.foo/icon.webp",
    locale: "ja_JP",
    copyrightStartYear: 2024,
};
