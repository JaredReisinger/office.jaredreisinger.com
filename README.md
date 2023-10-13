# office.jaredreisinger.com

The gratuitous live-streaming and too-much-information site inspired by [puppycam.turehounds.com](https://github.com/JaredReisinger/puppycam.turehounds.com).

_**Does this repo/site need to exist?**_ No, of course not; see [the definition for the word “gratuitous”](https://www.merriam-webster.com/dictionary/gratuitous).

_**So, like, why, then?**_ Well, putting the puppycam site together was a blast, but it’s only “live” for a 12-week stint every 2–3 years. What else am I going to do with the cameras and sensors in the meantime? Plus, when working remotely, there’s an arguable advantage to having something to share.

---

## TO-DO

- [x] Split `Video.svelte` into `Video` and `NestVideo` to encapsulate the weird Nest logic.

- [x] In [**sensorpush-proxy**](../sensorpush-proxy), have more-than-one named-sensor config, so that it can fetch/cache for "office", "humidor", etc.

- [ ] Create [**weatherlink-proxy**](#TBD) (separate repo?) for outdoor temperature/weather?
