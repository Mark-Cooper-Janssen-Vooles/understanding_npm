## Understanding NPM - Node.js Package Manager 


Contents: 
- Intro 
- Installation of the NPM Packages
- Dependencies vs DevDependencies
- NPM packages versions and package-lock.json file 
- Updating NPM packages
- NPM Scripts
- Executable scripts in the NPM


===

## Intro


#### npm init


- If other people need to work on your project, you must use a package.json
- Can create manually using npm or yarn, ``npm init`` or ``yarn init``. You must go through all the options.
- ``npm init -y`` says yes to everything and gives you defaults


#### Semantic versioning


- each public package must have a unique name and version
- semantic versioning is a universal agreement for software versioning, shortly: SemVer
  - read more at https://semver.org
- i.e. `5.21.17`
  - 5 is the major => if you introduce non-backward compatible features
  - 21 is the minor => new features but package still compatible with previous verions
  - 17 is the patch => bug fixes
- if your package depends on an external package, you can specify what version you need:
  - exact version: `5.21.17` (nothing can change)
  - greater than: `>5.21.1` (as long as its greater than this version)
  - compatible changes: `^5.21.8` (i.e. minor and patch can change, but major is fixed)
  - minor-level changes: `~5.21.8` (i.e. only patch can change)
- pre-release versions
  - `1.0.0-alpha` older than => `1.0.0-alpha.1` ... older than => `1.0.0-beta` ... older than `1.0.0-beta.2` ... older than `1.0.0-beta.11` ... older than `1.0.0-rc.1` ... older than `1.0.0`


===


## Installation of the NPM Packages 


#### Packages Installation

- if your program depends on others, you need to install using NPM or Yarn
- ``npm install`` or ``npm i`` will install all the packages listed in the package.json file, if it is empty or absent no packages will be installed
- the packages will be installed in the ``node_modules`` folder. if the folder is absent, it will be created automatically. it is within the root.
- to install certain packages, 
  - ``npm install <package name>`` => listed as dependency in package.json
  - ``npm install <package name> --save-dev`` => listed as development dependency in package.json (i.e. not required for live)
- in the node modules file, you'll see the packages you've installed. note, they have their own package.json files
- in the example we installed moment, and can see the moment file in node_modules. that was the only one installed, so we can see moment doesn't have any of its own dependencies. it only has devDependencies
- if a package has dependencies (i.e. not devDependencies), then these will be installed along with the first package. But they won't be added to our package.json, but installed in the node_modules folder. If you have a look in package-lock.json, you will see all dependencies 
  - i.e. ``npm i browserlist` has a dependency on chalk, and if you look in package-lock.json you'll see chalk.


### Dependencies vs Development Dependencies 


Dependencies:
- Installed using ``npm install`` or ``npm install <package>``
- Installation of depencencies is "transitive":
  - If package A is instaled using ``npm install <packageA>`` and it has dependency on package B than package B will also be installed along with its dependencies
  - you will see in package.json only package A. In package-lock.json and node_modules you will see package A and package B


Development Dependencies
- Installed using ``npm install <package> --save-dev``
- Not installed using ``npm install --production``
- Not transitive:
  - If package A is installed using ``npm install <package A>`` and it has devDependency on package B than package B will NOT be installed 


- to uninstall ``npm uninstall <package name>``
- ``npm install <package name> --save-dev`` => its dependencies are also installed 
- delete node_modules folder and run ``npm install`` to get it back. you should always add node_modules to .gitignore as its large and not required for others when they clone your repo 
- delete node_modules and install production: ``npm install --production``
  - packages listed as dependencies are installed in node_modules, but packages listed as devDependencies are not
 


### Add package as dependency or devDependency? 


- Are you building browser app or server package? 
  - i.e. a browser app must have an html file
  - server package has no html files - i.e. semver, browserslist are server packages. 
- Depedencies and DevDependencies have ZERO relation to the browser app
  - the browser doesn't know anything about the node_modules folder 
  - it just downloads index.html and the scripts listed there
  - it needs just files required for the execution 
- Browser does not understand dependencies or devDependencies - it uses just javascript files that you served to the browser
- You can add all the dependencies you use in your application as devDependencies, or you can add all as dependencies. 
  - It doesn't matter! 
  - if you create a browser app, it simply doesn't matter how you add your dependencies.
  - Suggests you add all dependencies as devDependencies, then build and serve build / bundle to the browser.
  - Can also just add everything as dependencies - but pick one. 
- Don't install some as development and some as devdependencies for browser app
- Add dependencies only if:
  1. your package is public, i.e. on npm
  2. compiled version of your package uses features from dependent packages
  3. other packages depend on your package
  - Most packages in the world are used on the the server only during development of other packages


===


## NPM packages versions and package-lock.json file 


- ``npm view <package name>`` lets you view information about a package
- to see a list of versions ``npm view <package name> versions``


#### Install specific package version


- if you go ``npm install <package name>`` then most current stable release will be installed 
- if you want to install an older or a pre-release version, you need to ``npm install <package name>@<version>``
  - this will change the version of a currently installed package
  - if you get a message about a severity vulnerability, you can run ``npm audit`` for more details, usually to update the version 


#### Why package-lock.json file is needed?


- tldr; it keeps package versions 'locked', i.e. `^1.2.3` is locked when you run npm install as the version it was at already. if you delete package-lock and node-modules, run npm install, and there has been a non-breaking change (`1.x.x`) then it will go to the latest.
- this file keeps versions tree of the project dependencies (including child dependencies, which aren't in the package.json)
  - its a tree of all installed dependencies and child dependencies (and child of the child dependencies)
- if we have a dependency on dependencyA using `^1.2.3`, any compatible version can be installed, i.e. `1.x.x`.
  - you run npm install locally, and it installs as 1.2.3
  - you upload to github, someone pulls a few weeks later and does an npm install. they have no node_modules folder or package-lock.json, so their version of dependencyA is updated to `1.3.3`
  - now on your computer its `1.2.3`, on theirs is `1.3.3` => there might be new features added. to get `1.3.3` you need to delete node_modules and package-lock.json and npm install again
  - this could also happen for children dependencies 
- in yarn this is called yarn.lock


#### How Lock File is handled 

- Creation:
  - generated automatically from npm v5.0.0
  - updated automatically when you install or update a new package
- How its handled 
  - package-lock.json should be committed to source control (i.e. git)
  - node_modules should NOT be commited 
  - lock file is not published to NPM software registry (if you make public project)

Exercise:
- in package-lock.json file after installing mocha like `npm install mocha -D`:
  - lists the version, the link it was resolved with
  - `"dev": true` means it is a dev dependency
  - if you open up node_modules and find mocha file and its package.json, you can see its dependencies and devDependencies
    - devDependencies were not installed for this, but all dependencies were
  - because we added mocha as a dev dependency, all its dependencies were also added as dev dependencies
- now `npm install semver`:
  - in package-lock.json you will not see `"dev": true` flag for semver 
- committing or not committing package-lock.json file will affect what versions are installed. I.e. `somePackage: ^1.2.3` could be updated to `1.3.4` but if package lock already ias `1.2.3`, it will not be updated. 


Summary:
- Guarantees consistency of the dependencies versions
- Generated and updated automatically
- Committed to source control


===


## Updating NPM Packages

If you want to update packages or a certain package, you should use `npm update`
- Updates all listed packages to the latest release version within SemVer 
- e.g. `^1.2.5` => `^1.3.0`. Note: if version `2.0.0` was released, this will not be updated because our semVer specifies we accept only minor changes
- update specific package to latest release within semver: `npm update <package>`


===


## NPM Scripts

Allow you to perform operations and execute commands. I.e. npm run, npm build, npm test
- All defined in package.json in the scripts section 
- Different commands defined inside of each script 
- when you `npm init -y` there will already be one script in the package.json called 'test'
  ````  
  "scripts": {
    "test": "echo \"Error: no test specified!!!!\" && exit 1"
  },
  ````
  - you can execute it using `npm test`. two commands will run, the echo and 'exit 1'.


Other default npm scripts:
- `npm start`, by default executes server.js. you need to create the server.js file for it to work.
  - actual command thats executed: `node server.js`
  - if you rename your file to hmm.js, you'll need to make the `npm start` command manually in package.json to look like `npm start: "node ./hmm.js"` and it will override the default one.
- other defaults include `npm stop`, `npm restart`, `npm test`, `npm prestart`, `npm poststart`
- in the challenge we create a `prestart` script. when we run start, it runs whats in the `prestart` script before the `npm start`  


#### Custom NPM Scripts 

- to execute custom scripts: `npm run <script>`, which is alias of `npm run-script <script>`
- What if you want to run two npm scripts in parallel, i.e. use one script to run two other scripts?
  - Possible with another npm package, "npm-run-all"
  - add new script i.e. `"someName": "npm-run-all --parallel custom1 custom2"`
  - npm looks in node_modules and in the .bin folder it finds `npm-run-all` and thats how its executed 


===


## Executable scripts in the NPM (NPM .bin folder)

- if you use external commands in the npm script, it looks in node_moldes/.bin folder for the executable 
- Executables in the .bin folder:
  - during npm package installation bin scripts are copied to the .bin folder, i.e. the `npm-run-all` package.json file inside the node_modules has the following: 
  ````
    "bin": {
      "run-p": "bin/run-p/index.js",
      "run-s": "bin/run-s/index.js",
      "npm-run-all": "bin/npm-run-all/index.js"
    }
  ````
  - these are copied to the root level node_modules .bin file
- For mac / linux:
  - if you open a file in .bin, you'll notice it has `#!/bin/sh` on the top, this is called "shebang line"
    - shebang determines which interpreter should be used for file execution for the unix-like operating systems
    - it tells the computer how to execute / launch the files
- For windows:
  - file must have an extension
  - the .bin files will now have .cmd or .ps1 
