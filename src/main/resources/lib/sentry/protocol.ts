export const User = Java.type<User>("io.sentry.protocol.User");
export const Request = Java.type<Request>("io.sentry.protocol.Request");
export const SentryRuntime = Java.type<SentryRuntime>("io.sentry.protocol.SentryRuntime");

export type Request = typeof RequestConstructor;
export type User = typeof UserConstructor;
export type SentryRuntime = typeof SentryRuntimeConstructor;

export declare class UserConstructor {
  getData(): Record<string, string> | null;
  getEmail(): string | null;
  getId(): string | null;
  getIpAddress(): string | null;
  getName(): string | null;
  getSegment(): string | null;
  getUsername(): string | null;
  setData(data: Record<string, string>): void;
  setEmail(email: string): void;
  setId(id: string): void;
  setIpAddress(idAddress: string): void;
  setName(string: string): void;
  setSegment(segment: string): void;
  setUsername(username: string): void;
}

export declare class RequestConstructor {
  getCookies(): string | null;
  getData(): unknown;
  getEnvs(): Record<string, string> | null;
  getHeaders(): Record<string, string> | null;
  getMethod(): string | null;
  getOthers(): Record<string, string> | null;
  getQueryString(): string | null;
  getUrl(): string | null;
  setCookies(cookies: string | null): void;
  setData(data: unknown): void;
  setEnvs(envs: Record<string, string>): void;
  setHeaders(headers: Record<string, string>): void;
  setMethod(method: string | null): void;
  setOthers(others: Record<string, string>): void;
  setQueryString(queryString: string): void;
  setUrl(url: string): void;
}

declare class SentryRuntimeConstructor {
  getName(): string | null;
  getRawDescription(): string | null;
  getVersion(): string | null;
  setName(name: string): void;
  setRawDescription(rawDescription: string): void;
  setVersion(version: string): void;
}
