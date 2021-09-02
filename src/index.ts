import 'dotenv/config';
import express from 'express';
import { ContentfulService } from './services/contentful';
import { parseExcelSheet } from './controllers/excel.controller';

const app = express();

app.get('/', (req, res) => {
  console.log(process.env);
  let contentful = new ContentfulService();
  const client = contentful.client;
  client
    .getEntries({
      content_type: 'lesson',
      query: 'fetch',
      links_to_entry: '1wMm7tnKi0kIYsI24eYiKS',
    })
    .then((entries) => {
      console.log('entries', entries);
    })
    .catch((error) => {
      console.error(error);
    });

  parseExcelSheet(req, res);

  res.send('Well done test!');
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
