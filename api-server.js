const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./src/auth_config.json");
const apiRoutes = require("./api-server-routes");
const axios = require('axios').default
const app = express();

const port = process.env.PORT || 8080;
const appPort = process.env.SERVER_PORT || 3000;
const appOrigin = authConfig.appOrigin || 'http://localhost:3000';

if (
  !authConfig.domain || 
  !authConfig.audience ||
  authConfig.audience === "https://pizza42.sample"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cors({ origin: appOrigin }));

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-pericles112.us.auth0.com/.well-known/jwks.json`,
  }),

  audience: 'https://pizza42.sample',
  issuer: 'https://dev-pericles112.us.auth0.com/',
  algorithms: ["RS256"],
});

// need to parse body
app.use(express.json());

// initialize routes
app.use("/api", apiRoutes(checkJwt));

app.listen(port, () => console.log(`API Server listening on port 8080`));
