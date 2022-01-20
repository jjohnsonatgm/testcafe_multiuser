import { User } from './user.class';

// @ts-ignore
const scenarios = global.scenarios || new Map();
// @ts-ignore
global.scenarios = scenarios;

export class Scenario {
  private _users: any;

  constructor(description) {
    scenarios.set(description, this);
    this._users = new Map();
  }

  createUser(name: string, filename: string, browser: string) {
    const user = new User(name, filename, browser);
    this._users.set(name, user);

    return user.promiseOfInit;
  }

  initUser(name) {
    const user = this._users.get(name);

    if(!user) {
      throw new Error(`The user named ${name} could not be found`);
    }

    return function stage(stageName: string) {
      user._confirmCurrentStep(user);

      user._expectedStageName = stageName;
      console.log(`User -- ${user._expectedStageName}`);
      return new Promise(resolve => {
        user._runExpectedStage = resolve;
      })
    }
  }
}

export function getScenario(description: string) {
  const scenario = scenarios.get(description);

  if(scenario) {
    return scenario;
  }

  throw new Error(`The scenario ${description} does not exist`);
}
