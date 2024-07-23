import { REQUEST_STATES } from "~/constants";

export const isRequestStateIdle = (requestState) =>
  requestState === REQUEST_STATES.IDLE;

export const isRequestStatePending = (requestState) =>
  requestState === REQUEST_STATES.PENDING;

export const isRequestStateFulfilled = (requestState) =>
  requestState === REQUEST_STATES.FULFILLED;

export const isRequestStateRejected = (requestState) =>
  requestState === REQUEST_STATES.REJECTED;

export const getRequestStateFlags = (requestState) => ({
  idle: isRequestStateIdle(requestState),
  pending: isRequestStatePending(requestState),
  fulfilled: isRequestStateFulfilled(requestState),
  rejected: isRequestStateRejected(requestState),
});

export const getRequestStateFlagsWithError = (requestState, requestError) => ({
  ...getRequestStateFlags(requestState),
  error: requestError,
  rawState: requestState,
});
