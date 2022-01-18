import { getScenario } from "../../classes/scenario.class";

const scenario = getScenario('An example of synchronizing multiple tests');
const stage = scenario.initUser('Teacher');

fixture`Teacher Fixture for multi remote`
  .page`https://the-internet.herokuapp.com/`

test.meta('type', 'multi-remote')
('Test multi user functionality', async t => {
  console.log('Teacher');
  await stage('Check page load');

  console.log('Insert use role here.');

  await stage('End');
});