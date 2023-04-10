const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./routes/user_routes");
app.use(express.json());

const API_KEY = 'lGn48f2kxrL6bZUd8vH1jJpS7tW0e9yM';
const IP_WHITELIST = '::1';


var getIP = require('ipware')().get_ip;
app.use(function(req, res, next) {
    var ipInfo = getIP(req);
    console.log(ipInfo);
    // { clientIp: '127.0.0.1', clientIpRoutable: false }
    next();
});
app.get("/", (req, res) => {
  res.json({ message: "This is the main page, go to /users to access end points" });
});

app.use((req, res, next) => {
  // Check for the presence of the API key in the request headers
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ message: 'Unauthorized: Missing API key' });
  }

  // Verify the API key
  if (apiKey !== API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
  }

  const clientIp = req.ip;
  console.log(clientIp);

  if (!clientIp) {
    return res.status(401).json({ message: 'Unauthorized: Missing IP header' });
   }
  if (clientIp !== IP_WHITELIST) {
   return res.status(401).json({ message: 'Unauthorized: IP address not in whitelist' });
   }

   next();

});

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "This is the main page, go to /users to access end points" });
});
app.use("/users", userRouter);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);

});