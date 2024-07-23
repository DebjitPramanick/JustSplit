import { useMemo } from "react";
import { useImmerReducer } from "use-immer";

import { getRequestStateFlagsWithError } from "~/api/utils";
import { REQUEST_STATES } from "~/constants";

function requestReducer(
  state = { data: null, requestState: REQUEST_STATES.IDLE, requestError: null },
  { type, payload }
) {
  if (Object.prototype.hasOwnProperty.call(REQUEST_STATES, type)) {
    state.requestState = type; // REQUEST_STATES
  }

  if (type === REQUEST_STATES.PENDING) {
    state.requestError = null;
  } else if (type === REQUEST_STATES.REJECTED) {
    state.requestError = payload;
  } else if (type === REQUEST_STATES.FULFILLED) {
    state.data = payload;
    state.requestError = null;
  } else if (type === REQUEST_STATES.IDLE) {
    state.requestError = null;
  }
  return state;
}

function useRequestStates(
  requestState = REQUEST_STATES.IDLE,
  requestError = null
) {
  const [request, setRequest] = useImmerReducer(requestReducer, {
    requestState,
    requestError,
  });

  const requestFlags = {
    ...getRequestStateFlagsWithError(
      request.requestState,
      request.requestError
    ),
    data: request.data,
  };
  const requestHandlers = useMemo(() => {
    return {
      idle: () => setRequest({ type: REQUEST_STATES.IDLE }),
      pending: () => setRequest({ type: REQUEST_STATES.PENDING }),
      fulfilled: (data) =>
        setRequest({ type: REQUEST_STATES.FULFILLED, payload: data }),
      rejected: (error) =>
        setRequest({ type: REQUEST_STATES.REJECTED, payload: error }),
    };
  }, []);

  return [requestFlags, requestHandlers];
}

export default useRequestStates;
