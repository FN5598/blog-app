// server/src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Load all YAML files
const swaggerConfig = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
const schemas = YAML.load(path.join(__dirname, '../docs/schemas.yaml'));
const authRoutes = YAML.load(path.join(__dirname, '../docs/auth.yaml'));

// Merge everything
const swaggerDefinition = {
  ...swaggerConfig,
  components: {
    ...swaggerConfig.components,
    ...schemas.components
  },
  paths: {
    ...swaggerConfig.paths,
    ...authRoutes.paths
    // Add other route files here as you create them (posts.yaml, users.yaml, etc.)
  }
};

const options = {
  definition: swaggerDefinition,
  apis: [
    path.join(__dirname, '../routes/*.js') // Still scan route files for any JSDoc comments
  ],
};

const specs = swaggerJsdoc(options);

// Optional: Add dark theme
const swaggerOptions = {
  customCss: `
    .swagger-ui { 
      filter: invert(0.9) hue-rotate(180deg); 
    }
    .swagger-ui .scheme-container { 
      background: inherit; 
    }
  `,
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'none',
    filter: true,
  }
};

module.exports = {
  swaggerUi,
  specs,
  swaggerOptions
};