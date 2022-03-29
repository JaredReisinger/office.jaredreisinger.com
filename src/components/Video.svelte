<script lang="ts">
	import Hls from 'hls.js';

	export let src: string;
	export let poster: string;

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
				const hls = new Hls();

				// The loadSource() line seems necessary, even if the <video> element
				// already has the src listed... this is perhaps an hls.js thing?
				hls.loadSource(src);
				hls.attachMedia(video);

				// start playing as soon as the manifest is parsed
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					log('hls manifest parsed, playing!');
					video.play();
				});
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
			controls
			preload="auto"
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
		/* height: 100%; */
	}

	.wrapper {
		position: relative;
	}

	.live {
		position: absolute;
		z-index: 100;
		background-color: hsl(200, 100%, 50%);
		color: white;
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
		display: flex;
		justify-content: center;
		align-items: center;
		background: hsl(0, 0%, 50%);
		color: hsl(0, 0%, 100%);
		aspect-ratio: 1.6;
		font-size: 2rem;
	}

	.debug {
		background-color: hsl(0, 0%, 90%);
		padding: 1em 0.5em 0.5em;
		font-size: 70%;

		div {
			margin-bottom: 0.25em;
		}
	}
</style>
