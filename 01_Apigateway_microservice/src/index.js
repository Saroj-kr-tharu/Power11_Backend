const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { default: rateLimit } = require("express-rate-limit");
const cors = require("cors");

const {  FORTEND_URL, AUTH_BACKEND_URL,INTERNAL_SERVER_TOKEN, PAYMENT_BACKEND_URL } = require("./serverConfig/server.config");

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
});

app.use(morgan("combined"));
app.use(limiter);

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'api gateway is good to go' });
});

const allowedOrigins = ['http://localhost:4200'];

app.use(
  cors({
    origin: function (origin, callback) {
    
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'], 
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204
   
  })
);


const createInternalProxy = (target, pathRewrite) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite,
    
    headers: {
      "x-internal-server-token": INTERNAL_SERVER_TOKEN
    },
    logLevel: 'debug' 
  });

const authProxy = createInternalProxy(
  AUTH_BACKEND_URL,
  //  { "^/auth": "" }
  { "": "auth/" }
);

const paymentProxy = createInternalProxy(
  PAYMENT_BACKEND_URL,
  { "^/payment": "" }
);




app.use("/auth",authProxy );
app.use("/payment", paymentProxy);

app.listen(PORT, () => {
  console.log(`Api Gateway started At :- ${PORT}`);
});
