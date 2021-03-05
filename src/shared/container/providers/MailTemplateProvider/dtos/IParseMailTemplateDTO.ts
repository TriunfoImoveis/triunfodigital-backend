interface ITemplateVariables {
  [key: string]: string| string[] | number | Object;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}