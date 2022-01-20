"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScenario = exports.Scenario = void 0;
var user_class_1 = require("./user.class");
// @ts-ignore
var scenarios = global.scenarios || new Map();
// @ts-ignore
global.scenarios = scenarios;
var Scenario = /** @class */ (function () {
    function Scenario(description) {
        scenarios.set(description, this);
        this._users = new Map();
    }
    Scenario.prototype.createUser = function (name, filename, browser) {
        var user = new user_class_1.User(name, filename, browser);
        this._users.set(name, user);
        return user.promiseOfInit;
    };
    Scenario.prototype.initUser = function (name) {
        var user = this._users.get(name);
        if (!user) {
            throw new Error("The user named ".concat(name, " could not be found"));
        }
        return function stage(stageName) {
            user._confirmCurrentStep(user);
            user._expectedStageName = stageName;
            console.log("User -- ".concat(user._expectedStageName));
            return new Promise(function (resolve) {
                user._runExpectedStage = resolve;
            });
        };
    };
    return Scenario;
}());
exports.Scenario = Scenario;
function getScenario(description) {
    var scenario = scenarios.get(description);
    if (scenario) {
        return scenario;
    }
    throw new Error("The scenario ".concat(description, " does not exist"));
}
exports.getScenario = getScenario;
