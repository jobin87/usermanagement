import packageJson from "../package.json";

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  baseUrl: string;
  assetsDir: string;
  mapboxApiKey: string;
};

// ----------------------------------------------------------------------

export const CONFIG: ConfigValue = {
  appName: "usermanagement",
  appVersion: packageJson.version,
  baseUrl: import.meta.env.VITE_AUTH_BASE_URL ?? "",
  assetsDir: import.meta.env.VITE_AUTH_ASSETS_DIR ?? "",

  mapboxApiKey: import.meta.env.VITE_MAPBOX_API_KEY ?? "",
};
