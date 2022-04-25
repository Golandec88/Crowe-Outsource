module.exports = ({ API_CRM, API_USER, API_EDO }) => {
  return {
    "/crm/": {
      secure: false,
      target: API_CRM,
      pathRewrite: {
        "^/crm/": "/api/"
      }
    },
    "/edo/": {
      secure: false,
      target: API_EDO,
      pathRewrite: {
        "^/edo/": "/api/"
      }
    },
    "/user/": {
      secure: false,
      target: API_USER,
      pathRewrite: {
        "^/user/": "/api/"
      }
    }
  };
};
