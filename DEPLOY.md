# 本番デプロイ手順（FTP / WinSCP）

CI を使わず、ローカルで本番ビルドして `dist/` を FTP（WinSCP 等）でアップロードする運用向けの手順です。

---

## 事前準備

### Node.js / npm

- **Node.js**: v18 以上を推奨
- **npm**: プロジェクトでは `npm install` / `npm run build` を前提に記載しています

### 環境変数ファイルの作成（必須）

本番ビルド時に Web3Forms の Access Key を読み込むため、**プロジェクトルート**に `.env.production.local` を用意します。

1. リポジトリルート（`package.json` がある場所）で、`.env.example` をコピーして `.env.production.local` を作成します。
   ```bash
   # Windows (PowerShell)
   Copy-Item .env.example .env.production.local

   # または手動でプロジェクトルートに .env.production.local を新規作成
   ```
2. `.env.production.local` を開き、プレースホルダを実際の値に置き換えます。
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=xxxxxxxx
   ```
   - **注意**: `.env.production.local` の実キーは**絶対に Git にコミットしないでください**。このファイルは `.gitignore` で除外されています。

---

## ローカルで本番ビルド

次のコマンドを**プロジェクトルート**で実行します。

```bash
npm install
npm run build
```

- **生成物**: `dist/` フォルダに、本番用の静的ファイルが出力されます。
  - `dist/index.html` … エントリの HTML
  - `dist/assets/` … JS・CSS・画像など（ハッシュ付きファイル名）
- この **`dist/` の中身だけ**を本番サーバーにアップロードします（`dist` フォルダごとではなく、中身のファイル・フォルダをアップロード）。

---

## ローカルで本番同等の表示確認

アップロード前に、ビルド結果をローカルで確認できます。

```bash
npx vite preview --host --port 4173
```

- ブラウザで `http://localhost:4173/` を開いて表示を確認します。
- `npm run build` で生成した `dist/` をそのまま配信している状態です。

---

## FTP（WinSCP）でアップロードするもの

- **アップロードする対象**: **`dist/` の中身だけ**です。
  - `dist/index.html` および `dist/assets/` 以下を、本番の「ドキュメントルート」にそのまま配置します。
- **アップロードしないもの**:
  - `.env` / `.env.production.local` 等の環境変数ファイルは**サーバーに置かない**でください。本番ではビルド済みの `dist/` のみを配信します。

### アップロード先の例

- **さくらインターネットの場合（一般例）**: `/home/<アカウント名>/www/`
  - レンタルサーバーの「公開ディレクトリ」に合わせてパスを変更してください。
- 他のレンタルサーバーでも、**Web のドキュメントルート**に `index.html` と `assets/` が来るようにアップロードします。

---

## ロールバック手順（最低限）

1. **差し替え前にバックアップ**
   - 本番サーバー上の現在の公開ディレクトリ（例: `www`）を、別名でコピーしておきます。
   - 例: `www_backup_20260220` のように日付入りでフォルダ名を付けると分かりやすいです。
2. **新しい `dist/` の中身をアップロード**
   - 上記「FTP でアップロードするもの」に従い、`dist/` の中身で本番を上書きします。
3. **問題があった場合**
   - バックアップしたフォルダの内容を、再度ドキュメントルートに戻して復旧します。

---

## まとめ（コピペ用）

```bash
# 1. 依存インストール
npm install

# 2. 本番ビルド（.env.production.local をプロジェクトルートに置いた状態で）
npm run build

# 3. ローカルで確認（任意）
npx vite preview --host --port 4173

# 4. dist/ の中身を WinSCP 等で本番のドキュメントルートにアップロード
```
