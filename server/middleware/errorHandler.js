const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "internal server error";

  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "InvalidInput":
      status = 401;
      message = "Please Insert your email and password";
      break;
    case "NoDataProvided":
      status = 401;
      message = "Please Provide The Data";
      break;
    case "NoStock":
      status = 401;
      message = "No Stock Available";
      break;
    case "Unauthorized":
      status = 401;
      message = "You are not authorized";
      break;
    case "ForbiddenError":
      status = 403;
      message = err.errors[0].message;
      break;
    case "NoUser":
    case "NotFoundError":
      status = 404;
      message = "Data Not Found";
      break;
  }

  res.status(status).json({ error: message });
};

module.exports = errorHandler;
