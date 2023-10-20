<script lang="ts">
  import { page } from '$app/stores';
  import headImage from '$lib/assets/jared-head.jpg';
  import '../app.css';

  $: pageUrl = $page.url.toString();
  $: pagePath = $page.route.id;

  let titlePrefix: string;
  let pageDescription: string;
  let pageImage: string;

  // It would be great if pages could provide override open-graph headers, but
  // it appears that we just end up with duplicates.  Until I figure out a way
  // to delegate the values to the page, this is centralized. :sad:
  $: {
    switch (pagePath) {
      case '/about':
        titlePrefix = 'About ';
        pageDescription =
          'More than you want to know about this site and how it works.';
        pageImage = headImage;
        break;

      case '/':
      default:
        titlePrefix = '';
        pageDescription =
          'A 24x7 live view out Jared’s office window, perhaps with some dogs.';
        pageImage = headImage;
        break;
    }
  }

  $: pageTitle = `${titlePrefix}Jared’s Office(Cam)!`;
</script>

<svelte:head>
  <meta property="og:type" content="website" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:description" content={pageDescription} />
  <meta property="og:image" content={pageImage} />

  <meta property="twitter:card" content="summary" />
  <meta property="twitter:domain" content="office.jaredreisinger.com" />
  <meta property="twitter:title" content={pageTitle} />
  <meta property="twitter:description" content={pageDescription} />
  <meta property="twitter:image" content={pageImage} />
  <meta property="twitter:url" content={pageUrl} />

  <!-- <meta property="twitter:label1" content="" />
  <meta property="twitter:data1" content="" />
  <meta property="twitter:label2" content="" />
  <meta property="twitter:data2" content="" /> -->
</svelte:head>

<slot />
