module.exports = ({ API_CRM, API_USER }) => {
  return {
    "/crm/": {
      secure: false,
      target: API_CRM,
      pathRewrite: {
        "^/crm/": "/api/"
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