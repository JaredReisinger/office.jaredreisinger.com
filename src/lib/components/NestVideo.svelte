<script lang="ts">
  import { afterUpdate } from 'svelte';
  import Video from './Video.svelte';

  export let publicId: string;

  let classes: string = 'object-contain';
  export { classes as class };

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

  afterUpdate(() => {
    getInfo(infoUrl);
  });

  let urlPrev: string;
  async function getInfo(url: string) {
    if (dummy) {
      src = 'UNUSED';
      poster = 'UNUSED';
      return;
    }
    if (url === urlPrev) {
      log('same url, ignoring...');
      return;
    }
    urlPrev = url;
    log(`using url ${url}`);
    const response = await fetch(url);
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

  let logMsgs: string[] = [];

  function log(msg: string) {
    const length = logMsgs.push(msg);
    if (length > 10) {
      logMsgs = logMsgs.slice(-10);
    }
    logMsgs = logMsgs;
  }
</script>

<div class="relative w-full h-full">
  {#if src && poster}
    <Video {src} {poster} class={classes} {debug} {dummy} />
  {/if}

  {#if debug && !dummy}
    <div class="debug-box right-0 bottom-0">
      {#each logMsgs as msg}
        <div>{msg}</div>
      {/each}
    </div>
  {/if}
</div>
