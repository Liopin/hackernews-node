const { GraphQLServer } = require('graphql-yoga')

const typeDefs = `
type Query {
    info: String!
    feed: [Link!]!
}

type Link {
    id: ID!
    description: String!
    url:String!
}
`

//Data

let links = [{
    id: 'link-O',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]


const resolvers = {
    Query: {
        info: () => `This is the API of a Hachernews Clone`,
        feed: () => links,
    },

    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})
server.start(() => console.log(`Server is running on port 4000`))