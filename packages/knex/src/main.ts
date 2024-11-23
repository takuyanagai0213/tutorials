import type{ Knex } from "knex";
import { knex } from "knex";

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  name: string;
  content: string;
  user_id: number;
}

const config: Knex.Config =  {
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
};


const db = knex(config);

const getUsers = async () => {
  return await db<User>(`users`).select('*').join('posts', 'users.id', 'posts.user_id');
};

const createUser = async (user: User) => {
  return await db<User>('users').insert({name: user.name});
}

const main = async () => {
  console.log("Creating table users");
  try {_
    const user = await createUser({ id: 1, name: `John` });
    const post = await db<Post>('posts').insert({name: 'test', content: 'test', user_id: 1});
    console.log(user);

    const users = await getUsers();
    console.log(users);
  } catch (e) {
    console.log(e);
  }
};

main();
