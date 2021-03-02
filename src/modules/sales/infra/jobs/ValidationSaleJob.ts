import { container } from "tsyringe"

import SendEmailJob from '@shared/container/providers/JobProvider/implementations/SendEmailJob';

export default {
  key: "ValidationSaleJob",
  async handle(data: any): Promise<void> {
    const sendEmailJob = container.resolve(SendEmailJob);
    await sendEmailJob.run({
      to_users: data.data.to_users,
      subject: data.data.subject,
      file: data.data.file,
      variables: data.data.variables
    });
  },
}