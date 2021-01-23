
import pkg from "graphql-yoga";
const { GraphQLServer } = pkg;

const server = new GraphQLServer({

});

server.start(()=>console.log("Graphql Server Running"));