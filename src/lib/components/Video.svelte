<script lang="ts">
  import Hls from 'hls.js';

  export let src: string;
  export let poster: string;

  let classes: string = 'object-contain';
  export { classes as class }

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

<div class="relative w-full h-full">
  <div class="absolute m-3 px-2 bg-cyan-500 text-zinc-50 rounded font-sans not-italic text-sm tracking-wider">LIVE</div>
  {#if dummy}
    <img
      alt="video placeholder"
      src="/video-placeholder.png"
      class={'w-full h-full ' + classes}
    />
  {:else}
    <video
      bind:this={video}
      class={'w-full h-full ' + classes}
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

  {#if debug && !dummy}
    <div class="debug-box left-0 bottom-0">
      {#each logMsgs as msg}
        <div>{msg}</div>
      {/each}
    </div>
  {/if}
</div>
