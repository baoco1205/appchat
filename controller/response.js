let response = (res, data) => {
  res.json({ success: "true", data: data });
};
let responseError = (res, err, statusCode) => {
  if (!statusCode) {
    res.statusCode = 404;
  } else res.statusCode = statusCode;
  return res.json({ success: false, err: err });
};
module.exports = { response, responseError };
