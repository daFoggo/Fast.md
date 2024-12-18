export const BACKEND_HTTPS_IP = import.meta.env.VITE_BACKEND_HTTP_IP;
export const LOGIN_IP = BACKEND_HTTPS_IP + "/auth/login";
export const REGISTER_IP = BACKEND_HTTPS_IP + "/auth/register";

export const MARKDOWN_IP = BACKEND_HTTPS_IP + "/markdown";
export const MARKDOWN_SEARCH_IP = MARKDOWN_IP + "/search";

export const TAG_IP = BACKEND_HTTPS_IP + "/tags";
export const TAG_SEARCH_IP = TAG_IP + "/search";

export const USER_IP = BACKEND_HTTPS_IP + "/users";