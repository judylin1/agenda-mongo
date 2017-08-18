const Agenda = require('agenda');
const { MongoClient } = require('mongodb');

async function run() {
  const db = await MongoClient.connect('mongodb://localhost:27017/agendatest');
  const agenda = new Agenda().mongo(db, 'jobs');

  await new Promise(resolve => agenda.once('ready', resolve()));

  // The third parameter to `schedule()` is an object that can contain
  // arbitrary data. This data will be stored in the `data` property
  // in the document in mongodb
  agenda.schedule(new Date(Date.now() + 1000), 'print', {
    message: 'Hello!'
  });
}

run().catch(error => {
  console.error(error);
  process.exit(-1);
});
