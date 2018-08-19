const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')
const AuthPayload = require('./resolvers/AuthPayload')
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Feed,
  AuthPayload
}

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/avi-patel-28f2cc/database/dev',
      secret: 'mysecret123',
      debug: true,
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
