import express from "express"
import db from "./db/connect.js"
import { users } from "./db/schema.js";
import bodyParser from 'body-parser';
import * as bcrypt from "bcrypt"
import { eq } from "drizzle-orm";
import pkg from "jsonwebtoken";
import cookieParser from "cookie-parser";
const app = express()
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser())
app.post("/register", async (req,res)=> {
    const {username, password} = req.body;
    const data = await db.query.users.findFirst({
        where: eq(users.username, username)
    });
    if(data){
        res.send("Username Exists please login")
    }
    else{
        const pass = await bcrypt.hash(password,10)
        await db.insert(users).values({
            username: username,
            pass: pass
        })
        res.status(200).send("Success")
    }
})

app.post("/signin", async (req,res)=> {
    const {username, password} = req.body;
    const data = await db.query.users.findFirst({
        where: eq(users.username, username)
    })
    if(data){
        const match = bcrypt.compareSync(password,data.pass)
        if(match){
            const token = pkg.sign(username,'SecretKEy')
            res.cookie("token",token)
            res.status(200).send("Signed In")
        }
        else{
            res.clearCookie("token")
            res.status(404).send("Wrong credentials")
        }
    }
    else{
        res.status(404).send("Not a registered username")
    }
})

const authenticateToken = (req,res,next) => {
    const token = req.cookies.token
    try{
        const user = pkg.verify(token,"SecretKEy")
        req.user = user;
        next();
    }
    catch(err){
        res.clearCookie("token")
        return res.send("Access Denied!")
    }
}

app.post("/access",authenticateToken,(req,res)=>{
    res.send("Granted Access to "+ req.user)
})


app.listen(8080, ()=>{
    console.log("8080 running")
})