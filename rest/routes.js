const Router = require("@koa/router")

const router = new Router()

router.get("/me/summary", async ctx => {
    const { id, name, skype, twitter } = await ctx.apiClient.get("/api/32/me")
    ctx.body = {
        id,
        name,
        socialMedia: { skype, twitter }
    }
})

router.get("/me/data_sets", async ctx => {
    const { dataSets } = await ctx.apiClient.get("/api/32/me")
    ctx.body = await Promise.all(
        dataSets.map(datasetID => ctx.apiClient.get(`/api/dataSets/${datasetID}`))
    )
})

module.exports = router.routes()
