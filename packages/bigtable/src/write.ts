import { Bigtable } from "@google-cloud/bigtable";

const bigtable = new Bigtable();
const instance = bigtable.instance('nagai-test');
const table = instance.table('sample-table');

const createTable = async () => {
  const [tableExists] = await table.exists();
  if(!tableExists) {
    console.log(`Creating table: ${table.id}`);
    const options = {
      families: [
        {
          name: 'follows',
          rule: {
            versions: 10,
          },
        },
        {
          name: 'followers',
          rule: {
            versions: 1,
          },
        }
      ],
    };
    await table.create(options);
  }
}

const insertRows = async () => {
  const greetings = ['Hello World!', 'Hello Bigtable!', 'Hello Nagai!'];
  const rowsToInsert = greetings.map((greeting, index) => ({
    key: `greeting${index}`,
    data: {
      follows: {
        present: {
          value: greeting,
          timestamp: new Date(),
          xxx: {
            value: greeting,
            timestamp: new Date(),
          }
        },
        xxx: {
          value: {
            value: greeting,
            test: {
              value: greeting,
              timestamp: new Date(),
            },
            timestamp: new Date(),
          },
          timestamp: new Date(),
        }
      }
    }
  }));
  await table.insert(rowsToInsert);
}

// createTable().catch(console.error);
insertRows().catch(console.error);
