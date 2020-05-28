import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

export default interface IMailTemplate {
  parse(templateData: IParseMailTemplateDTO): Promise<string>;
}
