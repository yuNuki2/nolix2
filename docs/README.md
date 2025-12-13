# NoLi NoLi

[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

<div align="center">
<img src="../media/logo.svg" alt="noli2" style="height: 200px">
</div>

## Install 
```shell copy
npm i @noli2/react
```

## Features / Loadmap
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
aaa
</div>
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
bbb
</div>
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
aaa
</div>
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
bbb
</div>
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
aaa
</div>
<div>
<input type="checkbox" checked style="accent-color: #64f0b4;transform: scale(1.25)">
bbb
</div>

## Usage

オプションは設けていませんが、背景にライフゲームを表示させるのは容易いことです。styleにdisplay:absolute; inset:0;z-index: -1;opacity: 50を指定するだけです。

### カスタムレンダラー
いちいちcoreをインストールしなくていいように、ヘルパー関数を用意している。

## Dependencies
```mermaid
graph BT
  core["@noli2/core"] 
  processor["@noli2/processor"]
  renderer["@noli2/renderer"] 
  worker["@noli2/worker"] 

  subgraph Renderers
    dom["@noli2/dom"]
    lit["@noli2/lit"]
    react["@noli2/react"]
    svelte["@noli2/svelte"]
  end

  patterns["@noli2/patterns"]

  dom --> core
  dom --> processor
  dom --> renderer
  dom --> worker
  lit --> core
  lit --> processor
  lit --> renderer
  lit --> worker
  processor --> core
  react --> core
  react --> processor
  react --> renderer
  react --> worker
  svelte --> core
  svelte --> processor
  svelte --> renderer
  svelte --> worker
  worker --> core
  worker --> processor
  worker --> renderer
```

## Naming
"NO GAME NO LIFE" -> No LifeGame No Life -> NoLiNoli -> noli2
好きに呼べばいいですが、開発者は「ノラノラ」と呼びます。