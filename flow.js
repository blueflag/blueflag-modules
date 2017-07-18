module.exports = {
    "plugins": [
        "flowtype"
    ],
    "rules": {
        "flowtype/delimiter-dangle": [2, "never"], // Don't allow trailing commas
        "flowtype/define-flow-type": 1, // Marks Flow type identifiers as defined
        "flowtype/use-flow-type": 1, //Marks Flow type alias declarations as used.
        "flowtype/generic-spacing": [2, "never"], // Don't allow spaces in generic type annotations, eg. `Promise< any >`
        "flowtype/no-dupe-keys": 2, // Don't allow duplicates in object annotations
        "flowtype/no-primitive-constructor-types": 2, // Don't allow use of String, Boolean, etc
        "flowtype/object-type-delimiter": [2, "comma"], // Enforce commas for object annotation delimiters
        "flowtype/require-parameter-type": [2, {"excludeArrowFunctions": "expressionsOnly" }], // Require param type for everything except expression only arrow functions
        "flowtype/require-return-type": [2, "always", {"excludeArrowFunctions": "expressionsOnly"}],
        "flowtype/require-valid-file-annotation": [2, "always"], // enforce having @flow at top of file
        "flowtype/semi": [2, "always"], // require semicolon after type aliases
        "flowtype/space-after-type-colon": [2, "always"], // Require space after type annotation colon
        "flowtype/space-before-generic-bracket": [2, "never"], // Don't allow spaces between type and generic bracket
        "flowtype/space-before-type-colon": [2, "never"]
    }
}
