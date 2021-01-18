const Koa = require("koa")
const ApiClient = require("./lib/api-client")
const routes = require("./routes")

const app = new Koa()

app.use(async (ctx, next) => {
    ctx.jsessionID = ctx.cookies.get("JSESSIONID")
    if (ctx.jsessionID) {
        await next()
        return
    }
    const err = new Error("No JSESSION in cookie")
    err.status = 400
    throw err
})

app.use(async (ctx, next) => {
    ctx.apiClient = new ApiClient({ jsessionID: ctx.jsessionID })
    await next()
})

app.use(routes)

app.listen(8000, () => {
    console.log("Listening on port 8000")
})
