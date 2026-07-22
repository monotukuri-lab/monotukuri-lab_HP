# 舞鶴高専 ものつくりラボ 公式サイト

Vue 3 / Vite で構築された舞鶴高専ものつくりラボの公式ウェブサイトです。

## このドキュメントについて

このREADMEはサイトの運営を引き継ぐTAやスタッフ向けに作成されています。
プログラミング初心者でも円滑に運営できるように、基本的な操作手順や編集方法を解説しています。

---

## クイックスタート

開発環境の準備とローカルサーバーの起動手順です。

### 必要なソフトウェア

事前に以下のツールをインストールしてください。

* Node.js 18以上 (公式サイト: https://nodejs.org/ )
* Git (公式サイト: https://git-scm.com/ )
* VSCode (推奨エディタ)

### 手順

* リポジトリのクローン
```bash
git clone https://github.com/monotukuri-lab/monotukuri-lab_HP
```

* 依存パッケージのインストール
```bash
npm install
```

* 開発サーバーの起動
```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセスするとサイトが表示されます。ファイルを保存すると変更内容が即座に反映されます。

---

## プロジェクト構造

主要なファイルおよびディレクトリの役割一覧です。

```
monotukuri-lab_HP/
├── index.html              # トップページ
├── pages/                  # 公開ページ
│   ├── activities.html     # 活動内容 / イベント一覧
│   ├── facility.html       # 施設 / 機材紹介
│   ├── members.html        # スタッフ紹介
│   ├── contact.html        # お問い合わせ
│   ├── game.html          # ミニゲーム
│   └── python.html        # Python実行環境
├── admin/                  # 管理者用ページ
│   ├── admin.html         # 管理ガイド
│   ├── secret.html        # 隠しページ
│   └── secret2.html       # 隠しページ
├── events/                 # 各イベントの詳細ページ
│   ├── 3dcontest2025.html
│   └── 3dprinter2025.html
├── images/                 # 画像ファイル
│   ├── staff/             # スタッフ写真
│   └── ...                # その他画像
├── css/
│   └── style.css          # 共通スタイル
├── js/
│   ├── mobile-menu.js     # モバイル用メニュー制御
│   └── vue-apps.js        # Vueアプリケーション
└── vite.config.js         # ビルド / ルーティング設定
```

---

## コンテンツの編集方法

よく行う更新作業の手順です。

### トップページのイベントバナー表示

編集対象ファイル: `index.html`

* `index.html` を開きます。
* 50行目付近にあるコメントアウトされたバナー記述を探します。

```html
<!-- イベント告知バナー
<div class="max-w-xl mx-auto mt-8 mb-6">
  <a href="events/your-event.html"
    class="block bg-blue-600 hover:bg-blue-700 text-white text-center text-lg font-bold rounded-xl shadow-lg px-6 py-5">
    <div>イベント名</div>
    <div class="mt-2">
      <span class="text-yellow-300 text-xl">日時情報</span>
    </div>
  </a>
</div>
-->
```

* コメントアウトタグ ( `<!--` および `-->` ) を削除します。
* リンク先 ( `href` ) やイベント名、日時を書き換えます。
* イベント終了後は再度コメントアウトして非表示にします。

---

### 新しいイベントページの追加

手順:

* `events/` ディレクトリ配下に新しいHTMLファイルを作成します。既存の `3dprinter2025.html` などを複製して作成するとスムーズです。
* ファイル内の本文や日時、詳細内容を編集します。
* `vite.config.js` に新しいページのルート設定を追加します。

```javascript
rollupOptions: {
  input: {
    main: resolve(__dirname, 'index.html'),
    // 既存ページ...
    
    // 新しいイベントページを追加
    newevent: resolve(__dirname, 'events/newevent2026.html'),
  }
}
```

* `npm run dev` を再起動して変更を適用します。

---

### スタッフ情報の更新

編集対象ファイル: `pages/members.html`

* `pages/members.html` を開きます。
* スタッフカードのコードブロックを探します。

```html
<div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
  <img src="../images/staff/staff1.jpg" alt="名前"
    class="w-32 h-32 object-cover rounded-full mb-4 border-4 border-blue-200">
  <h3 class="font-bold text-lg mb-1">氏名</h3>
  <p class="text-sm text-gray-600 mb-1">所属：専攻科 電気電子システム</p>
  <p class="text-sm text-gray-600 mb-1">技術提供：技術領域</p>
  <p class="text-sm text-gray-600 mb-1">担当曜日：月曜日</p>
  <p class="text-sm text-gray-700 mt-2">一言メッセージ</p>
</div>
```

* 氏名、所属、画像パス、担当曜日、メッセージなどを書き換えます。
* スタッフを新規追加する場合は、このカード要素を複製して追加します。

---

### 施設 / 機材情報の更新

編集対象ファイル: `pages/facility.html`

* `pages/facility.html` を開きます。
* 機材紹介の枠組みを探し、画像パス、機材名、説明文を書き換えます。

---

### 画像の追加

* 画像ファイルを `images/` ディレクトリ内に配置します。
  * スタッフ写真: `images/staff/`
  * イベント写真: `images/events/` など
* HTMLファイルから相対パスで参照します。

```html
<img src="../images/your-image.jpg" alt="説明">
```

画像サイズの推奨設定:
* 横幅 1200px 以下
* 形式 JPG または WebP
* ファイルサイズ 500KB 以下

---

## デプロイ方法

変更内容を本番サイトへ反映する手順です。

### 自動デプロイ

GitHubの main ブランチに変更をプッシュすると、GitHub Actions が自動でビルドおよび公開を行います。

```bash
git add .
git commit -m "更新内容のメッセージ"
git push origin main
```

プッシュ完了から約3分で本番サイトが更新されます。

### バージョンタグによる自動リリース

ビルド済み成果物をバージョンごとに保存する場合は、Gitタグを付与してプッシュします。

```bash
git tag v3.0.9
git push origin v3.0.9
```

GitHubの Releases ページに該当バージョンの成果物が自動生成されます。

### 手動ビルド

手動で静的ファイルを生成する場合は以下のコマンドを実行します。

```bash
npm run build
```

生成された dist/ ディレクトリ内のファイルを Web サーバーへ配置してください。

---

## トラブルシューティング

### `npm run dev` が失敗する場合

Node.jsのバージョンを確認してください。

```bash
node -v
```

バージョンが 18 未満の場合は、Node.jsを再インストールしてください。

また、以下の手順で依存パッケージを初期化して再インストールすることも有効です。

```bash
rm -rf node_modules package-lock.json
npm install
```

### ビルドエラーが発生する場合

* HTMLタグの閉じ忘れや文法エラーがないか確認します。
* `vite.config.js` に記載したファイルパスが正しいか確認します。

### 変更が反映されない場合

* ブラウザのスーパーリロード ( Ctrl + Shift + R ) を試します。
* 開発サーバーを再起動します。
* GitHubへプッシュが正常に完了しているか確認します。

---

## 運営チェックリスト

### 定期確認項目

* イベント終了後のバナー非表示処理
* 年度初めのスタッフ情報更新
* 新規導入機材の追加
* デッドリンクの確認
* バックアップ状態の確認

### イベント実施時の手順

イベント開催前:
* イベント詳細ページの作成
* トップページへの告知バナー掲載
* 各種案内 / 告知の実施

イベント終了後:
* 告知バナーの取り下げ
* 記録 / レポートの追加 (任意)
* バージョンタグのプッシュ (必要に応じて)

---

## ライセンス

MIT License

© 2025 舞鶴高専 ものつくりラボ
