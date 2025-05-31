# Sentry Integration Library for Enonic XP

Enonic XP Library for enhancing data sent to Sentry.

[![](https://repo.itemtest.no/api/badge/latest/releases/no/item/lib-xp-sentry)](https://repo.itemtest.no/#/releases/no/item/lib-xp-sentry)

<img src="https://github.com/ItemConsulting/lib-xp-sentry/raw/main/docs/icon.svg?sanitize=true" width="150">

## Installation

To install this library you need to add a new dependency to your app's build.gradle file.

### Gradle

```groovy
repositories {
  maven { url "https://repo.itemtest.no/releases" }
}

dependencies {
  include "com.enonic.xp:lib-admin:${xpVersion}"
  include "no.item:lib-xp-sentry:0.3.0"
}
```

## Usage

You can use the `Sentry.init` method to configure the DSN for the Sentry client in your `main.ts` file.

```typescript
import { Sentry } from "/lib/sentry";

Sentry.init((opts): void => {
  opts.setDsn("https://public@sentry.example.com/1");
  opts.setRelease(app.version);
  opts.setEnvironment(getInstallation());
});
```

You can use your _/error/error.ts_ to get access to the `Exception` thrown, and send it to Sentry using 
`Sentry.captureException`.

```typescript
import { Sentry, ScopeCallbackBuilder } from "/lib/sentry";
import type { ErrorRequest, Request, Response } from "@enonic-types/core";

export function handleError(err: ErrorRequest): Response {
  if (err.status !== 404) {
    reportToSentry(err);
  }

  return {
    status: err.status,
    body: `<h1>${err.status} error</h1>`
  }
}

function reportToSentry(err: ErrorRequest): void {
  try {
    const callback = new ScopeCallbackBuilder()
      .setRequest(err.request)
      .setTag("branch", err.request.branch)
      .build();

    Sentry.captureException(err.exception, callback);
  } catch (e) {
    log.error("Failed to configure Sentry scope", e);
  }
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

## Deploy to Maven

```bash
./gradlew publish -P com.enonic.xp.app.production=true
```
