<script lang="ts">
  import Hls from 'hls.js';

  export let src: string;
  export let poster: string;

  export let fit: string | undefined = 'cover';
  export let position: string | undefined = undefined;

  export let debug = false;
  export let dummy = false;

  let video: HTMLVideoElement;
  let logMsgs: string[] = [];

  function log(msg: string) {
    const length = logMsgs.push(msg);
    if (length > 10) {
      logMsgs = logMsgs.slice(-10);
    }
    logMsgs = logMsgs;
  }

  $: {
    if (video && Hls) {
      const canPlayNative =
        video.canPlayType('application/x-mpegURL') ||
        video.canPlayType('application/vnd.apple.mpegurl');

      log(`canPlayNative? ${JSON.stringify(canPlayNative)}`);
      log(`HLS? ${JSON.stringify(Hls.isSupported())}`);

      if (canPlayNative) {
        log('native supported, nothing else to do');
        // video.src = src;
        // video.addEventListener("loadedmetadata", () => {
        //   log("native loaded metadata, playing!");
        //   video.play();
        // });
      } else if (Hls.isSupported()) {
        log('hls is supported, using that in lieu of native');
        const hls = new Hls({
          debug,
          liveDurationInfinity: true,
          // using the WebWorker seems to have issues (for now)
          enableWorker: false,
          // lowLatencyMode: true,
          // no text-track stuff!
          enableDateRangeMetadataCues: false,
          enableEmsgMetadataCues: false,
          enableID3MetadataCues: false,
          enableWebVTT: false,
          enableIMSC1: false,
          enableCEA708Captions: false,
        });

        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          log('video and hls.js are now bound together');
        });

        // start playing as soon as the manifest is parsed
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          log('hls manifest parsed, playing?');
          video.play();
        });

        hls.on(Hls.Events.ERROR, (_, { type, details, fatal }) => {
          console.log('HLS error', { type, details, fatal });
          log(`HLS error${fatal ? ' (fatal)' : ''}: ${type}: ${details}`);
          // switch (details) {
          //   case Hls.ErrorDetails.FRAG_LOAD_ERROR:
          //     // ....
          //     break;
          //   default:
          //     break;
          // }
        });

        hls.attachMedia(video);
        // The loadSource() line seems necessary, even if the <video> element
        // already has the src listed... this is perhaps an hls.js thing?
        hls.loadSource(src);
      } else {
        log('cannot play at all');
      }
    }
  }
</script>

<div class="wrapper fill-parent">
  <div class="live">LIVE</div>
  <!-- svelte-ignore a11y-media-has-caption -->
  {#if dummy}
    <div class="dummy"><div>[video goes here]</div></div>
  {:else}
    <video
      bind:this={video}
      class="fill-parent"
      style:object-fit={fit}
      style:object-position={position}
      controls
      preload="auto"
      muted
      autoplay
      playsinline
      {src}
      {poster}
    >
      <p>Sorry, your browser does not support embedded videos.</p>
    </video>
  {/if}

  {#if debug}
    <div class="debug">
      {#each logMsgs as msg}
        <div>{msg}</div>
      {/each}
    </div>
  {/if}
</div>

<style type="scss">
  .fill-parent {
    width: 100%;
    height: 100%;
  }

  .wrapper {
    position: relative;
  }

  .live {
    position: absolute;
    z-index: 100;
    background-color: hsl(200, 100%, 50%);
    color: white;
    font-family: sans-serif;
    font-size: 80%;
    /* font-weight: 600; */
    letter-spacing: 0.025em;
    margin: 0.75em;
    padding: 0 0.5em;
    border-radius: 0.25em;
  }

  video {
    display: block;
  }
  
  .dummy {
    width: 100%;
    height: 100%;
    /* fake content color */
    background-color: oklch(60% 20% 0);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid red;
    /* aspect-ratio: 1.6; */
    font-size: 2rem;
  }

  .debug {
    position: absolute;
    top: 0;
    left: 3%;
    background-color: hsl(0, 0%, 90%);
    padding: 1em 0.5em 0.5em;
    font-size: 70%;

    /* div {
      margin-bottom: 0.25em;
    } */
  }
  /* nested isn't working? */
  .debug div {
    margin-bottom: 0.25em;
  }
</style>
