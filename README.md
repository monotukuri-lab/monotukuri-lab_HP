# 舞鶴高専 ものつくりラボ 公式サイト

Vue 3 と Vite で構築した舞鶴高専ものつくりラボの公式Webサイトです。
このドキュメントでは、GitHub Actions を活用した開発環境の準備から、ページの更新、自動デプロイまでの運用手順を解説します。

## 概要

サイトは Vite を用いてビルドされ、GitHub Actions を通じて GitHub Pages に自動デプロイされます。

## 開発環境の準備

ローカル環境でサイトの動作確認や編集を行うための手順です。

### 必要なソフトウェア

事前に以下のツールをインストールしてください。

* Node.js 20以上
* Git
* Visual Studio Code

### セットアップ手順

* リポジトリをクローンします
```bash
git clone https://github.com/monotukuri-lab/monotukuri-lab_HP.git
cd monotukuri-lab_HP
```

* 依存パッケージをインストールします
```bash
npm install
```

* 開発サーバーを起動します
```bash
npm run dev
```

ブラウザで http://localhost:5173 にアクセスするとサイトが表示されます。ファイルを編集して保存すると、ブラウザに変更内容が即座に反映されます。

## ディレクトリ構成

主要なファイルやフォルダの役割です。

* index.html: トップページ
* pages/: 公開ページ群
* pages/activities.html: 活動内容とイベント一覧
* pages/facility.html: 施設や機材の紹介
* pages/members.html: スタッフ紹介
* pages/contact.html: お問い合わせフォーム
* pages/game.html: ミニゲームページ
* pages/python.html: ブラウザ上でのPython実行環境
* events/: 各イベント専用の詳細ページ
* events/3dcontest2025.html: 2025年3Dコンテスト
* events/3dcontest2026.html: 2026年3Dコンテスト
* events/3dprinter2025.html: 2025年3Dプリンター講習会
* admin/: 管理者向けページ群
* admin/admin.html: 管理ガイド
* images/: 写真やロゴなどの画像ファイル
* css/style.css: サイト全体の共通スタイル
* js/: JavaScriptスクリプト群
* vite.config.js: Viteのマルチページビルド設定ファイル
* .github/workflows/build-and-release.yml: 自動ビルド / デプロイ / リリース用のワークフロー

## サイトの更新手順

日常的に行う更新作業の手順です。

### トップページのイベント告知バナー

編集対象ファイル: index.html

* index.html を開きます。
* 70行目付近にあるコメントアウトされたバナー記述を探します。
* コメントタグを解除し、リンク先URLやイベント名、開催日時を書き換えます。
* イベント終了後は再度コメントアウトして非表示に戻します。

### 新しいページの追加

* pages/ または events/ ディレクトリ内にHTMLファイルを作成します。既存のファイルを複製して編集するとスムーズです。
* vite.config.js の rollupOptions.input に新しいページのパスを追加します。追加を忘れると本番用ビルドに含まれません。

```javascript
rollupOptions: {
  input: {
    main: resolve(__dirname, 'index.html'),
    // 既存ページ...
    
    // 新しいページを追加
    newevent: resolve(__dirname, 'events/newevent2026.html'),
  }
}
```

* 開発サーバーを再起動して、ページが正しく表示されるか確認します。

### スタッフ情報の更新

編集対象ファイル: pages/members.html

* pages/members.html を開きます。
* 各スタッフのカード要素を探します。
* 氏名、所属、写真、担当曜日、メッセージを書き換えます。
* 新しいスタッフを追加する場合は、カード要素を複製して追加します。

### 機材情報の更新

編集対象ファイル: pages/facility.html

* pages/facility.html を開きます。
* 機材紹介の枠組みを探し、写真や機材名、説明文を書き換えます。

### 画像ファイルの追加

* 画像ファイルは images/ ディレクトリ内の適切な場所に保存します。
* HTMLファイルからは相対パスで参照します。
* 画像サイズは横幅1200px以下、ファイルサイズは500KB以下を目安に圧縮してください。

## 公開とデプロイの運用

GitHub Actions による自動化を活用した運用手順です。

### 自動デプロイによるサイト公開

main ブランチに変更をプッシュすると、GitHub Actions が自動で起動してビルドを行い、GitHub Pages に公開します。
手動でサーバーにファイルをアップロードする必要はありません。

```bash
git add .
git commit -m "更新内容を記述"
git push origin main
```

プッシュ完了後、数分で本番サイトへ反映されます。
進捗状況は GitHub リポジトリの Actions タブから確認できます。

### バージョンタグによる自動リリース

配布用やバックアップとして成果物を保存したい場合は、バージョンタグをプッシュします。

```bash
git tag v3.1.3
git push origin v3.1.3
```

GitHub Actions が自動で dist フォルダを zip 形式に圧縮し、GitHub の Releases ページに配布ファイルを添付したリリースを生成します。

### パッケージ更新時の注意点

GitHub Actions のワークフローでは npm ci を実行して依存関係を復元します。
ライブラリを追加または更新した場合は、package.json と一緒に package-lock.json も必ずコミットしてプッシュしてください。不整合があるとビルドに失敗します。

### 手動でのビルド確認

ローカル環境で本番と同じ静的ファイルを生成して検証する場合は、以下のコマンドを実行します。

```bash
npm run build
npm run preview
```

dist ディレクトリに生成された成果物が preview サーバーで動作確認できます。

## トラブルシューティング

### 開発サーバーが起動しない場合

Node.js のバージョンを確認してください。

```bash
node -v
```

バージョンが 20 未満の場合はアップデートしてください。
また、以下のコマンドでパッケージを再インストールすると解決する場合があります。

```bash
rm -rf node_modules package-lock.json
npm install
```

### 追加したページが本番で表示されない場合

* vite.config.js の rollupOptions.input に該当ファイルが正しく登録されているか確認してください。
* ファイルパスの綴りや拡張子が合っているか確認してください。

### GitHub Actions のビルドが失敗する場合

* リポジトリの Actions タブで失敗したステップのログを確認してください。
* package.json と package-lock.json のバージョン差分がないか確認してください。
* HTML や JavaScript の構文エラーがないか確認してください。

## 運用チェックリスト

### 定期的な確認事項

* 終了したイベントバナーの非表示
* 新年度のスタッフ情報の更新
* 新規導入された機材情報の掲載
* 外部リンクや内部リンクのリンク切れ確認

### イベント開催時の流れ

* イベント詳細ページの作成
* vite.config.js へのページ登録
* トップページへの告知バナーの掲載
* イベント終了後のバナー非表示処理
* 必要に応じたバージョンタグのプッシュ

## ライセンス

MIT License
(c) 舞鶴高専 ものつくりラボ
