# Noli Noli

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
<img src="../../media/logo.svg" alt="noli2" style="height: 200px">
</div>

## Install 
```shell
npm i @noli2/core
```

## Usage
```ts
const core = createLifeGame([50,　50], { density: 0.5 });

// 糖衣構文
const core = LifeGame.create({ columns: 50, rows: 50 }, { density: 0.5 })
```

## API
### options

|name|type|default|description|
|-|-|-|-|
|defaultCells|`number[][]`|underined|初期値の座標の配列|
|density|`number`|0.4|初期セルの割合。`defaultCells` が設定されている場合は無効。|
|done|`(previousCells: Cell[][], currentCells: Cell[][] => boolean) \| false`|There is no difference between previous and current.|停止する条件。`false` を指定した場合、無限に処理を繰り返す。|
|historyLimit|`number`|0|履歴の長さの上限|
|seed|`string`|underined|シード付き乱数の生成に使用するシード|
|strategy|`"full" \| "diff"`|"full"|次の状態を計算する際に用いるロジック。`full` の場合、全盤面を走査する。`diff` の場合、変更可能性のあるセルを抽出し、計算する。|
|wasm|`boolean`|false|次の状態の計算にwasmを用いるかどうか|