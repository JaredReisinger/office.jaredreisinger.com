<script lang="ts">
  import NestVideo from '$lib/components/NestVideo.svelte';
  import SensorPush from '$lib/components/SensorPush.svelte';

  let letterbox = false;

  const coverPos = 'bottom left';

  let fit = 'cover';
  let position = coverPos;

  $: fit = letterbox ? 'contain' : 'cover';
  $: position = letterbox ? 'top left' : coverPos;
</script>

<svelte:head>
  <title>Jared’s Office!</title>
  <style lang="css">
    html,
    body,
    body > div {
      height: 100%;
    }
  </style>
</svelte:head>

<div class="wrapper">
  <!-- https://video.nest.com/live/VuqBb1RtMN -->
  <NestVideo publicId="VuqBb1RtMN" {fit} {position} />
  <div class="vertical temp-box">
    <h3>Current office weather</h3>
    <SensorPush name="office" />
    <SensorPush name="humidor" />

    <button
      on:click={() => {
        letterbox = !letterbox;
      }}>letterboxing {letterbox ? 'on' : 'off'}</button
    >
    <div class="meta">
      <a href="/about">More about this site.</a>
    </div>
  </div>
</div>

<style lang="scss">
  .wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    /* see https://oklch.com/#32.11,0,0,100 */
    /* background-color: rgb(51, 51, 51); */
    background-color: oklch(32.11% 0 0);
    color: white;
  }

  .vertical {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .temp-box {
    position: absolute;
    top: 0;
    right: 0;
    /* min-width: 15rem; */
    background-color: oklch(32.11% 0 0 / 60%);
    padding: 1rem;
    border-bottom-left-radius: 0.5rem;
    /* text-shadow to help legibility over video, multiple times for saturation */
    text-shadow:
      0 0 5px black,
      0 0 5px black,
      0 0 5px black;

    button {
      margin-top: 1em;
      /* background-color: oklch(50% 0.1 235); */
      /* background-color: oklch(75% 0.1 235); */
      background-color: oklch(50% 0 0 / 80%);
      color: inherit;
      border: none;
      /* border: 1px solid transparent; */
      padding: 0.5em 1em;
      border-radius: 0.5em;
      align-self: flex-end;

      &:hover {
        /* background-color: oklch(32.11% 0 0 / 90%); */
        background-color: oklch(75% 0.1 235);
        /* border: 1px solid oklch(75% 0.1 235); */
      }
    }

    /* need a lighter link color over dark  */
    a {
      color: oklch(75% 0.1 235);
    }
  }

  .meta {
    margin-top: 1rem;
    font-size: 84%;
    text-align: right;
  }
</style>
