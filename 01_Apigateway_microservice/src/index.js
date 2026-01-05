const express = require("express");
const morgan = require("morgan");
const { default: rateLimit } = require("express-rate-limit");
const cors = require("cors");


const {authRoutes, paymentRoutes, gamePlayerRoutes, teamRoutes, contestRoutes, leaderboardRoutes, matchRoutes} = require('./routes/index')

const app = express();
const PORT = 3000;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 50,
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

app.use(morgan("combined"));
app.use(limiter);


app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);
app.use("/gameplayer", gamePlayerRoutes);
app.use("/team", teamRoutes);
app.use("/contest", contestRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/match", matchRoutes);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'api gateway is good to go' });
});
 
app.listen(PORT, () => {
  console.log(`Api Gateway started At :- ${PORT}`);
});
