import { CronJob } from "cron";
import { container } from "tsyringe";

import CheckInstallmentService from "@modules/finances/services/CheckInstallmentService";

class CronJobs {
  constructor() {
    new CronJob('0 0 6 * * Mon-Fri', async () => {
      await this.run();
      }, null, true, 'America/Fortaleza'
    );
  }

  public async run(): Promise<void> {
    const checkInstallmentService = container.resolve(CheckInstallmentService);
    await checkInstallmentService.execute(); 
  }
}

export default CronJobs;