const makeHttpRequest = async (
  url: string,
  { method, headers: extraHeaders, ...rest }
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
  const responseCopy = response.clone();

  // status in the range 200-299
  if (response.ok) {
    try {
      return response.json();
    } catch (err) {
      const error = new Error(
        "Failed to parse successful response body as JSON"
      );
      error.response = response;
      error.payload = undefined;
      throw error;
    }
  }

  // { response, payload?, payloadText? }
  const error = new Error(
    `Async fetch to ${url} failed with status code: ${response.status}`
  );
  error.response = response;
  try {
    error.payload = utils.camelcaseKeys(await response.json(), {
      deep: true,
    });
  } catch (err) {
    // Response does not contain JSON
    error.payload = undefined;
    error.payloadText = await responseCopy.text();
  }
  throw error;
};

const httpClient = {
  get: (url, options = null) =>
    makeHttpRequest(url, {
      method: "GET",
      ...options,
    }),

  patch: (url, payload, options = null) =>
    makeHttpRequest(url, {
      method: "PATCH",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  post: (url, payload, options) =>
    makeHttpRequest(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  put: (url, payload, options) =>
    makeHttpRequest(url, {
      method: "PUT",
      body: payload ? JSON.stringify(payload) : null,
      ...options,
    }),

  postFile: (url, body, options) =>
    makeHttpRequest(url, {
      method: "POST",
      body,
      ...options,
    }),

  delete: (url, options = null) =>
    makeHttpRequest(url, {
      method: "DELETE",
      ...options,
    }),
};

export default httpClient;
