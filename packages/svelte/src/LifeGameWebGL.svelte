<script lang="ts">
  import type { LifeGameProps } from "./types";

  let props: LifeGameProps = $props();
  props.aliveColor;

  let canvas: HTMLCanvasElement;

  $effect(() => {});
</script>

<canvas bind:this={canvas} />
