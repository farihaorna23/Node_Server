// Exercise 1 Section
const http = require("http");

http
  .createServer((request, response) => {
    let chunks = [];
    request.on("data", chunk => {
      chunks.push(chunk);
    });

    request.on("end", () => {
      const { url, method } = request;
      let statusCode = 200;
      let resbody;
      let contentType = "text/html";

      if (url === "/" && method == "GET") {
        resbody = "<h1>Home Page</h1>";
      } else if (url === "/about" && method == "GET") {
        let info = {
          name: "Fariha",
          hobby: "books",
          age: 25,
          gender: "female"
        };
        resbody = JSON.stringify(info);
        contentType = "application/json";
      } else if (url === "/echo" && method == "POST") {
        let body = Buffer.concat(chunks).toString();
        let echo = {
          method: method,
          url: url,
          body: body
        };
        resbody = JSON.stringify(echo);
        contentType = "application/json";
      } else {
        statusCode = 404;
        resbody = "<h1>Client Error. Route Doesn't Exist.</h1>";
      }
      response.statusCode = statusCode;
      response.setHeader("content-type", contentType);
      response.write(resbody);
      response.end();
    });
  })
  .listen(3000, () => {
    console.log("server running");
  });

// Finish setting up the server
