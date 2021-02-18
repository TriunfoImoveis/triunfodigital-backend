interface ITemplateVariables {
  [key: string]: string| string[] | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}