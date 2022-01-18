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

  async createUser(name, filename, browser) {
    const user = await new User(name, filename, browser);
    await this._users.set(name, user);

    return user;
  }

  async initUser(name) {
    const user = this._users.get(name);

    if(!user) {
      throw new Error(`The user named ${name} could not be found`);
    }

    return function stage(stageName) {
      user.confirmCurrentStep(user);

      user.expectedStageName = stageName;

      return new Promise(resolve => {
        user.runExpectedStage = resolve;
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
