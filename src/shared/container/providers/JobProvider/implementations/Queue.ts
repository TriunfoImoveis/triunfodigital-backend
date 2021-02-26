import Queue from 'bull';
import redisConfig from '@config/redis';

import * as jobs from '@shared/infra/jobs';
import ISendEmailJobDTO from '@shared/container/providers/JobProvider/dtos/ISendEmailJobDTO';
import AppError from '@shared/errors/AppError';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: {
      host: 'localhost',
      port: 6379,
    }
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: string, data: ISendEmailJobDTO) {
    const queue = this.queues.find(queue => queue.name === name);

    if (!queue) {
      throw new AppError('Não há jobs com esta key name.');
    }

    return queue.bull.add(data);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.name, job.data);
        console.log(err);
      });
    });
  }
}