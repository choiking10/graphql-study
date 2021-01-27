import {getById, getMovies, deleteMovie} from "./db.js";

const resolvers = {
  Query: {
    movies: () => getMovies(),
    movie: (_, {id}) => getById(id)
  },
  Mutation: {
    deleteMovie: (_, {id}) => deleteMovie(id)
  }
}

export default resolvers;