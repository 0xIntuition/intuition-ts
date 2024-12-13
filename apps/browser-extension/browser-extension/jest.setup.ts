import { jest } from '@jest/globals';

// Create a mock implementation of Chrome's Event interface
class ChromeEvent {
  private listeners: Function[] = [];

  addListener(callback: Function): void {
    this.listeners.push(callback);
  }

  removeListener(callback: Function): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  hasListener(callback: Function): boolean {
    return this.listeners.includes(callback);
  }

  hasListeners(): boolean {
    return this.listeners.length > 0;
  }

  dispatch(...args: any[]): void {
    this.listeners.forEach(listener => listener(...args));
  }
}

// Mock browser extension APIs
const mockChrome = {
  runtime: {
    sendMessage: jest.fn((
      message: any,
      responseCallback?: (response: any) => void
    ) => {
      if (responseCallback) {
        responseCallback({});
      }
      return Promise.resolve({});
    }),
    onMessage: new ChromeEvent()
  }
};

// @ts-ignore - Assign mock to global chrome
global.chrome = mockChrome;

// Mock Date.now for consistent testing
const realDateNow = Date.now.bind(global.Date);
global.Date.now = jest.fn(() => 1234567890);

// Export for use in tests
export { realDateNow };
