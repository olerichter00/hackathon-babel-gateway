const resolvers = {
  Query: {
    add: async (_, { x, y }) => x + y,
  },
}

export default { resolvers }
