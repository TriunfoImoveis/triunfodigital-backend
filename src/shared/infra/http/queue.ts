import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

import '@shared/container/providers';
import Queue from '@shared/container/providers/JobProvider/implementations/Queue';


Queue.process();