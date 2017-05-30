import { ItbotPage } from './app.po';

describe('itbot App', function() {
  let page: ItbotPage;

  beforeEach(() => {
    page = new ItbotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
