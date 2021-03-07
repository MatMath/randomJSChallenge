module.exports = {
  "files": [
      "leetCode"
  ],
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "es2020",
    "types": ["mocha", "node"],
    "lib": [
      "es2018",
      "dom"
    ]
  }
}