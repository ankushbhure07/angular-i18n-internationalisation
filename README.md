# Language support for angular vai [i18n](https://angular.io/guide/i18n-overview) Or Internationalization

## Agenda
    we need to test the language support for angular using i18n

## Dipendancies
1. Angular 16
2. Angular Localization

## Referances
- [Blog](https://www.digitalocean.com/community/tutorials/angular-internationalization)

## Package to install
    To use Angular’s built-in internationalization (i18n) functionality, you need to add the @angular/localize package to your project. You can do this by running the following command in the root directory of your Angular project

```javascript

ng add @angular/localize

```
    This command will update your package.json and polyfills.ts files and load the $localize function onto the global scope1. The $localize function is used to tag i18n messages in your code that need to be translated1


## Genrete referance file for language of XLIFF
    
```json
//package.json
"scripts": {
  "i18n:extract": "ng extract-i18n --output-path src/locale"
}
```

## Modify file to show location of file to translation service

```json

//angular.json
{
  "projects": {
    "angular-internationalization-example": {
      // ...
      "i18n": {
        "sourceLocale": "en-US",
        "locales": {
          "fr": {
            "translation": "src/locale/messages.fr.xlf",
            "baseHref": ""
          },
          "de": {
            "translation": "src/locale/messages.de.xlf",
            "baseHref": "" 
          }
        }
      },
      "architect": {
        // ...
      }
    }},
  // ...
}
```

## Modify file for configuration to build
```json

//angular.json

//angular-internationalization-example is project name it varry according to the project name
{
  "projects": {
    "angular-internationalization-example": {
      // ...
      "architect": {
        "build": {
          // ...
          "configurations": {
            "production": {
              // ...
            },
            "fr": {
              "localize": ["fr"],
              "outputPath": "dist/under-construction-fr/",
              "i18nMissingTranslation": "error"
            },
            "de": {
              "localize": ["de"],
              "outputPath": "dist/under-construction-de/",
              "i18nMissingTranslation": "error"
            }
          }
        },
        // ...
      }
    }},
  // ...
}
```

## Modify Configuration file for Serve

```json
//angular.json
{
  "projects": {
    "angular-internationalization-example": {
      // ...
      "architect": {
        "serve": {
          // ...
          "configurations": {
            "production": {
              "browserTarget": "angular-internationalization-example:build:production"
            },
            "fr": {
              "browserTarget": "angular-internationalization-example:build:fr"
            },
            "de": {
              "browserTarget": "angular-internationalization-example:build:de"
            }
          }
        },
        // ...
      }
    }},
  // ...
}

```

## for command to run on Terminal for build and serve

```json

//package.json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "start:fr": "ng serve --configuration=fr",
    "start:de": "ng serve --configuration=de",
    "build": "ng build",
    "build:fr": "ng build --configuration=fr",
    "build:de": "ng build --configuration=de",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e",
    "i18n:extract": "ng xi18n --output-path src/locale"
  }
}
```


## Convert default file into other languages
### Refrances to third party apps
1. [Smart Cat](https://ea.smartcat.com/)
    Store all the data to the src/locale-raw

## Build multiple languages at a time 
### using single command

```json
 //package.json
"scripts": {
        "build:multi-lang":"ng build --prod --i18n-locale hi   --i18n-format xlf --i18n-file src/locale/messages.hi.xlf --output-path=dist/hi --baseHref /hi/ && ng build --prod --i18n-locale gu --i18n-format xlf --i18n-file src/locale/messages.gu.xlf --output-path=dist/gu --baseHref /gu/"
}

//as per our above setup for angular.json file the script code will be

"scripts": {
        "build:multi-lang":"ng build --configuration=hi && ng build --configuration=en"
}

```
### All templete files 
  <div i18n>

### NPM command
```javascript
    npm run i18n:extract

    cd src

    cd locale-convertor-using-node

    node xml_file_reader.js

    npm i xml2js

    npm i translatte

    npm run build:multi-lang
```