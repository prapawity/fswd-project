import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.connect(
  'mongodb://localhost:27017',
  // 'mongodb+srv://longthao:LongthaoPassword@cluster0.ajfjg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    dbName: 'Project_Fullstack',
    promiseLibrary: Promise,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
).then(() => {
  console.log("**** Database is Connected ***")
})
.catch((err) => console.log("*** Database Connection is Error: ", err+" ***"))
