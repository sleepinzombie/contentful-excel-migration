import * as Excel from 'exceljs';
import { Workbook } from 'exceljs';
import { ISheetFieldRaw, ISheetField } from '../models/excel';

class ExcelService {
  workbook: Excel.Workbook;

  public constructor() {
    this.workbook = new Excel.Workbook();
  }

  /**
   * Get a specific excel worksheet file.
   * @param excelPath The relative path to the excel file.
   * @returns Promise containing the worksheet fetched.
   */
  public getSheets = async (
    excelPath: string,
    start: number,
    end?: number
  ): Promise<Excel.Worksheet[] | Excel.Worksheet> => {
    return this.workbook.xlsx.readFile(excelPath).then((response: Workbook) => {
      if (!end) {
        return response.worksheets[start];
      }
      let sheets = [];
      for (let i = start; i < end; i++) {
        sheets.push(response.worksheets[i]);
      }
      return sheets;
    });
  };

  /**
   * Extract values from the Excel file using rows and cells.
   * @param sheets The Excel sheet that we need to extract data from.
   * @param fields List of fields in form of rows and cells.
   * @returns An array of objects for the fields extracted.
   */
  public extractValuesFromSheets(
    sheets: Excel.Worksheet[] | Excel.Worksheet,
    fields: ISheetFieldRaw
  ): ISheetFieldRaw[] {
    let extractedSheets: ISheetFieldRaw[] = [];
    let fieldObject: ISheetField | any = {};
    if (sheets instanceof Array) {
      for (let sheet of sheets) {
        for (let field in fields) {
          const fieldValue: number[] = fields[field];

          fieldObject[field] = sheet
            .getRow(fieldValue[0])
            .getCell(fieldValue[1]).text;
        }
        extractedSheets[sheet.id] = { ...fieldObject };
      }
    }
    return extractedSheets;
  }
}

export { ExcelService };
