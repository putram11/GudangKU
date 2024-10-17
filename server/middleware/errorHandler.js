const errorHandler = (err, req, res, next) => {
  // Menentukan status dan pesan default untuk error
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Mengatur status dan pesan berdasarkan tipe error
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0]?.message || "Validation Error";
      break;
      
    case "InvalidInput":
      status = 401;
      message = "Invalid email or password";
      break;

    case "NoDataProvided":
      status = 400; // Changed to 400 as it's a client error
      message = "Please provide the data";
      break;

    case "NoStock":
      status = 404; // Changed to 404 as no stock means not found
      message = "No stock available";
      break;

    case "Unauthorized":
      status = 401;
      message = "You are not authorized";
      break;

    case "ForbiddenError":
      status = 403;
      message = err.errors[0]?.message || "Access forbidden";
      break;

    case "NoUser":
    case "NotFoundError":
      status = 404;
      message = "Data not found";
      break;

    default:
      // Log error for debugging (optional)
      console.error(err);
      break;
  }

  // Mengirimkan respons error ke klien
  res.status(status).json({ error: message });
};

module.exports = errorHandler;
