## Understanding NPM - Node.js Package Manager 

Contents: 
- initialise project using ``npm init``
- what is package.json
- semantic versioning
- what special characters used mean in package versioning
- node_modules
- difference between dependencies and development dependencies
- browser app vs server package
- package-lock.json (or yarn.lock) and what this does
- npm scripts
- purpose of .bin folder (and executables)

===


#### npm init


If other people need to work on your project, you must use a package.json
Can create manually using npm or yarn, ``npm init`` or ``yarn init``


===


#### Semantic versioning


- each public package must have a unique name and version
- semantic versioning is a universal agreement for software versioning, shortly: SemVer
  - read more at https://semver.org
- i.e. 5.21.17
  - 5 is the major => if you introduce non-backward compatible features
  - 21 is the minor => new features but package still compatible with previous verions
  - 17 is the patch => bug fixes
- if your package depends on an external package, you can specify what version you need:
  - exact version: 5.21.17 (nothing can change)
  - greater than: >5.21.1 (as long as its greater than this version)
  - compatible changes: ^5.21.8 (i.e. minor and patch can change, but major is fixed)
  - minor-level changes: ~5.21.8 (i.e. only patch can change)
- pre-release versions
  - 1.0.0-alpha older than => 1.0.0-alpha.1 ... older than => 1.0.0-beta ... older than 1.0.0-beta.2 ... older than 1.0.0-beta.11 ... older than 1.0.0-rc.1 ... older than 1.0.0


===


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

===


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


====


- to uninstall ``npm uninstall <package name>``
- ``npm install <package name> --save-dev`` => its dependencies are also installed 
- delete node_modules folder and run ``npm install`` to get it back. you should always add node_modules to .gitignore as its large and not required for others when they clone your repo 
- delete node_modules and install production: ``npm install --production``
  - packages listed as dependencies are installed in node_modules, but packages listed as devDependencies are not
 

===


Add package as dependency or devDependency? 
- 


===


add this repo to the frontend repo 