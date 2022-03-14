module.exports = ({ API_CRM }) => {
  return {
    "/crm/": {
      secure: false,
      target: API_CRM,
      pathRewrite: {
        "^/crm/": "/api/"
      }
    }
  };
};