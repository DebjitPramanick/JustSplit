const makeHttpRequest = async (
  url: string,
  { method, headers: extraHeaders, ...rest }: RequestInit
) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
    ...extraHeaders,
  };

  const response = await fetch(url, {
    cache: "no-cache",
    credentials: "include",
    method,
    headers,
    ...rest,
  });

  // status in the range 200-299
  if (response.ok) {
    try {
      return response.json();
    } catch (err) {
      const error: Error = new Error(
        "Failed to parse successful response body as JSON"
      );
      throw error;
    }
  }

  const errorResponse: { message: string } = await response.json();
  const error = new Error(errorResponse.message);
  throw error;
};

const httpClient = {
  get: (url: string, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "GET",
      ...options,
    }),

  patch: (url: string, payload: object, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "PATCH",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  post: (url: string, payload: object, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  put: (url: string, payload: object, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "PUT",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  postFile: (url: string, body: BodyInit, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "POST",
      body,
      ...options,
    }),

  delete: (url: string, options: Partial<RequestInit> = {}) =>
    makeHttpRequest(url, {
      method: "DELETE",
      ...options,
    }),
};

export default httpClient;
