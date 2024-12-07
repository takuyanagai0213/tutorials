import { BigQueryReadClient } from "@google-cloud/bigquery-storage";
import { google } from "@google-cloud/bigquery-storage/build/protos/protos.js";
import avsc from "avsc";

const client = new BigQueryReadClient();

const projectId = 'terraform-dev-abcd';
const datasetId = 'sample';
const tableId = 'bq-storage-test';

export const main = async () => {

  const myProjectId = await client.getProjectId();

  const tableReference = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

  const parent = `projects/${myProjectId}`;

  const readOptions = {
    selectedFields: ['name', 'age', 'is_student'],
  };

  let tableModifiers = null;
  const snapshotSeconds = 0;

  if(snapshotSeconds > 0) {
    tableModifiers = { snapshotTime: { seconds: snapshotSeconds } };
  }

  const request: google.cloud.bigquery.storage.v1.ICreateReadSessionRequest = {
    parent,
    readSession: {
      table: tableReference,
      dataFormat: 'AVRO',
      readOptions,
      tableModifiers,
    }
  };

  const [session] = await client.createReadSession(request);

  const schema = JSON.parse(session.avroSchema?.schema as string|| '');

  const avroType = avsc.Type.forSchema(schema);

  const names = new Set();
  let offset = 0;
  if(session.streams == undefined && session.streams == null) {
    throw new Error('No stream found');
  }
  const readRowsRequest ={
    readStream: session.streams[0]?.name,
    offset,
  }

  client
    .readRows(readRowsRequest)
    .on('error', console.error)
    .on('data', data => {
      offset = data.avroRows.serializedBinaryRows.offset;

      try {
        let pos;
        do {
          const decoredData = avroType.decode(
            data.avroRows.serializedBinaryRows,
            pos
          );

          if(decoredData.value) {
            names.add(decoredData.value);
          }
          pos = decoredData.offset;
          // console.log(pos);
        } while (pos > 0);
      } catch (error) {
        console.error(error);
      }
    })
    .on('end', () => {
      for(const name of names) {
        console.log(`Got ${names.size} unique names in states: ${name}`);
      }
      console.log(`Last offset: ${offset}`);
    })
}

main().catch(console.error);
