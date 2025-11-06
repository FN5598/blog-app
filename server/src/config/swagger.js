const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Your Blog API",
            version: "1.0.0",
            description: "A complete blogging platform API",
        },
        servers: [
            { url: "http://localhost:5000", description: "Development server" },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to your route files with JSDoc annotations
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
