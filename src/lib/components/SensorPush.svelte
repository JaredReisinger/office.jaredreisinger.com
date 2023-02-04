<script lang="ts">
  import { sensors } from './SensorPush';
  import Weather from './Weather.svelte';

  export let name = '';

  let temperature: number;
  let humidity: number;
  // let observed: string;

  $: {
    if ($sensors && name in $sensors) {
      const reading = $sensors[name];
      ({ temperature, humidity /*observed*/ } = reading);
    }
  }
</script>

{#if $sensors}
  {#if !(name in $sensors)}
    <div>{name} is missing in SensorPush readings!</div>
  {:else}
    <Weather {name} {temperature} {humidity} />
    <!-- <Weather {name} {temperature} {humidity} at={observed} /> -->
  {/if}
{/if}
