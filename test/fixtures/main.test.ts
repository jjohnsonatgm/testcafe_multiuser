import { Scenario } from '../classes/scenario.class';

export async function run() {
  const scenario = new Scenario('An example of synchronizing multiple tests');

  let [user1, user2] = await Promise.all([
    scenario.createUser('Student', './build/test/fixtures/users/student.multi.test.js', 'chrome'),
    scenario.createUser('Teacher', './build/test/fixtures/users/teacher.multi.test.js', 'chrome --incognito')
  ]);

  await Promise.all([
    user1.runStage('Check page load'),
    user2.runStage('Check page load')
  ]);

  await user1.runStage('Click Auth');
  await user2.runStage('Click Auth');

  user1.runStage('End');
  user2.runStage('End');
}
