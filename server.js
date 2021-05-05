const fs = require("fs")
const express = require("express")
const app = express()

const Database = require("./Database.json")
const PORT = process.env.PORT || 5000

app.get("/users", (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    const filteredUsers = []
    const limit = Number(req.query.limit) || Database.users.length
    const offset = Number(req.query.offset) || 0

    for (let i = offset; i < limit + offset; i++) {
      if (filteredUsers.length !== limit && i < Database.users.length) {
        filteredUsers.push(Database.users[i])
      }
    }

    const filtedDatabase = { ...Database, users: filteredUsers }

    res.send(filtedDatabase)
    return
  }

  res.send(Database)
})

app.get("/", (req, res) => {
  const readme = fs.readFileSync("README.html", "utf8");

  res.send(readme)
})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))