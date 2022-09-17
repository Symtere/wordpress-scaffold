const inquirer = require('inquirer');
const slugify = require('slugify');
const Crypto = require('crypto');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');
const shell = require('shelljs');
const path = require('path');

const template = require('./js/template');


clear();
console.log(
    chalk.red(
    figlet.textSync('Symtere', { horizontalLayout: 'fitted'}) //font: 'Ghost'
));

var questions = [
    {
        type: 'rawlist',
        name: 'choice',
        message: "What do you want to do :",
        choices: [
            {
                name: 'New project',
                value: 'new'
            },
            // {
            //     name: 'Install an existing project',
            //     value: 'install'
            // },
            {
                name: 'Add migrations',
                value: 'migrations'
            },
            {
                name: 'Add RGPD pages',
                value: 'rgpd-pages'
            }
        ]
    },
    {
        type: 'input',
        name: 'vhost',
        message: "Project's vhost :",
        default: ".local",
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'projectTitle',
        message: "Project's name :",
        validate: function(value) {
            if ( value.length ) {
                return true;
            }
            else {
                return "Please enter a project's name"
            }
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'projectSlug',
        message: "Project's slug :",
        default: function(answers) {
            return slugify(path.basename(process.cwd())).toLowerCase();
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'projectGithubUrl',
        message: "Enter project github ssh url (git@github.com:Symtere/...) :",
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'dbName',
        message: "Database name :",
        default: function(answers) {
            return answers.projectSlug;
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'dbPrefix',
        message: "Database prefix :",
        default: function() {
            return randomLowerString(4) + '_';
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'rawlist',
        name: 'adminUserEmail',
        message: "Admin email :",
        choices: [
            { name: 'Grégory', value: 'supiot.gregory@gmail.fr' },
            { name: 'Autre', value: 'other-admin-email' }
        ],
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'adminUserEmailCustom',
        message: "Email :",
        when: (answers) => (answers.choice === 'new' && answers.adminUserEmail === 'other-admin-email'),
    },
    {
        type: 'input',
        name: 'adminUserName',
        message: "Admin username :",
        default: 'custom-admin',
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'adminUserPassword',
        message: "Admin password : ",
        default: function() {
            return randomByteToString(16);
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'list',
        name: 'themeChoice',
        message: "Install a theme :",
        choices: [
            {
                name: 'Wordpress blank theme',
                value: "git@github.com:Symtere/wordpress-blank-theme.git"
            },
            {
                name: 'Other'
            },
            {
                name: 'None',
                value: ''
            },
        ],
        filter(val) {
            return val.toLowerCase();
        },
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'input',
        name: 'themeName',
        message: "Theme name :",
        default: "custom",
        filter: function(val) {
            return slugify(val);
        },
        when: (answers) => answers.choice === 'new' && answers.themeChoice != '',
    },
    {
        type: 'input',
        name: 'themeGithubUrl',
        message: "Enter github theme ssh url (git@github.com:Symtere/...)",
        when: (answers) => answers.themeChoice === 'other' && answers.choice === 'new',
    },
    {
        type: 'checkbox',
        name: 'packages',
        message: "Install this plugins :",
        choices: [
            { name: 'Query monitor', value: '"wpackagist-plugin/query-monitor": ">=3.9.0"', checked: false},
            { name: 'Yoast SEO', value: '"wpackagist-plugin/wordpress-seo": ">=19.3"', checked: true },
            { name: 'Send in blue', value: '"wpackagist-plugin/mailin": ">=3.1.45"', checked: true },
            { name: 'Svg support', value: '"wpackagist-plugin/svg-support": ">=2.4.2"', checked: true },
            { name: 'Admin taxonomy filter', value: '"wpackagist-plugin/admin-taxonomy-filter": ">=1.0.2"', checked: true },
            { name: 'Gutenberg', value: '"wpackagist-plugin/gutenberg": ">=13.7.2"', checked: true },
            { name: 'Simple Custom Post Order', value: '"wpackagist-plugin/simple-custom-post-order": ">=2.5.6"', checked: false },
            { name: 'Post types order', value: '"wpackagist-plugin/post-types-order": ">=1.9.9"', checked: false },
            { name: 'AIO wp migration', value: '"wpackagist-plugin/all-in-one-wp-migration": ">=7.62"', checked: true },
            { name: 'FakerPress', value: '"wpackagist-plugin/fakerpress": ">=0.5.3"', checked: false },
            { name: 'Weglot', value: '"wpackagist-plugin/weglot": ">=3.6.1"', checked: false },
            { name: 'ACF Pro', value: '"advanced-custom-fields/advanced-custom-fields-pro": ">=5.12.3"', checked: true },
            { name: 'WooCommerce', value: '"wpackagist-plugin/woocommerce": ">=6.7.0"', checked: false },
            { name: 'YITH WooCommerce Wishlist', value: '"wpackagist-plugin/yith-woocommerce-wishlist": ">=3.11.0"', checked: false }
        ],
        loop: false,
        pageSize: 12,
        when: (answers) => answers.choice === 'new',
    },
    {
        type: 'confirm',
        name: 'multisite',
        message: "Multisite :",
        default: false,
        when: (answers) => answers.choice === 'migrations',
    },
    {
        type: 'input',
        name: 'stagingUrl',
        message: "Staging url :",
        filter: function(val) {
            return '' !== val ? new URL(val).host : '';
        },
        when: (answers) => answers.choice === 'migrations',
    },
    {
        type: 'input',
        name: 'prodUrl',
        message: "Production url :",
         filter: function(val) {
            return '' !== val ? new URL(val).host : '';
        },
        when: (answers) => answers.choice === 'migrations',
    }
]

inquirer.prompt(questions).then(answers => {

    template.setComposer(answers);

    if ( answers.choice === 'new' ) {

        answers.isNew = true;

        if ( undefined !== answers.adminUserEmailCustom ) {
            answers.adminUserEmail = answers.adminUserEmailCustom;
        }

        answers.readmeProjectGithubUrl = answers.projectGithubUrl != '' ? answers.projectGithubUrl : 'git@github.com:Symtere/...-' + answers.projectSlug;
        answers.themePath = './wp-content/themes/' + answers.themeName;
        answers.themeChoice = answers.themeGithubUrl && answers.themeGithubUrl != '' ? answers.themeGithubUrl : answers.themeChoice;

        console.log(chalk.bold.cyanBright('\n' + 'Génération des fichiers' + '\n'));

        template.setGitignore(answers);
        template.setWpCliYml();
        template.setReadme(answers);
        template.setShellInstall(answers);
        template.setPackage(answers);
        template.setRobotsTxt();
        shell.exec('sh ./config/install.sh');

        if ( answers.projectGithubUrl != '' ) {
            const gitTheme = answers.themeName && answers.themeName != '' ? `rm -rf ./wp-content/themes/${answers.themeName}/.git;` : '';
            answers.gitCmd = `${gitTheme} rm -rf ./.git; git init; git remote add origin ${answers.projectGithubUrl}`;
            template.setGitRemote(answers);
        }
        else {
            answers.gitCmd = 'rm -rf ./.git; git init';
            template.setGitRemote(answers);
        }

        template.setHtaccess(); // overwrite generated .htaccess
    }
    if ( answers.choice === 'install' ) {
        answers.isInstall = true;
        shell.exec('sh ./config/install.sh');
    }
    if ( answers.choice === 'migrations' ) {
        answers.ismigration = true;
        let currentSlug = shell.exec('wp option get siteurl');
        answers.projectSlug = currentSlug != null ? new URL(currentSlug.stdout).host : '';

        console.log(chalk.bold.cyanBright('\n' + 'Génération des fichiers' + '\n'));

        template.setMigrations(answers);
    }
    if ( answers.choice === 'rgpd-pages' ) {
        answers.rgpdPages = true;
        let siteUrl = shell.exec('wp option get siteurl', {silent:true});
        let blogName = shell.exec('wp option get blogname', {silent:true});
        answers.siteUrl = siteUrl != null ? siteUrl.trim() : 'URL DU SITE';
        answers.projectTitle = blogName != null ? blogName.trim() : 'NOM DU CLIENT';

        console.log(chalk.bold.cyanBright('\n' + 'Génération des pages RGPD' + '\n'));
        template.setRgpdPages(answers);

        setTimeout(function() {
            shell.cd('scaffold/tpl/rgpd/pages');
            shell.exec('sh create-rgpd-pages.sh');
            shell.cd('../../../../');
        }, 500);
    }

    // const sh = exec('sh ./config/init.sh');
    // sh.stdout.on('data', (data) => {
    //     console.log(data.toString());
    // });
    // sh.stderr.on('data', (data) => {
    //     console.error(`${data}`);
    // });

    //template.setScripts(answers);

    //console.log(answers);
});


function randomByteToString(size = 4,string = 'base64') {
    return Crypto
    .randomBytes(size)
    .toString(string)
    .slice(0, size)
}
function randomLowerString(length) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}


// "config": {
  //   "theme": "./config.json"
  // },https://stackoverflow.com/questions/60895809/dynamic-settings-in-config-json-from-environment