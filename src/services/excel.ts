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
          const fieldValues: number[] = fields[field];
          fieldObject[field] = sheet
            .getRow(fieldValues[0])
            .getCell(fieldValues[1]).text;
        }
        extractedSheets[sheet.id] = { ...fieldObject };
      }
    }
    return extractedSheets;
  }

  private isNA = (value: Excel.CellValue) => {
    let hasNA = false;
    if (typeof value === 'string') {
      if (value.includes('N/A')) {
        hasNA = true;
      }
    }
    return hasNA;
  };

  public extractValuesFromSheetAuto(
    sheets: Excel.Worksheet[] | Excel.Worksheet
  ) {
    if (sheets instanceof Array) {
      const columnsValues = sheets[0].columns[1].values;
      const startIndex = this.getStartingIndexFromColor(
        sheets[0],
        columnsValues
      );
      if (startIndex && columnsValues) {
        for (let i = startIndex; i < columnsValues.length; i++) {
          const keyFieldValue = sheets[0].getRow(i).getCell(2).value;
          if (keyFieldValue) {
            const adjacentCell = this.getAdjacentCell(
              sheets[0].getRow(i),
              keyFieldValue
            );
            const fieldValue = sheets[0]
              .getRow(i)
              .getCell(adjacentCell + 1).value;
            if (keyFieldValue != fieldValue && !this.isNA(fieldValue)) {
              console.log({
                index: sheets[0].getRow(i).getCell(adjacentCell).value,
                value: sheets[0].getRow(i).getCell(adjacentCell + 1).value,
              });
            }
          }
        }
      }
      for (let i = 0; i < sheets.length; i++) {
        const sheet = sheets[i];
      }
    }
  }

  private getAdjacentCell = (row: any, adjacentValue: Excel.CellValue) => {
    const cells: any[] = row._cells;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i]) {
        const cell = cells[i];
        const cellValue = cell.value;
        if (cellValue === adjacentValue) {
          return cell._column._number;
        }
      }
    }
  };

  private getStartingIndexFromColor = (
    sheet: Excel.Worksheet,
    columns: readonly Excel.CellValue[] | undefined
  ) => {
    if (columns) {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i]) {
          const row: any = sheet.getRow(i);
          const rowCells: any[] = row._cells;
          for (let j = 0; j < rowCells.length; j++) {
            if (rowCells[j] && rowCells[j].value) {
              const fieldColor = rowCells[j].fill;
              if (fieldColor && 'fgColor' in fieldColor) {
                const fgColor = fieldColor.fgColor;
                if (fgColor && 'argb' in fgColor) {
                  if (fgColor.argb === 'FFFF9EA1') {
                    return i;
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}

export { ExcelService };
