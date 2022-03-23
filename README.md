# Sentry Integration Library for Enonic XP

Enonic XP Library for enhancing data sent to Sentry.

[![](https://jitpack.io/v/no.item/lib-xp-sentry.svg)](https://jitpack.io/#no.item/lib-xp-sentry)

<img src="https://github.com/ItemConsulting/lib-xp-sentry/raw/main/docs/icon.svg?sanitize=true" width="150">

## Installation

To install this library you need to add a new dependency to your app's build.gradle file.

### Gradle

```groovy
repositories {
  maven { url 'https://jitpack.io' }
}

dependencies {
  include "com.enonic.xp:lib-admin:${xpVersion}"
  include "no.item:lib-xp-sentry:0.0.1"
}
```

## Usage

```typescript  
import * as Sentry from "/lib/sentry";
import { parseUserAgent } from "/lib/sentry/user-agent";

export function parseRequestAndAddToSentry(req: XP.Request): void {
  const { browser, os, device } = parseUserAgent(req);

  Sentry.configureScope((scope) => {
    scope
      .setTags({
        branch: req.branch,
        repositoryId: req.repositoryId,
      })
      .setRequest({
        url: req.url,
        method: req.method,
      })
      .setContext("browser", browser)
      .setContext("os", os);

    if (device.family) {
      scope.setContext("device", {
        family: device.family,
      });
    }
  });
}
```


## Deploying

### Building

To build he project run the following code

```bash
./gradlew build
```

### Deploy locally

Deploy locally for testing purposes:

```bash
./gradlew publishToMavenLocal
```

## Deploy to Jitpack

Go to the [Jitpack page for lib-xp-sentry](https://jitpack.io/#no.item/lib-xp-sentry) to deploy from Github.
