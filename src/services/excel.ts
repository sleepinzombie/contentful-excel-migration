import * as Excel from 'exceljs'

class ExcelService {
  workbook: any

  public constructor() {
    this.workbook = new Excel.Workbook()
  }

  public getSheet = () => {
    const excelPath = 'assets/birthing-classes.xlsx'
    this.workbook.xlsx.readFile(excelPath).then((response: any) => {
      console.log(response)
    })
  }
}

export { ExcelService }
