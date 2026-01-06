//core module
const path= require('path');


//anyone can use this to get the root directory of the project
module.exports= path.dirname(require.main.filename);