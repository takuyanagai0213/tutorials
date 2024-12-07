import { Bigtable } from "@google-cloud/bigtable";

const bigtable = new Bigtable();

const main = async () => {
  const instance = bigtable.instance('nagai-test');
  const table = instance.table('sample-table');

  const [singleRow] = await table.row('greeting0').get();

  const rowData = JSON.stringify(singleRow.data, null, 4);

  console.log(`Row data: ${rowData}`);
}

main().catch(console.error);
