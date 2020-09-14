import { ConfigInterface } from './config';
import { ProductionConfig } from './config.production';
import { StagingConfig } from './config.staging';
import { DevelopmentConfig } from './config.development';

const testingModeOn = process.env.SKYHITZ_ENV === 'test';
const testingStagingModeOn = process.env.SKYHITZ_ENV === 'development';
export const isTesting = testingModeOn || testingStagingModeOn ? 1 : 0;

let config: ConfigInterface = ProductionConfig;

if (testingModeOn) {
  config = DevelopmentConfig;
}

if (testingStagingModeOn) {
  config = StagingConfig;
}

export const Config = config;
