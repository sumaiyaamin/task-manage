import { AppService } from './app.service';

describe('AppService', () => {
  it('getHello returns greeting', () => {
    const svc = new AppService();
    expect(svc.getHello()).toBe('Hello World!');
  });
});

