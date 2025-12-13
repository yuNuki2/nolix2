# Noli Noli

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
<img src="../../media/logo.svg" alt="noli2" style="height: 200px">
</div>

## Install 
```shell
npm i @noli2/processor
```

## Usage
```ts
const core = createLifeGame([50, 50]);
const processor = createLifeGameProcessor(core, { interval: 500 })

// 糖衣構文
const processor = LifeGameProcessor.create(core, { interval: 500 })
```