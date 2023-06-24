import swaggerAutogen from 'swagger-autogen';
import { config } from './config.js';

const doc = {
  info: {
    title: 'My API',
    description: 'Dwitter API'
  },
  host: config.render.host,
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./router/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);