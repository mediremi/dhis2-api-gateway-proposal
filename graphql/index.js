const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const cookieParser = require("cookie-parser")
const ApiClient = require("./lib/api-client")
const { schema, root } = require("./graphql")

const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
    if (req.method == "GET") {
        next()
        return
    }

    const jsessionID = req.cookies.JSESSIONID || req.get("X-AuthToken")
    req.apiClient = new ApiClient({ jsessionID })
    next()
})

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: {
        defaultQuery: `
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# Remember to click on 'Request Headers' below
# and enter {"X-AuthToken": "<your JSESSIONID cookie value>"}
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
{
  me {
    name
    socialMedia { skype, twitter }
  }
}
`,
        headerEditorEnabled: true
    },
}))

app.listen(8000, () => {
    console.log("Listening on port 8000")
})
