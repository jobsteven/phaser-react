module.exports = function(umdConf) {
  umdConf.webpackFeatures.enableEntryHTML = true;
  umdConf.webpackFeatures.enableLESSModule = { modules: true, url: false };

  umdConf.webpackFeatures.enableClean();
  umdConf.webpackFeatures.enableHits();

  // umdConf.webpackFeatures.enableVendors();
  // umdConf.addVendor('react');
  // umdConf.addVendor('react-dom');

  // umdConf.addModuleAlias('react', 'preact-compat');
  // umdConf.addModuleAlias('react-dom', 'preact-compat');

  // umdConf.webpackFeatures.enableNode();
  // umdConf.addExternalRequire('electron');
};