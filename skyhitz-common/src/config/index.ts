import { ConfigInterface } from './config';
import { ProductionConfig } from './config.production';
import { StagingConfig } from './config.staging';

const testingModeOn = process.env.NODE_ENV === 'development';
export const isTesting = testingModeOn ? 1 : 0;

let config: ConfigInterface = ProductionConfig;

if (isTesting) {
  config = StagingConfig;
}

export const Config = config;
