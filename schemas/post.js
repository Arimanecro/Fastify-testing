export const bodySchema = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        maxLength: 10,
        minLength: 4,
        errorMessage: {
          type: "Field ${0#} has bad type",
          required: "Field ${0#} is required!",
          maxLength: "Field ${0#} maximum 10 characters!",
          minLength: "Field ${0#} minimum 4 characters!",
        },
      },
      message: {
        type: "string",
        maxLength: 100,
        minLength: 10,
        errorMessage: {
          type: "Field ${0#} has bad type",
          required: "Field ${0#} is required!",
          maxLength: "Field ${0#} maximum 100 characters!",
          minLength: "Field ${0#} minimum 10 characters!",
        },
      },
    },
    required: ["name", "message"],
  },
};

export const regSchema = {
  body: {
    type: "object",
    errorMessage: { type: "Body should be a object" },
    properties: {
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          type: "Incorrect type",
          format: "Incorrect email format",
        },
      },
      password: {
        type: "string",
        minLength: 12,
        maxLength: 22,
        errorMessage: {
          format: "Incorrect email format",
          maxLength: "Field ${0#} should be max 22 characters",
          minLength: "Field ${0#} should be min 12 characters",
        },
      },
      username: {
        type: "string",
        maxLength: 12,
        minLength: 5,
        errorMessage: {
          maxLength: "Field ${0#} should be between 5-12 characters",
          minLength: "Field ${0#} should be between 5-12 characters",
        },
      },
    },
    required: ["username", "email", "password"],
  },
};

export const jwtSchema = {
  body: {
    type: "object",
    properties: {
      username: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["username", "password"],
  },
};
