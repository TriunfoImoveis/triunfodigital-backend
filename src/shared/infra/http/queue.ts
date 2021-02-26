import 'reflect-metadata';

import '@shared/container/providers';
import Queue from '@shared/container/providers/JobProvider/implementations/Queue';


Queue.process();