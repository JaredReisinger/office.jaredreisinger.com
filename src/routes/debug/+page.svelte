<script lang="ts">
  import SensorPush from '$lib/components/SensorPush.svelte';
  import Weather from '$lib/components/Weather.svelte';
</script>

<svelte:head>
  <title>Jared Reisinger’s Office!</title>
</svelte:head>

<div>DEBUG PAGE</div>


<Weather name="FAKE" temperature={123.4} humidity={30.1} at="2023-01-29T15:53:00-0700" />


<SensorPush name="office" />

<SensorPush name="humidor" />

<SensorPush name="pants" />
