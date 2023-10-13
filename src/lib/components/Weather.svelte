<script lang="ts">
  // A "display only" weather component, this expects the current temperature,
  // humidity, etc., to be pushed in as properties.
  import { DateTime } from 'luxon';

  export let name = '';

  export let temperature: number | undefined = undefined;
  export let humidity: number | undefined = undefined;

  // optional meta-info
  export let temperatureUnits: string = '°F';
  export let humidityUnits: string = '% RH';
  export let at: string | DateTime | undefined = undefined;

  let observed: string;
  let observedRel: string;

  const dateFmt = {
    ...DateTime.DATETIME_SHORT,
    timeZoneName: 'short',
  } as const;

  $: {
    if (at) {
      const t = DateTime.isDateTime(at) ? at : DateTime.fromISO(at);
      observed = t.toLocaleString(dateFmt);
      observedRel = t.toRelative({ unit: 'seconds' })!;
    }
  }
</script>

{#if temperature || humidity}
  <!-- {#if title}
    <h3>{title}</h3>
  {/if} -->

  <div class="weather">
    <div class="main-line">
      <div class="name">{name}</div>
      <div class="measurements">
        <div class="temperature">{temperature}{temperatureUnits}</div>
        <div class="humidity">{humidity}{humidityUnits}</div>
      </div>
    </div>
    {#if observed}
      <div class="note">At {observed}</div>
    {/if}
    {#if observedRel}
      <div class="note">({observedRel})</div>
    {/if}
  </div>
{/if}

<style type="scss">
  .weather {
    max-width: 20em;
  }

  .main-line {
    display: flex;
    /* margin: 1em 0; */
    vertical-align: baseline;
    align-items: baseline;
  }

  .name {
    min-width: 5em;
    vertical-align: baseline;
  }

  .measurements {
    flex: auto;
    display: flex;
    justify-content: space-evenly;
    font-size: 120%;
    font-weight: 600;
  }

  .note {
    font-size: 80%;
    font-style: italic;
    font-weight: 400;
    color: hsl(0, 0%, 50%);
  }

</style>