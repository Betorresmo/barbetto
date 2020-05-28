interface IMailTemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  templateFile: string;
  variables: IMailTemplateVariables;
}
