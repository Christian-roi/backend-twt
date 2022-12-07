const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect(
      // "mongodb+srv://test:sparta@cluster0.dcgxcrg.mongodb.net/?retryWrites=true&w=majority",
      "mongodb://localhost:27017/twt",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error", err);
});

module.exports = connect;
