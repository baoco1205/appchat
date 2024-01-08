let response = (res, data) => {
  res.json({ success: "true", data: data });
};
let reponseErr = (res, err, statusCode) => {
  if (!statusCode) {
    res.statusCode = 404;
  } else statusCode = statusCode;
  res.json({ success: false, err: err });
};
module.exports = { response, reponseErr };
