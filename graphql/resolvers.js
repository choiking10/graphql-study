const people = [
  {
    id: 1,
    name: "Yunho",
    age: 18,
    gender: "female"
  },
  {
    id: 2,
    name: "Yunho2",
    age: 18,
    gender: "female"
  },
  {
    id: 3,
    name: "Yunho3",
    age: 18,
    gender: "female"
  },
  {
    id: 4,
    name: "Yunho4",
    age: 18,
    gender: "female"
  },
]

const getById = id => {
  const filteredPerson = people.filter(person => id == person.id);
  return filteredPerson[0];
}

const resolvers = {
  Query: {
    people: () => people,
    person: (_, args) => {
      return getById(args.id);
    }
  }
}

export default resolvers;