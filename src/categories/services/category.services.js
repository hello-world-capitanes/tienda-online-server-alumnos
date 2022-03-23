const fs = require("fs");

fs.promises.readFile("../data/category.json")
.then(function(result) {
  console.log(""+result);
})
.catch(function(error) {
   console.log(error);
})