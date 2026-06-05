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

/** お問い合わせ先のURL */
export const CONTACT_URL: string = SOCIAL_ACCOUNTS.find((a) => a.name === "Twitter")!.url;

/** イラスト料金表 */
export const PRICING: readonly PriceGroup[] = [
    {
        title: "基本料金",
        items: [
            { label: "バストアップ", price: 4500 },
            { label: "上半身", price: 6000 },
            { label: "立ち絵(全身絵)", price: 10000 },
            { label: "SDキャラ", price: 5000 },
        ],
    },
    {
        title: "追加料金",
        items: [
            { label: "表情差分", price: 500, prefix: "1つ毎 +" },
            { label: "簡易背景", price: 1000 },
            { label: "キャラデザイン", price: 5000 },
            { label: "三面図", price: 17000 },
            { label: "早期納品", price: 1000 },
        ],
    },
];

/** 料金に関する補足 */
export const PRICING_NOTE: readonly string[] = [
    "背景は技術的な問題により簡易的なものになります。",
    "上記以外の内容も諸々ご相談・要交渉です。",
];

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
