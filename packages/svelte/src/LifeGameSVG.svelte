<script lang="ts">
import type { LifeGameProps } from "./types";

const props: LifeGameProps = $props();
props.aliveColor;

let canvas: HTMLCanvasElement;

$effect(() => {});
</script>

<canvas bind:this={canvas} />
