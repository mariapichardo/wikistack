const express = require("express");
const morgan = require("morgan");
const app = express();
const { db } = require('./models');
//const router = require('./routes');
const models =  require('./models');
const wikiRouter = require('./routes/wiki');
//const userRouter = require('./routes/user');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//app.use('./routes', router)
app.use('/wiki', wikiRouter);

// app.use('/user', userRouter)

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));

db.authenticate().then(() => {
  console.log('connected to the database');
});

app.get("/", (req, res, next) => {
    res.redirect("/wiki");
  })
  
const PORT = 2019;

const init = async() => {
    await models.User.sync()
    await models.Page.sync()
app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`);
      });

}

init();
