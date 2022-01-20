import { getScenario } from "../../classes/scenario.class";

const scenario = getScenario('An example of synchronizing multiple tests');
const stage = scenario.initUser('Student');

fixture`Student Fixture for multi remote`
  .page`https://the-internet.herokuapp.com/`

test.meta('type', 'multi-remote')
('Test student multi user functionality', async t => {
  await stage('Check page load');

  await stage('Click Auth');
  await t.click('[href="/dropdown"]');

  await stage('End');
});

