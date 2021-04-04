interface ISheetVariables {
  headers: {
    [key: string]: any;
  }[];
  data: {
    [key: string]: any;
  }[];
}

export default interface IRequestReportDTO {
  workSheetData: ISheetVariables;
  fileName: string;
  refCol?: string;
}