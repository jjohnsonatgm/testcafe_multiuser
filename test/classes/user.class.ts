import createTestCafe from 'testcafe';

export class User {
  private _name: any;
  private _filename: any;
  private _browser: any;
  public promiseOfInit: any;
  private _expectedStageName: any;
  private _runExpectedStage: any;
  private _confirmCurrentStep: any;

  constructor(name, filename, browser) {
    this._name = name;
    this._filename = filename;
    this._browser = browser;

    this.promiseOfInit = new Promise(resolve => {
      this._confirmCurrentStep = resolve;
    });

    this._expectedStageName = void 0;
    this._runExpectedStage = null;

    this._runTest();
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

    testcafe.close();
  }

  async runStage(stageName: string) {
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