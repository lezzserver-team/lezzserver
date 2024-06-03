---
sidebar_position: 1
---

# Docker 

1. run lezzserver on your local machine
```bash
docker run --name lezzserver/lezzserver-lite -p 2222:2222 -p 2223:2223 -d lezzserver
```

note: lezzserver need to expose port 2222 and 2223

2. create your account for the first time, open http://localhost:2222/register in your browser, click sign up button and add your account,

3. install lezzserver cli globally
```bash
npm install -g @lezzserver/cli
```

now the lezzserver ready at your local machine, we can integrate lezzserver to your react project


