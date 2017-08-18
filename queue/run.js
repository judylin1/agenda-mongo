const Agenda = require('agenda');
const { MongoClient } = require('mongodb');

async function run() {
  const db = await MongoClient.connect('mongodb://localhost:27017/agendatest');
  const agenda = new Agenda().mongo(db, 'jobs');

  // `job` is an object representing the job that `producer.js` scheduled.
  // `job.attrs` contains the raw document that's stored in MongoDB, so
  // `job.attrs.data` is how you get the `data` that `producer.js` passes
  // to `schedule()`
  agenda.define('print', job => {
    console.log(job.attrs.data.message);
    process.exit(0);
  });

  await new Promise(resolve => agenda.once('ready', resolve()));

  agenda.start();
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});
