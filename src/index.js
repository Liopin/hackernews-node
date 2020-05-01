const { GraphQLServer } = require('graphql-yoga')


//Data

let links = [{
    id: 'link-O',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com'
}]

let idCount = links.length

const resolvers = {
    Query: {
        info: () => `This is the API of a Hachernews Clone`,
        feed: () => links,
    },
    Mutation: {
        post: (parent, args) => {
        const link = {
            id: `link-${idCount++}`,
            description: args.description,
            url: args.url,
        }
            links.push(link)
            return link
        }
    },

}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Server is running on port 4000`))