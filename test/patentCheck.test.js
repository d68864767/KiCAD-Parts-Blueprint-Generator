const patentCheck = require('../src/patentCheck');

// Mocking axios to prevent actual HTTP requests during tests
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { isPatentSafe: true } }))
}));

describe('patentCheck', () => {
  it('should resolve to true if the part is potentially patent-safe', async () => {
    const answers = {
      componentName: 'TestComponent',
      componentDescription: 'A description of a test component'
    };

    await expect(patentCheck(answers)).resolves.toBe(true);
  });

  it('should resolve to false if the part is potentially not patent-safe', async () => {
    require('axios').post.mockImplementationOnce(() =>
      Promise.resolve({ data: { isPatentSafe: false } })
    );

    const answers = {
      componentName: 'TestComponent',
      componentDescription: 'A description of a test component'
    };

    await expect(patentCheck(answers)).resolves.toBe(false);
  });

  it('should resolve to false if there is an error during the patent check', async () => {
    require('axios').post.mockImplementationOnce(() =>
      Promise.reject(new Error('Network error'))
    );

    const answers = {
      componentName: 'TestComponent',
      componentDescription: 'A description of a test component'
    };

    await expect(patentCheck(answers)).resolves.toBe(false);
  });
});
