const ProductionEnvironment = {
  AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY || '',
  AMPLITUDE_PROJECT_ID: process.env.AMPLITUDE_PROJECT_ID || '',
};

export default ProductionEnvironment;
