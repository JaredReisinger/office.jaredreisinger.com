<script lang="ts">
  import Icon from 'svelte-awesome';
  import chevronRight from 'svelte-awesome/icons/chevronRight';
  import chevronDown from 'svelte-awesome/icons/chevronDown';

  import NestVideo from '$lib/components/NestVideo.svelte';
  import SensorPush from '$lib/components/SensorPush.svelte';

  let showMore = false;
  let letterbox = false;

  $: videoClasses = letterbox
    ? 'object-contain'
    : 'object-cover object-left-bottom';
</script>

<svelte:head>
  <title>Jared’s Office!</title>
  <style>
    html,
    body,
    body > div {
      height: 100%;
    }
  </style>
</svelte:head>

<div class="relative w-full h-full bg-zinc-600 text-zinc-50">
  <!-- https://video.nest.com/live/VuqBb1RtMN -->
  <NestVideo publicId="VuqBb1RtMN" class={videoClasses} />
  <div
    class="absolute top-0 right-0 bg-zinc-600/60 p-4 rounded-bl-lg text-shadow flex flex-col gap-1 text-right xs:text-sm md:text-base lg:text-lg xl:text-xl"
  >
    <!-- <h3 class="font-bold mb-2">Jared’s office weather</h3> -->
    <SensorPush name="office" />
    <SensorPush name="humidor" />

    <div class="mt-2 text-right text-sm lg:text-base xl:text-base flex flex-col gap-2">
      <a
        role="button"
        class="text-blue-300 hover:text-blue-400 x-drop-shadow"
        href="#top"
        on:click={() => {
          showMore = !showMore;
        }}
        ><Icon data={showMore ? chevronDown : chevronRight} scale={0.75} /> more</a
      >
      {#if showMore}
        <label
          >letterboxed<input
            type="checkbox"
            class="ml-2 btn-toggle"
            checked={letterbox}
            on:click={() => {
              letterbox = !letterbox;
            }}
          /></label
        >
        <a class="text-blue-300 hover:text-blue-400" href="/about"
          >More about this site.</a
        >
      {/if}
    </div>
  </div>
</div>
