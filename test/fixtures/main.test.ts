import { Scenario } from '../classes/scenario.class';

export async function run() {
  const scenario = new Scenario('An example of synchronizing multiple tests');

  let [user1, user2] = await Promise.all([
    scenario.createUser('Student', '../student.multi.test.ts', 'chrome'),
    scenario.createUser('Teacher', '../teacher.multi.test.ts', 'chrome --incognito')
  ]);

  await Promise.all([
    user1.runStage('Check page load'),
    user2.runStage('Check page load')
  ]);
};

run().then(r => {});