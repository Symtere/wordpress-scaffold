const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const renderPath = './';
//const renderPath = './test/';

const setGitignore = (object) => {
    let gitignoreTpl = fs.readFileSync('./scaffold/tpl/gitignore.txt').toString();
    let renderGitignoreTpl = mustache.render(gitignoreTpl,object);
    fs.writeFileSync(renderPath + '.gitignore', renderGitignoreTpl);
}

const setReadme = (object) => {
    let readMeTpl = fs.readFileSync('./scaffold/tpl/readme.txt').toString();
    let renderReadMeTpl = mustache.render(readMeTpl,object);
    fs.writeFileSync(renderPath + 'README.md', renderReadMeTpl);
};

const setComposer = (object) => {
    let composerTpl = fs.readFileSync('./scaffold/tpl/composer.txt').toString();
    let renderComposerTpl = mustache.render(composerTpl,object);
    fs.writeFileSync(renderPath + 'composer.json', renderComposerTpl);
};

const setWpCliYml = () => {
    fs.copyFile('./scaffold/tpl/wp-cli.yml', renderPath + 'wp-cli.yml', (err) => {
        if (err) {
            throw err
        }
    });
}

const setShellInstall = (object) => {
    let shellInstallTpl = fs.readFileSync('./scaffold/tpl/install.sh').toString();
    let renderShellInstallTpl = mustache.render(shellInstallTpl,object);
    fs.writeFileSync('./config/install.sh', renderShellInstallTpl);
};

const setMigrations = (object) => {

    //fs.readdir('./scaffold/tpl/migrations', (err, migrations) => {
        var migrations = [];

        if ( object.stagingUrl != '' ) {
            migrations.push('local-staging.sh','staging-local.sh');
        }
        if ( object.prodUrl != '' ) {
            migrations.push('prod-local.sh','local-prod.sh');
        }
        if ( object.stagingUrl != '' && object.prodUrl != '' ) {
            migrations.push('prod-staging.sh','staging-prod.sh');
        }

        if ( '' != migrations )  {
            migrations.forEach(script => {
                let scriptName = fs.readFileSync('./scaffold/tpl/migrations/' + script).toString();
                let renderSriptTpl = mustache.render(scriptName,object);
                fs.writeFileSync( './config/migrations/' + script, renderSriptTpl);
            });
        }
    //});
};

const setPackage = (object) => {
    let packageTpl = fs.readFileSync('./scaffold/tpl/package.json').toString();
    let renderPackageTpl = mustache.render(packageTpl,object);
    fs.writeFileSync('./package.json', renderPackageTpl);
}

const setHtaccess = () => {
    fs.copyFile('./scaffold/tpl/htaccess.txt', renderPath + '.htaccess', (err) => {
        if (err) {
            throw err
        }
    });
}

const setRobotsTxt = () => {
    fs.copyFile('./scaffold/tpl/robots.txt', renderPath + 'robots.txt', (err) => {
        if (err) {
            throw err
        }
    });
}

const setGitRemote = (object) => {
    var getGitCmd = mustache.render('{{{gitCmd}}}',object);
    let gitRemoteTpl = fs.readFileSync('./scaffold/tpl/git-init.txt').toString();
    let renderGit = mustache.render(getGitCmd,object);
    fs.writeFileSync('./scaffold/git/init.sh', renderGit);
}

const setRgpdPages = (object) => {
    let rgpdFolder = './scaffold/tpl/rgpd';

    fs.readdir(rgpdFolder, (err, files) => {

        if ( '' != files )  {
            files.forEach(file => {
                if (path.extname(file) == '.html') {
                    let pageName = fs.readFileSync(rgpdFolder + '/' + file).toString();
                    let renderPageTpl = mustache.render(pageName,object);
                    fs.writeFileSync( rgpdFolder + '/pages/' + file, renderPageTpl);
                }
            });
        }
    });
};

exports.setGitignore = setGitignore;
exports.setReadme = setReadme;
exports.setComposer = setComposer;
exports.setWpCliYml = setWpCliYml;
exports.setShellInstall = setShellInstall;
exports.setPackage = setPackage;
exports.setMigrations = setMigrations;
exports.setHtaccess = setHtaccess;
exports.setRobotsTxt = setRobotsTxt;
exports.setGitRemote = setGitRemote;
exports.setRgpdPages = setRgpdPages;