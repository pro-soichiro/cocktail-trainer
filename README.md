# Cocktail Trainer (React)

初心者バーテンダー向けのレシピ検索ボードを React + Vite + Tailwind CSS で構築したものです。検索・フィルタのみのシンプル構成です。

## 使い方

```sh
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

必要な Node.js のバージョンは 18 以上です。

## 構成

- `index.html`: Vite のエントリ
- `src/App.jsx`: 画面と検索・フィルタ
- `src/data.js`: レシピデータ
- `src/index.css`: スタイル

## 検索対象

検索欄は以下を対象に全文検索します。

- カクテル名
- 材料
- 備考

## データ更新

レシピは `src/data.js` に配列として保持しています。データの更新は `src/data.js` を直接編集してください。
