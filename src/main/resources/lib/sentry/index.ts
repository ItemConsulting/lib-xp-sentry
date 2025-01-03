import { RequestConstructor, UserConstructor } from "/lib/sentry/protocol";

export { ScopeCallbackBuilder } from "./helpers";

export const Sentry = Java.type<Sentry>("io.sentry.Sentry");

export type Sentry = {
  captureException(exception: unknown, callback: ScopeCallback): string;
  captureMessage(message: string, callback: ScopeCallback): string;
  captureEvent(event: unknown, callback: ScopeCallback): string;
  init(callback: (opts: SentryOptions) => void, globalHubMode?: boolean): void;
  configureScope(callback: (scope: Scope) => void): void;
  withScope(callback: (scope: Scope) => void): void;
  clearBreadcrumbs(): void;
  close(): void;
};

export type ScopeCallback = (scope: Scope) => void;

export interface Scope {
  setTag(key: string, value: string): void;
  setContexts(name: string, context?: number | boolean | string | unknown[] | unknown): void;
  setUser(user: UserConstructor): void;
  getUser(): UserConstructor;
  setExtra(key: string, value: string): void;
  clearBreadcrumbs(): void;
  setRequest(request: RequestConstructor): void;
}

export interface SentryOptions {
  setDebug(debug: boolean): void;
  setDsn(dsn: string): void;
  setRelease(release: string): void;
  setDist(release: string): void;
  setEnableTracing(enableTracing: boolean): void;
  setSampleRate(sampleRate: number): void;
  setEnableExternalConfiguration(enableExternalConfiguration: boolean): void;
  setEnvironment(environment: string): void;
}
