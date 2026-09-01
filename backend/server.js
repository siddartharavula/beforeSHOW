const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 2005;

connectDB();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});