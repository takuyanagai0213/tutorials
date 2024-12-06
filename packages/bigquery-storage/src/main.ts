import { adapt, managedwriter } from "@google-cloud/bigquery-storage";

const projectId = 'terraform-dev-abcd';
const datasetId = 'sample';
const tableId = 'bq-storage-test';
const destinationTable = `projects/${projectId}/datasets/${datasetId}/tables/${tableId}`;

export const main = async () => {
  const md = managedwriter;

  const writerClient = new md.WriterClient({ projectId });

  try {
    const writeStream = await writerClient.getWriteStream({
      streamId: `${destinationTable}/stream/_default`,
      view: 2,
    });

    const protoDescriptor = adapt.convertStorageSchemaToProto2Descriptor(
      {
        fields: [
          { name: 'name', type: 'STRING' },
          { name: 'age', type: 'INT64' },
          { name: 'is_student', type: 'BOOL' },
        ]
      },
      'root'
    );

    const connection = await writerClient.createStreamConnection({
      streamId: managedwriter.DefaultStream,
      destinationTable,
    })

    const streamId = connection.getStreamId();

    const writer = new md.JSONWriter({
      traceId: streamId,
      connection,
      protoDescriptor,
    });

    let rows = [];
    const pendingWrites = [];

    let row = {
      name: 'John Doe',
      age: 30,
      is_student: false
    };

    rows.push(row);
    row = {
      name: 'Jane Doe',
      age: 25,
      is_student: true
    };

    rows.push(row);

    let pw = writer.appendRows(rows);
    pendingWrites.push(pw);

    rows = [];
    row = {
      name: 'Alice',
      age: 35,
      is_student: false
    };

    rows.push(row);

    pw = writer.appendRows(rows);
    pendingWrites.push(pw);

    const results = await Promise.all(pendingWrites.map(pw => pw.getResult()));
    console.log('Write results::', results);
  } catch (error) {
    console.error(error);
  } finally {
    writerClient.close();
  }
}

main();
