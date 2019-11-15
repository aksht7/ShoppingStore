/*var http=require('http');
var fs=require('fs');
var url=require('url');

function readAndServe(path,content,res)
{
  fs.readFile(path,function(err,data)
{
  if(err)
  {
  res.write("File Not Present");
  res.end();
  }
  else
  {
    res.writeHead(200, {'Content-type':content});
    res.write(data);
    res.end();
  }
});
}


http.createServer(function(req,res)
{
  var path=url.parse(req.url).pathname;
  if(req.method  === "GET")
  {
    if(path === "/admin")
    {
      readAndServe('products.html','text/html',res);
    }
    else if(path === '/script.js')
    {
      readAndServe('script.js','text/javascript',res);
    }
    else if(path === '/products')
    {
    readAndServe('viewProducts.html','text/html',res);
    }
    else if(path === '/viewProducts.js')
    {
    readAndServe('viewProducts.js','text/js',res);
    }
    else if(path === '/cart')
    {
    readAndServe('cart.html','text/html',res);
    }
    else if(path === '/cart.js')
    {
    readAndServe('cart.js','text/js',res);
    }
    else if(path === '/SignUp')
    {
        readAndServe('SignUp.html','text/html',res);
    }
    else if(path === '/getArray')
    {
      readAndServe('Storage.json','application/json',res);
    }
    else
    res.end();
  }
  else
  res.end();

}).listen(8000,'127.0.0.1');
console.log("Server Up!");
