const yunho = {
  name: "Yunho",
  age: 18,
  gender: "female"
};

const resolvers = {
  Query: {
    person: () => yunho
  }
}

export default resolvers;