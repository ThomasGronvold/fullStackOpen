const logger = require("./logger");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: "token expired"
    });
  }

  next(error);
};

const getTokenFrom = req => {
  const authorization = req.get('Authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

const tokenExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);

  if (token) {
    req.token = token;
  }

  next();
};

const userExtractor = async (req, res, next) => {
  const token = getTokenFrom(req);

  if (token) {

    const decodedToken = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
  getTokenFrom
};