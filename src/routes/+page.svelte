<script lang="ts">
  // import Video from '../components/Video.svelte';
  import NestVideo from '../components/NestVideo.svelte';
</script>

<svelte:head>
  <title>Jared Reisinger’s Office!</title>
</svelte:head>

<div class="side-by-side">
  <!-- https://video.nest.com/live/VuqBb1RtMN -->
  <NestVideo
    debug={false}
    streamHost="stream-us1-charlie.dropcam.com"
    uuid="9c06bf22fa9047559a39ced47953a9ec"
    chunklistId="w234108287"
    publicId="VuqBb1RtMN"
  />
  <!-- <Video
    debug
    src="https://livepeercdn.studio/hls/86d2ffdn93hrvwhk/index.m3u8"
    poster=""
  /> -->
  <div class="vertical temp-box">
    <div class="temp">temp info...</div>
    <div class="temp">temp info...</div>
    <div class="temp">temp info...</div>
    <div class="temp">temp info...</div>
  </div>
</div>

<style lang="scss">
  /* 
  h1,
  p {
    margin: 1rem;
  }
 */

  .side-by-side {
    display: flex;
    /* gap: 1rem; */
    /* margin-right: 1rem; */
  }

  .vertical {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* margin: 0 1rem; */
    /* margin-right: 1rem; */
  }

  .temp-box {
    margin: 1rem;
  }

  @media (max-width: 750px) {
    .side-by-side {
      flex-direction: column;
      /* margin-right: 0; */
    }

    .vertical {
      margin-left: 1rem;
    }
  }

  .temp {
    min-width: 10rem;
    min-height: 3rem;
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 0.5rem;
    padding: 0.25rem;
    background-color: hsl(0, 0%, 90%);
  }
</style>
