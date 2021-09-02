import * as Excel from 'exceljs';
import { Workbook } from 'exceljs';

class ExcelService {
  workbook: any;

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
  ): Promise<Excel.Worksheet[]> => {
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
}

export { ExcelService };
