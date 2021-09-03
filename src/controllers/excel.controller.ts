import { ExcelService } from '../services/excel';
import { ISheetFieldRaw } from '../models/excel';

const parseExcelSheet = async (request: any, response: any) => {
  const excel = new ExcelService();
  const sheet = excel.getSheets('assets/birthing-classes.xlsx', 4, 13);
  sheet.then((worksheet) => {
    const fields: ISheetFieldRaw = {
      breadcrumb: [8, 3],
      url: [9, 3],
      pageTitle: [10, 3],
      metaDescription: [11, 3],
      videoClassNumber: [17, 3],
    };
    const extractedValues = excel.extractValuesFromSheets(worksheet, fields);
    console.log(extractedValues);
  });
};

export { parseExcelSheet };
