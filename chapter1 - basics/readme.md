# Chapter 1: the beginning

API to test: https://restful-booker.herokuapp.com/apidoc/index.html



To create a Playwright project:
* open a terminal and cd into this folder
* run the following 

```
npm init playwright@latest
npm i --save-dev @types/node
```
Parameters:
- Typescript
- tests
- n
- n
You get a folder with /tests/, package.json, playwright.config.ts.

You still get an error as you open playwright.config.ts: Cannot find name ‘process'” Error in TypeScript

```
tsc --init
```
Edit compilerOptions:
```
    "types": ["node"],                                      /* Specify type package names to be included without being referenced in a source file. */
```

Install dot env to be able to use a .env file at root of project
```
npm install dotenv --save
```
The file structure is as below. The important files are:
- tsconfig.json: Typescript project configuration
- playwright.config.ts: Playwright configuration
- *.spec.ts: files for test scripts 
![folder structure](/assets/folder%20structure_gy2qhvu1d.png)

From here we start with some simple testing. 


Remove all code from example.spec.ts and we will add some code. 


