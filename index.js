const jwt = require('jsonwebtoken');
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const appUrl= "http://localhost:5173";
const watchlist= [];

app.use(express.json())
app.use(cors ({
    origin: appUrl,
    credentials:true
}))
app.use(require('cookie-parser')());
app.post("/auth/login/", (req, res)=>{
    const users = [{
        name:'Prakash', role:'dev', id: '123'
    }];
    const user = users[0] //.find(_user => _user.userName === req.body.name);
    if(!user) return res.status(401),express.json({error: "invalid User credentials"})

    const accessToken = jwt.sign({sub: user.id, name: user.name, role: user.role},'secret_key', {expiresIn:'1m'});
    const refreshToken = jwt.sign(
        {id:user.id, name:user.name, role:user.role}, 'refresh_secret_key', {expiresIn: '15m'}
    );
    res.cookie('refreshToken', refreshToken,{
        httpOnly:true,
        sameSite:'strict',
        maxAge:5*60*1000,
        secure:true
    });
    res.json({accessToken, user: {id:user.id, name:user.name}})
});
app.post("/auth/logout", (req,res)=> {
     res.clearCookie('refreshToken',{
        httpOnly:true,
        sameSite: 'strict',
        secure:true
     });
     res.json({message: "user logout successfully"})
});
app.post('/auth/refresh-token', (req,res) => {
    const token = req.  cookies.refreshToken;
    if( !token) return res.status(401).json({error: 'No refresh token'});
    try {
        const payload = jwt.verify(token, 'refresh_secret_key');
        const nerAccessToken = jwt.sign({sub: payload.sub}, 'secret_key',{
            expiresIn:'1m'
        });

        const newRefreshToken = jwt.sign({sub:payload.sub}, 'refresh_secret_key', {expiresIn:'60m'});
         res.cookie('refreshToken', newRefreshToken, {
            secure:true,
            sameSite: 'strict',
            maxAge: 60*60*1000
         });
        res.status(200).json({accessToken: nerAccessToken})

        
    } catch (error) {
        res.status(401).json({error:"Refres token invalid or Expired"})
        
    }
})

function authenticateToken(req, res, next)  {
    const authHeader = req.headers['authorization'];

     if (!authHeader)
        { return res.status(401).json({error: 'No token provided'})}

     const token = authHeader.split(' ')[1];
     jwt.verify(token, 'secret_key',(err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next()
    })
}
app.post('/post/watchlist',authenticateToken, (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                message: 'Movie is required'
            });
        }

       watchlist.push({
            userId: req.user.sub,   // 👈 link to user
            movie: req.body
        });

        res.status(200).json({
            message: 'watchlist updated'
        });

    } catch (error) {
        console.error('something failed:', error);

        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})