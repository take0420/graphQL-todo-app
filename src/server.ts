import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';

const prisma = new PrismaClient();

type Context = {
  prisma: PrismaClient;
};

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    getTodos: [Todo!]!
  }

  type Mutation {
    addTodo(title: String!): Todo!
    updateTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

const resolvers = {
  Query: {
    getTodos: async (_: unknown, args: any, context: Context) => {
      return await context.prisma.todo.findMany();
    },
  },

  Mutation: {
    // addTodo: (_: unknown, { title }: { title: string }) => {
    //   const newTodo = {
    //     id: String(todos.length + 1),
    //     title,
    //     completed: false,
    //   };
    //   todos.push(newTodo);
    //   return newTodo;
    // },
    // updateTodo: (
    //   _: unknown,
    //   { id, completed }: { id: string; completed: boolean }
    // ) => {
    //   const todo = todos.find((todo) => todo.id === id);
    //   if (!todo) {
    //     throw new Error('Todo not found');
    //   }
    //   todo.completed = completed;
    //   return todo;
    // },
    // deleteTodo: (_: unknown, { id }: { id: String }) => {
    //   const index = todos.findIndex((todo) => todo.id == id);
    //   if (!index) {
    //     throw new Error('Todo not found');
    //   }
    //   const deletedTodo = todos.splice(index, 1);
    //   return deletedTodo[0];
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): Context => ({ prisma }),
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
