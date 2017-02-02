import { MockBackendPage } from './app.po';

describe('mock-backend App', function() {
  let page: MockBackendPage;

  beforeEach(() => {
    page = new MockBackendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
