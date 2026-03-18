// Platform-level method augmentation for the backend interface
// This method is injected at runtime by the Caffeine platform
export {};

declare module "../backend" {
  interface backendInterface {
    _initializeAccessControlWithSecret(token: string): Promise<void>;
  }
  interface Backend {
    _initializeAccessControlWithSecret(token: string): Promise<void>;
  }
}
