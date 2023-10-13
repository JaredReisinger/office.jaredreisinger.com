<script lang="ts">
  import Video from './Video.svelte';

  export let publicId: string;

  export let fit: string | undefined = 'cover';
  export let position: string | undefined = undefined;

  export let debug = false;
  export let dummy = false;

  // To discover the needed values for the stream host, uuid, chunklist, and
  // public ID, use the `dropcam/cameras.get_by_public_token` API.  This doesn't
  // support non-Nest CORS, so we bypass CORS using corsproxy.io.  In general,
  // you should completely freak out upon seeing this: we're putting a *LOT* of
  // trust in the proxy (which we do not control), and it *could* do anything.
  // That said: the only thing we're passing is a public camera ID, and the
  // response is JSON (not JSONP), so we don't do something dumb like `eval()`
  // it.
  $: infoUrl = `https://corsproxy.io/?https://video.nest.com/api/dropcam/cameras.get_by_public_token?token=${publicId}`;

  let src: string;
  let poster: string;

  $: {
    log(`using info ${infoUrl}`);

    async function getInfo() {
      const response = await fetch(infoUrl);
      // console.log('response', response);
      if (response.ok) {
        const info = await response.json();
        // console.log('info', info);
        if (Array.isArray(info.items) && info.items.length === 1) {
          const {
            nexus_api_nest_domain_host: posterHost,
            live_stream_host: streamHost,
            uuid,
          } = info.items[0];

          src = `https://${streamHost}/nexus_aac/${uuid}/playlist.m3u8?public=${publicId}`;
          poster = `https://${posterHost}/get_image?uuid=${uuid}&width=1280&public=${publicId}`;

          log(`using src ${src}`);
          log(`using poster ${poster}`);
        }
      }
    }

    getInfo();
  }

  // let video: HTMLVideoElement;
  let logMsgs: string[] = [];

  function log(msg: string) {
    const length = logMsgs.push(msg);
    if (length > 10) {
      logMsgs = logMsgs.slice(-10);
    }
    logMsgs = logMsgs;
  }
</script>

<div class="wrapper fill-parent">
  {#if src && poster}
    <Video {src} {poster} {fit} {position} {debug} {dummy} />
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

  .debug {
    position: absolute;
    bottom: 0;
    right: 0;
    /* background-color: hsl(0, 0%, 90%); */
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
