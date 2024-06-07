var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

const server = http.createServer((req, res)=>{
    let route = url.parse(req.url, true).pathname;
    let filePath = "./public";
    let contentType = "text/html";
    // routes
    switch(route) {
        case "/":
            filePath = path.join(__dirname, filePath, "index.html");
            break;

        case "/home":
            filePath = path.join(__dirname, filePath, "index.html");
            break;
        
        case "/about":
            filePath = path.join(__dirname, filePath, "about.html");
            break;

        case "/contact":
            filePath = path.join(__dirname, filePath, "contact-me.html");

        case "/contact-me":
            filePath = path.join(__dirname, filePath, "contact-me.html");
            break;
        default:
            filePath = path.join(__dirname, filePath, route);
            break;
        
    }

    // file extentions
    let fileExt = path.extname(filePath);

  switch (fileExt) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  } 



    // open file that corresponds to route
    fs.readFile(filePath, (err, file)=>{
        if(err){
            if(err.code == 'ENOENT'){
                let errorPath = path.join(__dirname, "public", "404.html");
                console.log(errorPath, 'errorPath')
                fs.readFile(errorPath, (err, file) => {
                    res.writeHead(404, {"Content-Type": contentType})
                    res.end(file);
                })
            }

            return;
        }

        res.writeHead(200, {"Content-Type": contentType});
        res.end(file, "utf8");
    })

}).listen(8080);

