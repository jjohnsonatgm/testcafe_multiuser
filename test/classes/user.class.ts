import createTestCafe from 'testcafe';

export class User {
  private _name: any;
  private _filename: any;
  private _browser: any;
  public _promiseOfInit: any;
  private _expectedStageName: any;
  private _runExpectedStage: any;
  private _confirmCurrentStep: any;

  constructor(name, filename, browser) {
    this._name = name;
    this._filename = filename;
    this._browser = browser;

    this._promiseOfInit = new Promise(resolve => {
      this._confirmCurrentStep = resolve;
    });

    this._expectedStageName = null;
    this._runExpectedStage = void 0;

    this._runTest().then(r => {});
  }

  get name() {
    return this._name;
  }

  async _runTest() {
    const testcafe = await createTestCafe('localhost', 0, 0);
    const runner = testcafe.createRunner();

    await runner
      .src(this._filename)
      .browsers(this._browser)
      .run();

    await testcafe.close();
  }

  async runStage(stageName) {
    console.log(stageName);
    console.log(this._expectedStageName);
    if(stageName !== this._expectedStageName) {
      throw new Error(`Another stage was expected:
        expected: ${this._expectedStageName}
        tried: ${stageName}
    `)};

    this._runExpectedStage();

    return new Promise(resolve => {
      this._confirmCurrentStep = resolve;
    })
  }
}