const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Customer Management API",
    version: "1.0.0",
    description:
      "API for managing users and customers with features like registration, login, search, and filtering.",
    contact: {
      name: "Rahul Kumar",
      email: "kumarrahulbasdiha@gmail.com",
    },
  },
  servers: [
    {
      url: "https://backend-wisdom-puce.vercel.app",
      description: "Vercel Deploy server",
    },
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js","./controllers/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerSpec),
};
