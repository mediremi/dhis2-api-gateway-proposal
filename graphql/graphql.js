const { buildSchema } = require("graphql")

exports.schema = buildSchema(`
  type SocialMedia {
    skype: String
    twitter: String
  }

  type Me {
    id: ID!
    name: String
    socialMedia: SocialMedia
  }

  type Query {
    me: Me
  }
`)

exports.root = {
    me: async (_, ctx) => {
        const { id, name, skype, twitter } = await ctx.apiClient.get("/api/32/me")
        return {
            id,
            name,
            socialMedia: { skype, twitter }
        }
    },
}
