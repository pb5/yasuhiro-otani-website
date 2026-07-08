# yasuhiro-otani-website

Yasuhiro Otani 公式サイト（GitHub Pages 静的サイト）。

## 構成

- `index.html` — トップページ
- `profile.html` — プロフィール
- `artistic.html` — 音楽活動（音楽家としての芸術活動：演奏・自主制作楽曲・Max/MSPサウンド作品）
- `commercial.html` — 商業作曲（作曲家としての商業活動：BGM・CM・映像音楽などのクライアントワーク）
- `lessons/index.html` — 作曲教室（教育：ギター / DTMコース紹介）
- `lessons/mv-song-template.html` — 教材ページ（[pb5/mv_song_templete](https://github.com/pb5/mv_song_templete) の「ワンループ×レイヤー構成 MV系楽曲テンプレ（実測版）」を組み込み）
- `contact.html` — お問い合わせ
- `css/style.css` — 共通デザインシステム（ダークテーマ + グラデーション、Noto Sans JP / Bebas Neue / DM Mono）
- `js/main.js` — モバイルナビの開閉制御
- `CNAME` — カスタムドメイン設定（yasuhiro-otani.com）

## 公開（GitHub Pages）

リポジトリの Settings → Pages で Source を「Deploy from a branch」、ブランチをこのリポジトリのデフォルトブランチ / ルート (`/`) に設定してください。`CNAME` によりカスタムドメイン `yasuhiro-otani.com` で公開されます。

## 未確定のプレースホルダー

以下は実データ未確認のため、ページ内に `⚠ PLACEHOLDER` として明記しています。公開前に差し替えてください。

- `profile.html` — プロフィール写真・経歴文
- `artistic.html` / `commercial.html` — 作品タイトル・音源リンク・制作実績・料金
- `contact.html` — フォーム送信先（Formspree等のエンドポイント）またはメールアドレス
