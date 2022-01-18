import { Scenario } from '../classes/scenario.class';

fixture`Teacher Fixture for multi remote`
  .page`https://the-internet.herokuapp.com/`

test.meta('type', 'multi-user')
('Test multi user functionality', async t => {
  const scenario = new Scenario('An example of synchronizing multiple tests');

  let [user1, user2] = await Promise.all([
    scenario.createUser('Student', '../student.multi.test.ts', 'chrome'),
    scenario.createUser('Teacher', '../teacher.multi.test.ts', 'chrome --incognito')
  ]);

  await Promise.all([
    user1.runStage('Check page load'),
    user2.runStage('Check page load')
  ]);
});

