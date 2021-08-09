import { ConfigInterface } from './config';
import { ProductionConfig } from './config.production';
import { StagingConfig } from './config.staging';
import { DevelopmentConfig } from './config.development';

const testingModeOn = process.env.EXPO_SKYHITZ_ENV === 'test';

const testingStagingModeOn = process.env.EXPO_SKYHITZ_ENV === 'development';

const testingEnv = testingModeOn || testingStagingModeOn;

export const isTesting = testingEnv ? 1 : 0;

let config: ConfigInterface = ProductionConfig;

if (testingModeOn) {
  config = DevelopmentConfig;
}

if (testingStagingModeOn) {
  config = StagingConfig;
}

export const Config = config;
