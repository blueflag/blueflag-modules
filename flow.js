module.exports = {
    "plugins": [
        "flowtype",
        "flow-vars"
    ],
    "rules": {
        "flow-vars/define-flow-type": 1,
        "flow-vars/use-flow-type": 1,
        "flowtype/require-parameter-type": [2, {"excludeArrowFunctions": true }],
        "flowtype/require-return-type": [2, "always", {"excludeArrowFunctions": true}],
        "flowtype/space-after-type-colon": [1, "always"],
        "flowtype/space-before-type-colon": [1, "never"]
    }
}
