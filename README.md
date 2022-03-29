# office.jaredreisinger.com

The gratuitous live-streaming and too-much-information site inspired by [puppycam.turehounds.com](https://github.com/JaredReisinger/puppycam.turehounds.com).

_**Does this repo/site need to exist?**_ No, of course not; see [the definition for the word “gratuitous”](https://www.merriam-webster.com/dictionary/gratuitous).

_**So, like, why, then?**_ Well, putting the puppycam site together was a blast, but it’s only “live” for a 12-week stint every 2–3 years. What else am I going to do with the cameras and sensors in the meantime? Plus, when working remotely, there’s an arguable advantage to having something to share.

----

## TO-DO

- [ ] Split `Video.svelte` into `Video` and `NestVideo` to encapsulate the weird Nest logic... and then probably ignore it in lieu of just using the chunklist URL directly (in `Video`).

- [ ] In [**sensorpush-proxy**](../sensorpush-proxy), have more-than-one named-sensor config, so that it can fetch/cache for "office", "humidor", etc.

- [ ] Create [**weatherlink-proxy**](#TBD) (separate repo?) for outdoor temperature/weather?

----

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte@next

# create a new project in my-app
npm init svelte@next my-app
```

> Note: the `@next` is temporary

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
