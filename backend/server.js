const app = require("./app");
const connectDB=require("./src/config/db");

PORT = process.env.PORT || 2005;

connectDB();
app.listen(PORT, () => {
  console.log(`Server Running At => http://localhost:${PORT}`);
});
