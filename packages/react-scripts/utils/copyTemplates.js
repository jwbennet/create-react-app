'use strict';

const chalk = require('chalk');
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const path = require('path');
const paths = require('../config/paths');

const copyTemplateDirectory = (source, target, templateContext, filter) => {
  let files = fs.readdirSync(source);
  if(filter) {
    files = files.filter(filter);
  }
  fs.ensureDirSync(target);
  files.forEach(file => {
    if(file.endsWith('.j2')) {
      const targetFile = path.join(target, file.substring(0, file.length - 3));
      fs.writeFileSync(targetFile, nunjucks.render(path.join(source, file), templateContext));
    } else {
      fs.copySync(path.join(source, file), path.join(target, file));
    }
  });
};

module.exports = (appName, appPath, templatePath, activeModules) => {
  if (fs.existsSync(templatePath)) {
    const templateContext = Object.assign({}, activeModules, {
      name: appName
    });
    fs.copySync(path.join(templatePath, 'gitignore'), path.join(appPath, 'gitignore'));
    fs.copySync(path.join(templatePath, 'README.md'), path.join(appPath, 'README.md'));

    copyTemplateDirectory(path.join(templatePath, 'public'), paths.appPublic, templateContext, file => file !== 'index.html');
    fs.copySync(path.join(templatePath, 'public/index.html'), paths.appHtml);
    copyTemplateDirectory(path.join(templatePath, 'src'), paths.appSrc, templateContext);
    const testTemplateContext = Object.assign({}, templateContext, {
      testRelativeSourcePath: path.relative(paths.appTest, paths.appSrc).replace(/\\/g, '/')
    });
    copyTemplateDirectory(path.join(templatePath, 'test'), paths.appTest, testTemplateContext);
    if(activeModules.redux) {
      copyTemplateDirectory(path.join(templatePath, 'containers'), path.join(paths.appSrc, 'containers'), templateContext);
      copyTemplateDirectory(path.join(templatePath, 'modules'), path.join(paths.appSrc, 'modules'), templateContext);
    }
    if(activeModules.form) {
      copyTemplateDirectory(path.join(templatePath, 'forms'), path.join(paths.appSrc, 'forms'), templateContext);
    }
  } else {
    console.error('Could not locate supplied template: ' + chalk.green(templatePath));
    return;
  }
};
