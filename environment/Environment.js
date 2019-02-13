import ProductionEnvironment from './ProductionEnvironment';
import StagingEnvironment from './StagingEnvironment';
import { Constants } from 'expo';

function getEnvironment() {
  if (!__DEV__) {
    return ProductionEnvironment;
  }
  return StagingEnvironment;
}

const Environment = getEnvironment();
export default Environment;
