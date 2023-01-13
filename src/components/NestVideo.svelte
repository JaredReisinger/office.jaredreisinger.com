<script lang="ts">
  import Video from './Video.svelte';

  export let streamHost: string;
  export let uuid: string;
  export let chunklistId: string;
  export let publicId: string;

  export let debug = false;
  export let dummy = false;

  // To discover the needed values for the stream host, uuid, chunklist, and
  // public ID, just visit the "public" Nest URL and inspect the network
  // traffic.

  // // Ideally we'd bootstrap up from *only* a Nest shared camera ID (token,
  // // here called publicId) to the M3U8 playlist url.  Unfortunately,
  // // Next/Google doesn't return the proper CORS headers to allow this to be
  // //  done programatically (in a browser, at any rate).  For the record, this
  // // is the flow that *would* happen.
  // async function getCameraUrls(nestCameraId: string) {
  //   console.log("getting stream for", nestCameraId);
  //   const res = await fetch(
  //     `https://video.nest.com/api/dropcam/cameras.get_by_public_token?token=${nestCameraId}`
  //   );
  //   console.log(res);
  //   const info = await res.json();
  //   const feed = info.items[0];
  //   const cameraUuid = feed.uuid;
  //   const streamHost = feed.live_stream_host;
  //   const imageHost = feed.nexus_api_nest_domain_host;

  //   const placeholderImage = `https://${imageHost}/get_image?uuid=${cameraUuid}&public=${nestCameraId}`;
  //   const liveVideoFeed = `https://${streamHost}/nexus_aac/${cameraUuid}/playlist.m3u8?public=${nestCameraId}}`;

  //   return { placeholderImage, liveVideoFeed };
  // }

  $: src = `https://${streamHost}/nexus_aac/${uuid}/chunklist_${chunklistId}.m3u8?public=${publicId}`;
  $: poster = `https://nexusapi-us1.camera.home.nest.com/get_image?uuid=${uuid}&width=540&public=${publicId}`;

  $: {
    log(`using src ${src}`);
    log(`using poster ${poster}`);
  }

  let video: HTMLVideoElement;
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
  <Video {src} {poster} {debug} {dummy} />

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
    /* height: 100%; */
  }

  .wrapper {
    position: relative;
  }

  .debug {
    position: absolute;
    top: 0;
    right: 0;
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
