<script lang="ts">
  import NestVideo from '$lib/components/NestVideo.svelte';
  // import PuppyDetails from '$lib/components/PuppyDetails.svelte';
  import SensorPush from '$lib/components/SensorPush.svelte';
  // import Weather from '$lib/components/Weather.svelte';
  // import LatestNews from '$lib/components/LatestNews.svelte';
</script>

<svelte:head>
  <title>About - office.jaredreisinger.com</title>
</svelte:head>

<div class="wrapper">
  <h1>About office.jaredreisinger.com</h1>

  <p>
    This stems from a previous site I did for the Ture Hounds PuppyCam. That
    site only needs to be operational for a two-month stretch out of every two
    or three years. That works out to only 8–10% utilization, with all that
    hardware and fun sitting idle for the other 90% of the time.
  </p>

  <p>
    So, I decided to spin up something similar that’s operational far more
    often: my office!
  </p>

  <h2>Technical details</h2>

  <p>
    I write software for a living, and I enjoy it enough that I also do it in my
    spare time. Any excuse to write some bespoke software or learn something new
    is a good thing in my opinion. As a result, this site <em>might</em> be considered
    a gratuitous use of technology. 😉
  </p>

  <p>
    This site is composed of several loosly-connected pieces. In roughly the
    order that you experience them, they are:
  </p>
  <ul>
    <li><a href="about#front-end">front-end web site</a></li>
    <li><a href="about#live-video">live video feed</a></li>
    <li><a href="about#puppy-weather">“weather” information</a></li>
  </ul>

  <h3 id="front-end">Front-end web site</h3>

  <p>
    The site itself is a
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">Svelte.js</a
    >/<a href="https://kit.svelte.dev" target="_blank" rel="noreferrer"
      >SvelteKit</a
    >
    site, which means that everything “interesting” actually runs in your browser,
    and the hosting server (<code>office.jaredreisinger.com</code>) itself
    doesn’t actually <em>do</em>
    anything. The nice thing about having nothing running on the server is that it
    means I can host it for free on
    <a href="https://netlify.com" target="_blank" rel="noreferrer">Netlify</a>.
    As soon as I push a change to the code, Netlify grabs that change, rebuilds
    the site, and redeploys it, all in a matter of seconds.
  </p>

  <p>
    If you want to see the source for this site, you can, as it’s <a
      href="https://github.com/JaredReisinger/office.jaredreisinger.com"
      target="_blank"
      rel="noreferrer">hosted on GitHub</a
    >. It used to be marked as a private repository, but there’s really nothing
    secret in the source so I decided I might as well open it up so anyone else
    can make use of it if they wish.
  </p>

  <h3 id="live-video">Live video feed</h3>

  <p>
    The PuppyCam site that this ultimately evolved from started as just a
    publically-shared <a
      href="https://nest.com"
      target="_blank"
      rel="noreferrer">Nest</a
    > camera. We already had a few of these cameras for security, and discovered
    that we could use them to easily keep an eye on the pups from anywhere, even
    if it was just from another room at night-time—the cameras use infrared in low-light
    situations so we didn’t even need to turn on a light just to check on them.
  </p>

  <p>
    I put together a very simple PuppyCam for the first litter just by using an
    embedded <code>iframe</code>; it worked well enough, but limited the amount
    of control I could have over the layout and presentation. For the second
    litter, I learned a little more about what happens under-the-covers for live
    video streaming and figured out how to
    <a
      href="https://github.com/JaredReisinger/office.jaredreisinger.com/blob/main/src/lib/components/NestVideo.svelte#L26-L44"
      target="_blank"
      rel="noreferrer">discover the raw video stream for a public camera ID</a
    >
    so that I can pass that raw stream to Svelte component I wrote that leverages
    <a
      href="https://www.npmjs.com/package/hls.js"
      target="_blank"
      rel="noreferrer">hls.js</a
    >.
  </p>

  <p>
    All of that means that I can now easily drop a video anywhere on the site,
    with full control of the styling and presentation:
  </p>

  <div class="note">
    <div class="left video">
      <NestVideo publicId="VuqBb1RtMN" />
    </div>

    Here, I’m pointing a camera out the window of my office, over the filing
    cabinet that the dogs often use to sun themselves. At the very least, you’ll
    get to see what outside weather I’m experiencing… and maybe you’ll see one
    or two of the dogs basking in the sun.
    <div class="clear"></div>
  </div>

  <h3 id="weather">“Weather” information</h3>

  <div class="example right">
    <SensorPush name="office" />
  </div>

  <p>
    Okay... now
    <em>this</em>
    part of the site is a
    <em><strong>completely</strong></em>
    gratuitous use of technology. It's a complete sub-system in and of itself. It
    comprises:
  </p>
  <ul>
    <li>
      <a href="about#sensorpush">temperature/humidity data collection</a>
    </li>
    <li><a href="about#proxy">bespoke data proxy</a></li>
    <li>
      <a href="about#weather-component">auto-updating in-browser logic</a>
    </li>
  </ul>

  <h4 id="sensorpush">Temperature/humidity data collection</h4>

  <p>
    For various and sundry reasons, I happen to have several
    <a href="https://www.sensorpush.com/" target="_blank" rel="noreferrer"
      >SensorPush</a
    >
    temperature and humidity sensors. They allow me to monitor such critically important
    things as
    <em>“does my cigar humidor need more water?”</em>
    and
    <em>“what temperature is the kitchen right now?”</em>. These devices record
    the temperature and humidity once every minute, and send that information
    (via a low-energy-Bluetooth–to–WiFi hub) up to SenorPush’s data servers in
    the cloud.
  </p>

  <p>
    SensorPush exposes a programmatic API so that you can get the raw data they
    have saved from the individual sensors. Their API requires performing
    authentication using your (my!) personal SensorPush password. Since (a) I
    don’t want to expose my password, (b) this site only needs the most-recent
    temperature/humidity reading, and (c) when the site goes viral it could
    start requesting the readings
    <em>billions</em>
    of times 😉, the “most sane” thing to do is to run a tiny one-off web server
    whose job is to peridocially poke the SensorPush API to get the latest reading,
    and to also serve that information publically.
  </p>

  <p>All of which means I needed to write a…</p>

  <h4 id="proxy">Bespoke data proxy</h4>

  <p>
    I’ve written (and open-sourced) <a
      href="https://github.com/JaredReisinger/sensorpush-proxy/"
      target="_blank"
      rel="noreferrer">a small program/web-server</a
    >
    in
    <a href="https://golang.org/" target="_blank" rel="noreferrer">Go</a>
    that performs all of the necessary work for authenticating with the SensorPush
    API, retrieving the most-recent temperature and humidity for the desired sensors,
    and then exposing that information as a simple data feed. For this site, it’s
    running at
    <a
      href="https://sensorpush-proxy.spudnoggin.com/sensors"
      target="_blank"
      rel="noreferrer"
      ><code>https://sensorpush-proxy.spudnoggin.com/sensors</code></a
    >.
  </p>

  <p class="note">
    If you visit that link, you’ll see some additional potential data metrics
    without values: altitude, barometric pressure, and so on. SensorPush has
    some newer sensors that report those values, but ours only includes the
    temperature and humidity.
  </p>

  <p>
    The data proxy server runs on spare hardware that’s been cobbled together
    over the years and turned into a little Linux box running my own personal
    private “cloud”. It could just as easily run “in the (real) cloud”—and in
    would/will, if this site or the PuppyCam one actually goes viral!—but it
    doesn’t cost anything (more) to run it on a machine that I already have and
    that is already exposed to the internet as half-a-dozen other virtual
    servers.
  </p>

  <h4 id="weather-component">Auto-updating in-browser logic</h4>

  <p>
    So given that there’s now easy and open access to the temperature/humidity
    data, it’s just a matter of getting that information to show up in your
    browser. The Svelte component I’ve written for this site simply tells the
    browser to retrieve the data from the bespoke data proxy every 30 seconds,
    and then updates the information on the page. Updating the page is something
    that Svelte was designed to do, so this is a lot easier than it might sound.
  </p>

  <p>All of that, just to get this:</p>

  <div class="example">
    <SensorPush name="office" />
  </div>

  <p>Wooo! 🎉 <em>(And yes, that’s a live and accurate reading!)</em></p>

  <div class="note" style="margin-top: 4rem">
    <h3>Isn’t that enough? What else do you need to add?</h3>

    <p>
      That’s the thing about a gratuitous use of technology: how does one define
      “enough”?
    </p>

    <p>
      In any case, I’m debating adding actual outdoor weather as well; we have a
      <a
        href="https://www.davisinstruments.com"
        target="_blank"
        rel="noreferrer"
        >Davis Instruments weather station and WeatherLink Live</a
      > which—and this may sound familiar—pushes the outdoor weather up to Davis’
      servers in the cloud. I haven’t checked to see if someone else has written
      a Davis-equivalent data proxy or if that’s another project for me to tackle.
    </p>
  </div>
</div>

<style type="scss">
  .wrapper {
    margin: 1rem;
    padding: clamp(0.5rem, calc((100vw - 320px) / 50), 2rem);
    max-width: 50em;
    margin: 0 auto;
  }

  .note {
    margin: 0;
    font-size: 84%;
    font-style: italic;
    font-weight: 400;
    color: hsl(0, 0%, 50%);
    background-color: hsl(0, 0%, 95%);
    padding: 1em;
    border-radius: 1em;
  }

  .example {
    width: 16rem;
    max-width: 100%;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 1em;
    background-color: hsl(0, 0%, 80%, 0.2);
    padding: 0.5em;
    box-sizing: content-box;

    &:not(.left):not(.right) {
      margin: 1em auto;
    }
  }

  .left {
    float: left;
    margin-right: 1em;
  }

  .right {
    float: right;
    margin-left: 1em;
  }

  .clear {
    clear: both;
  }

  /*.example.auto {
    width: fit-content;
  }*/

  .video {
    height: 9rem;
  }
</style>
