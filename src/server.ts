import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { readFileSync, writeFileSync } from 'fs'
// import { a } from './generator/appstundefined'
import { generator } from './generator/appstate'
import { addedstate } from './index'

export function server(){
  const app: Express = express()
  const body = bodyParser.urlencoded({extended: false})
  app.listen(3000, () => {
    console.log("Starting server")
  })

  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/source/index.html`)
  })

  app.post("/register", body, async (req, res) => {
    // import { generator } from './generator/appstate.ts'
    try{
      const data = req.body
      if(data.username != "" && data.password != ""){
        let d: any = await generator(data.username, data.password)
        console.log(d)
        if(d.ok){
          addedstate(d.state)
          res.send("Your bot is now added on the list")
        }else{
          res.send("There's something wrong on the server")
        }
      }else if(data.appstate != ""){
        let e = JSON.parse(readFileSync("configurations/appstates.json", "utf-8"))
        e['accounts'].push(data.appstate)
        writeFileSync("configurations/appstates.json", JSON.stringify(e), "utf-8")
        addedstate(data.appstate)
        res.send('Thank you for your trust, you may now test your bot.')
      }else{
        res.send("You've entered wrong")
      }
    }catch(e){}
  })
}
