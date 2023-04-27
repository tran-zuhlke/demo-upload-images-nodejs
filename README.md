# demo-upload-images-nodejs

Uploading multiple images using multer (npm) and take advantages of multicore by using cluster of Node.js and NGINX as load balancer

## NGINX load balancer
Install nginx using Homebrew
```console
> brew install nginx
```

Normally, when using Homebrew, the nginx.conf is located in /opt/homebrew/etc/nginx/nginx.conf; or you can check for nginx info with below command
```console
> brew info nginx
```

To start nginx server (default is localhost:8080)
```console
> sudo nginx
```

To reload config
```console
> sudo nginx -s reload
```

To stop nginx server
```console
> sudo nginx -s stop
```

## Node.js server
Install dependencies
```console
> npm install express multer
```

Run app (default is localhost with port from 3001 -> 3010)
```console
> node server.js
```

Postman request
<img width="733" alt="image" src="https://user-images.githubusercontent.com/114555002/234792480-24ea9fd3-dd21-4257-a12e-60289663f226.png">
