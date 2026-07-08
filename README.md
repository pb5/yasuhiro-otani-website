# yasuhiro-otani-website

Yasuhiro Otani 公式サイト（GitHub Pages 静的サイト）。

## デザイン方針

「ページごとにインパクトで惹きつける」— 巨大な太字タイポグラフィのヒーロー、白/黒の強いコントラスト、隅の小さな `MENU` トリガーから開くフルスクリーン型ナビ。音楽関連ページには WebGL（Three.js）によるマウス反応3Dオブジェクトとグリッチ演出、トップページは「深い静寂と張り詰めた音」を意識した静かな単色トーンにしている。

## 構成

- `index.html` — トップページ（WebGL背景 + 各セクションへの導線）
- `profile.html` — プロフィール（実写真使用）
- `artistic.html` — 音楽活動（音楽家としての芸術活動：演奏・自主制作楽曲・Max/MSPサウンド作品・既存プロジェクト「Thresholds」アーカイブへのリンク、実写真使用）
- `commercial.html` — 商業作曲（作曲家としての商業活動：BGM・CM・映像音楽などのクライアントワーク）
- `lessons/index.html` — 作曲教室（教育：ギター / DTMコース紹介、授業で使用しているリポジトリ一覧）
- `lessons/mv-song-template.html` — 教材ページ（[pb5/mv_song_templete](https://github.com/pb5/mv_song_templete) の「ワンループ×レイヤー構成 MV系楽曲テンプレ（実測版）」を組み込み）
- `contact.html` — お問い合わせ
- `css/style.css` — 共通デザインシステム（Noto Sans JP + DM Mono、ダーク/ライト両対応）
- `js/main.js` — フルスクリーンナビの開閉、グリッチテキストの初期化
- `js/blob-bg.js` — Three.js製、マウス反応のワイヤーフレーム3Dオブジェクト背景（ページごとに色・速度・グリッチ有無を指定可能）
- `js/vendor/` — Three.js本体をローカルにバンドル（CDN非依存）
- `images/` — 実写真（ポートレート・演奏風景）
- `CNAME` — カスタムドメイン設定（yasuhiro-otani.com）

## 公開（GitHub Pages）

リポジトリの Settings → Pages で Source を「Deploy from a branch」、ブランチをこのリポジトリのデフォルトブランチ / ルート (`/`) に設定してください。`CNAME` によりカスタムドメイン `yasuhiro-otani.com` で公開されます。

## 未確定のプレースホルダー

以下は実データ未確認のため、ページ内に `⚠ PLACEHOLDER` として明記しています。公開前に差し替えてください。

- `profile.html` — 経歴文
- `artistic.html` / `commercial.html` — 作品タイトル・音源リンク・制作実績・料金
- `contact.html` — フォーム送信先（Formspree等のエンドポイント）またはメールアドレス
- `lessons/index.html` — メディア制作の授業で使用しているリポジトリ
