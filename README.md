# Cocktail Trainer

初心者バーテンダー向けのレシピ検索ボードです。

## 構成

- `index.html`: 画面
- `styles.css`: スタイル
- `app.js`: 検索・フィルタのロジック
- `data.js`: レシピデータ（JSON 形式の配列を `window.RECIPES` に展開）

## 検索の対象

検索欄は以下を対象に全文検索します。

- カクテル名
- 材料
- 備考
