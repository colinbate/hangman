<script lang="ts">
import { draw } from './betterdraw';
export let step = 0;
</script>

<svg
  viewBox="0 0 220 590"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xml:space="preserve"
>
  <path d="M5,580l0,-575l101.459,0l0,10" />
  {#if step > 0}<circle cx="106.459" cy="67.943" r="50" in:draw />{/if}
  {#if step > 1}<path d="M106.459,118.5l0,236.214" in:draw />{/if}
  {#if step > 2}<path d="M106.459,147.351l-80,138" in:draw />{/if}
  {#if step > 3}<path d="M106.459,147.351l80,138" in:draw />{/if}
  {#if step > 4}<path
      d="M106.459,354.714l-46.819,102.119l11.391,78.388"
      in:draw
    />{/if}
  {#if step > 5}<path
      d="M106.459,354.714l46.82,102.119l-11.391,78.388"
      in:draw
    />{/if}
  {#if step > 6}<path d="M71.098,535.221l-34.997,16.623" in:draw />{/if}
  {#if step > 7}<path d="M141.821,535.221l34.997,16.623" in:draw />{/if}
  {#if step > 8}
    <path
      d="M78.686,62.281l17.678,-17.678"
      in:draw={{ duration: 300, delay: 0 }}
    />
    <path
      d="M96.364,62.281l-17.678,-17.678"
      in:draw={{ duration: 300, delay: 305 }}
    />
    <path
      d="M112.191,62.281l17.678,-17.678"
      in:draw={{ duration: 300, delay: 610 }}
    />
    <path
      d="M129.869,62.281l-17.678,-17.678"
      in:draw={{ duration: 300, delay: 915 }}
    />
  {/if}
</svg>

<style>
svg {
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 1.5;
}
svg path,
svg circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 0.5rem;
}
</style>
