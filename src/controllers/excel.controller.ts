import { ExcelService } from '../services/excel';

const parseExcelSheet = async (request: any, response: any) => {
  const excel = new ExcelService();
  const sheet = excel.getSheets('assets/birthing-classes.xlsx', 4, 13);
  sheet.then((worksheet) => {
    console.log(worksheet);
  });
};

export { parseExcelSheet };
