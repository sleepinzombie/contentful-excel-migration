import express from 'express';
import { ContentfulService } from './services/contentful';
import { ExcelService } from './services/excel';

const app = express();

app.get('/', (req, res) => {
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

  // Test Read Excel
  let excel = new ExcelService();
  console.log(excel);
  excel.getSheet();

  res.send('Well done test!');
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
