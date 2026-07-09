# yasuhiro-otani-website

Yasuhiro Otani 公式サイト（GitHub Pages 静的サイト）。

## デザイン方針

「ページごとにインパクトで惹きつける」— 巨大な太字タイポグラフィのヒーロー、白/黒の強いコントラスト、隅の小さな `MENU` トリガーから開くフルスクリーン型ナビ。音楽関連ページには WebGL（Three.js）によるマウス反応3Dオブジェクトとグリッチ演出、トップページは「深い静寂と張り詰めた音」を意識した静かな単色トーンにしている。

## 構成

- `index.html` — トップページ（WebGL背景 + 各セクションへの導線）
- `profile.html` — プロフィール（実写真使用）
- `artistic.html` — 音楽活動（受賞歴・代表的パフォーマンス・ディスコグラフィ〔Bandcamp / Apple Musicへのリンク〕・既存プロジェクト「Thresholds」アーカイブへのリンク、実写真使用）
- `commercial.html` — 商業作曲（作曲家としての商業活動：映画・ラジオ・TV向けの音楽制作。料金は個別相談）
- `lessons/index.html` — 作曲教室（教育：ギター / DTMコース紹介、授業で使用しているリポジトリ一覧）
- `lessons/mv-song-template.html` — 教材ページ（[pb5/mv_song_templete](https://github.com/pb5/mv_song_templete) の「ワンループ×レイヤー構成 MV系楽曲テンプレ（実測版）」を組み込み）
- `contact.html` — お問い合わせ（Formspree経由でフォーム送信）
- footer — 全ページ共通で Facebook / Bandcamp / Apple Music へのリンクを設置（プロモ用の見せ方として）
- `css/style.css` — 共通デザインシステム（Noto Sans JP + DM Mono、ダーク/ライト両対応）
- `js/main.js` — フルスクリーンナビの開閉、グリッチテキストの初期化
- `js/blob-bg.js` — Three.js製、マウス反応のワイヤーフレーム3Dオブジェクト背景（ページごとに色・速度・グリッチ有無を指定可能）
- `js/vendor/` — Three.js本体をローカルにバンドル（CDN非依存）
- `images/` — 実写真（ポートレート・演奏風景）
- `CNAME` — カスタムドメイン設定（yasuhiro-otani.com）

## 公開（GitHub Pages）

リポジトリの Settings → Pages で Source を「Deploy from a branch」、ブランチをこのリポジトリのデフォルトブランチ / ルート (`/`) に設定してください。`CNAME` によりカスタムドメイン `yasuhiro-otani.com` で公開されます。

## プレースホルダーについて

現時点で `⚠ PLACEHOLDER` の明記が必要な項目はありません。Max/MSPのパッチ自体は非公開のため制作歴の説明にとどめ、音源はBandcamp / Apple Musicへのリンクのみで案内しています。
