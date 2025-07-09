// app/services/config.ts

export const API_BASE_URL = process.env.POST_PROCESS_API_URL || "http://localhost:8000";

// specific endpoints built from base
export const DTALE_API_URL = `${API_BASE_URL}/dtale/open-in-dtale`;
export const COMPARE_API_URL = `${API_BASE_URL}/compare`;
export const CONCAT_API_URL = `${API_BASE_URL}/concat/`;
// add more as you grow
