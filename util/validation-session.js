function getSessionErrorData(req, defaultValues) {
  let sessionInputData = req.session.data;
  

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      ...defaultValues,
    };
  }

  req.session.data = null;
  return sessionInputData;
}

function flashErrorsToSession(req, data, action) {
  req.session.data = {
    hasError: true,
    ...data,
  };
  req.session.save(action);
}

module.exports = {
  getSessionErrorData: getSessionErrorData,
  flashErrorsToSession: flashErrorsToSession,
};
