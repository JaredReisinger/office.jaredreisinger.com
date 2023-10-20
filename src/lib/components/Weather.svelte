<script lang="ts">
  // A "display only" weather component, this expects the current temperature,
  // humidity, etc., to be pushed in as properties.
  import { DateTime } from 'luxon';

  export let name = '';

  export let temperature: number | undefined = undefined;
  export let humidity: number | undefined = undefined;

  // optional meta-info
  export let precision: number = 0;
  export let temperatureUnits: string = '°F';
  export let humidityUnits: string = '%<span class="pl-1">RH<span>';
  export let at: string | DateTime | undefined = undefined;

  // format the temperature and humidity down to a fixed level of precision...
  $: tempFmt = temperature?.toFixed(precision);
  $: humidFmt = humidity?.toFixed(precision);

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

{#if tempFmt || humidFmt}
  <!-- {#if title}
    <h3>{title}</h3>
  {/if} -->

  <div class="max-w-sm">
    <div class="flex gap-1 items-baseline justify-items-end justify-end">
      <div class="text-right">{name}</div>
      <div class="flex gap-1 font-mono text-xl font-semibold justify-end">
        <div>
          {tempFmt}<span class="font-light text-sm align-top">{@html temperatureUnits}</span>
        </div>
        <div>
          {humidFmt}<span class="font-light text-sm align-top">{@html humidityUnits}</span>
        </div>
      </div>
    </div>
    {#if observed}
      <div class="text-sm italic font-normal text-zinc-400">At {observed}</div>
    {/if}
    {#if observedRel}
      <div class="text-sm italic font-normal text-zinc-400">({observedRel})</div>
    {/if}
  </div>
{/if}
