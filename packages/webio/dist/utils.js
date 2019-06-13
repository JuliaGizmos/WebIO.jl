"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObservableName = function (specifier) {
    if (typeof specifier === "string") {
        return specifier;
    }
    return specifier.name;
};
