module.exports = ({ API_OUTSOURCE }) => {
  return {
    "/outsource/": {
      secure: false,
      target: API_OUTSOURCE,
      pathRewrite: {
        "^/outsource/": "/api/"
      }
    }
  };
};