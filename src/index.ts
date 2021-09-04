import 'dotenv/config';
import express from 'express';
import { index as ContentfulIndex } from './controllers/contentful.controller';
import {
  index as ContentfulManagementIndex,
  insert as ContentfulManagementInsert,
  insertReference as ContentfulManagementInsertReference,
  createEntryWithReference,
} from './controllers/contentful-management.controller';
import { parseExcelSheet } from './controllers/excel.controller';

const app = express();

app.get('/', async (req, res) => {
  // Test contentful API.
  // ContentfulIndex();

  // Test contentful management API.
  // ContentfulManagementIndex();
  // ContentfulManagementInsert();
  // ContentfulManagementInsertReference();
  createEntryWithReference();

  // Test excel parsing.
  // parseExcelSheet(req, res);

  res.send('This is a default render page from Express.');
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
