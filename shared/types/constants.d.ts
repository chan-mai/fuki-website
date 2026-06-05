// shared/constant.ts の構造化データに対応する型定義 (グローバル宣言)

/** 公式SNSのプラットフォーム名 */
type SocialPlatform = "Twitter" | "Bluesky" | "Misskey" | "Pixiv";

/** 公式SNSアカウント1件分の構造化データ */
interface SocialAccount {
    /** プラットフォーム表示名 */
    name: SocialPlatform;
    /** プロフィールURL */
    url: string;
    /** Iconifyのアイコン名 (例: simple-icons:x) */
    icon: string;
    /** ハンドルの完全表記 (例: @Fuuuuuki@misskey.io) */
    handle: string;
    /** ハンドルの短縮表記 (ヘッダー等の省スペース表示用) */
    shortHandle: string;
    /** アカウントの用途・説明 */
    description: string;
}

/** 料金表の1項目 */
interface PriceItem {
    /** 項目名 */
    label: string;
    /** 金額 */
    price: number;
    /** 金額の前に付けるprefix */
    prefix?: string;
}

/** 料金表のグループ (基本料金 / 追加料金 等) */
interface PriceGroup {
    /** グループ見出し */
    title: string;
    /** 項目一覧 */
    items: readonly PriceItem[];
}

/** サイト全体のメタ情報 */
interface SiteMeta {
    /** サイト名 (title / og:site_name) */
    name: string;
    /** ブランド名 (ロゴ表記など) */
    brand: string;
    /** 短い紹介文 (description / og:description) */
    description: string;
    /** キャッチコピー */
    tagline: string;
    /** 公開URL (末尾スラッシュ付き) */
    url: string;
    /** OGP画像の絶対URL */
    ogImage: string;
    /** OGロケール */
    locale: string;
    /** 著作権表記の開始年 */
    copyrightStartYear: number;
}
