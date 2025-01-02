import { getVersion } from "/lib/xp/admin";
import { parseUserAgent } from "/lib/sentry/user-agent";
import { SentryRuntime, Request, User } from "/lib/sentry/protocol";
import type { Scope, ScopeCallback } from ".";
import type { User as XPUser } from "@enonic-types/lib-auth";
import type { Request as XPRequest } from "@item-enonic-types/global/controller";

export class ScopeCallbackBuilder {
  tags: Record<string, string> = {};
  contexts: Record<string, unknown> = {};
  extras: Record<string, string> = {};
  request: XPRequest | null = null;
  user: XPUser | null = null;

  setTag(key: string, value: string): this {
    this.tags[key] = value;
    return this;
  }

  setRequest(req: XPRequest): this {
    this.request = req;
    return this;
  }

  setUser(user: XPUser): this {
    this.user = user;
    return this;
  }

  setExtra(key: string, extra: unknown): this {
    this.extras[key] = String(extra);
    return this;
  }

  setContext(key: string, value: unknown): this {
    this.contexts[key] = value;
    return this;
  }

  build(): ScopeCallback {
    return (scope: Scope) => {
      // Set runtime to be XP
      const runtime = new SentryRuntime();
      runtime.setName("Enonic XP");
      runtime.setVersion(getVersion());
      scope.setContexts("runtime", runtime);

      // Set up Request context
      if (this.request) {
        const request = new Request();

        if (this.request.url) {
          request.setUrl(this.request.url);
        }

        if (this.request.method) {
          request.setMethod(this.request.method);
        }

        if (this.request.params) {
          request.setQueryString(flattenParams(this.request.params));
        }

        scope.setRequest(request);

        // Set user agent
        const userAgent = parseUserAgent(this.request);

        if (userAgent?.browser) {
          scope.setContexts("browser", userAgent.browser);
        }

        if (userAgent?.os) {
          scope.setContexts("os", userAgent.os);
        }

        if (userAgent?.device?.family) {
          scope.setContexts("device", userAgent.device);
        }
      }

      // Set all tags
      Object.keys(this.tags).forEach((key) => scope.setTag(key, this.tags[key]));

      // Set all extras
      Object.keys(this.extras).forEach((key) => scope.setExtra(key, this.extras[key]));

      // Set all contexts
      Object.keys(this.contexts).forEach((key) => scope.setContexts(key, this.contexts[key]));

      // Set user
      if (this.user) {
        const user = new User();

        if (this.user.key) {
          user.setId(this.user.key);
        }
        if (this.user.email) {
          user.setEmail(this.user.email);
        }
        if (this.user.login) {
          user.setUsername(this.user.login);
        }
        if (this.user.email) {
          user.setEmail(this.user.email);
        }

        scope.setUser(user);
      }
    };
  }
}

function flattenParams(params: XPRequest["params"]): string {
  return Object.keys(params)
    .reduce<string[]>((acc, key) => {
      const values = forceArray(params[key]);
      const res = values.map((value) => `${key}=${encodeURIComponent(value)}`);

      return acc.concat(res);
    }, [])
    .join("&");
}

export function forceArray<A>(data: A | Array<A> | undefined | null): Array<A> {
  data = data ?? [];
  return Array.isArray(data) ? data : [data];
}
