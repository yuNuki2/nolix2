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
const core = createLifeGame([50,50], { density: 0.5 });

// 糖衣構文
const core = LifeGame.create({ columns: 50, rows: 50 }, { density: 0.5 })
```