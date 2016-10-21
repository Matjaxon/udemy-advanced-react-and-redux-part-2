const AsyncMiddleware = ({ dispatch }) => next => action => {

  // If action does not have a payload or the payload is not a promise
  // indicated by the lack of a "then" property then just proceed.
  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  // Make sure that action's promise resolves.
  action.payload.then(response => {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
    // We don't let this hit a return next(action) because we want to
    // restart the action to start at the top of the middleware chain
    // and work its way through all of the steps.
  });
};

export default AsyncMiddleware;
