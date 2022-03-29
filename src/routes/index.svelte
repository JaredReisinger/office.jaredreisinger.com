<script lang="ts">
	import NestVideo from '../components/NestVideo.svelte';
</script>

<svelte:head>
	<title>Jared Reisinger’s Office!</title>
</svelte:head>

<!-- <h1>Under construction!</h1>

<p>
	How 1990s is it to have a site that says it’s under construction? Right?! In
	any case, it should only be a couple of days before this is up and running as
	it’s going to be a near-clone of <a href="https://puppycam.turehounds.com"
		>the Ture Hounds PuppyCam</a
	>.
</p> -->

<div class="side-by-side">
	<!-- https://video.nest.com/live/VuqBb1RtMN -->
	<NestVideo
		streamHost="stream-ue1-delta.dropcam.com"
		uuid="9c06bf22fa9047559a39ced47953a9ec"
		chunklistId="w1836740489"
		publicId="VuqBb1RtMN"
	/>
	<div class="vertical temp-box">
		<div class="temp">temp info...</div>
		<div class="temp">temp info...</div>
		<div class="temp">temp info...</div>
		<div class="temp">temp info...</div>
	</div>
</div>

<style lang="scss">
	h1,
	p {
		margin: 1rem;
	}

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
