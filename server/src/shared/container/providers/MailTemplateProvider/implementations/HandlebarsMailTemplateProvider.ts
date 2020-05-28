import handlebars from 'handlebars';
import fs from 'fs';

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import IParseMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    templateFile,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const template = await fs.promises.readFile(templateFile, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
