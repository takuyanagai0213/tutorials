import { db } from "./database";


const getPerson = async () => {
  return await db.selectFrom("person").selectAll().where("id", "=", 1).execute();
};

const main = async () => {
  const res = await getPerson();
  console.log(res);
};

main();
