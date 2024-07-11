export const ENV = process.env.NODE_ENV;

export const API_URL =
  ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:8080";

export const CACHE_THEME_KEY = "vault-app-theme-mode-key";

export const CACHE_USER_KEY = "vault-app-user-data-key";

export const CACHE_TOKEN_KEY = "vault-app-token-value-key";

export const CACHE_VAULTDATA_KEY = "vault-app-vault-data-key";

export const CACHE_VAULT_KEY = "vault-app-vault-unique-key";
