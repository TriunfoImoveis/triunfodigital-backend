export default interface IRequestReportDTO {
  workSheetData: (string | null)[][];
  fileName: string;
  refCol: string | undefined;
}