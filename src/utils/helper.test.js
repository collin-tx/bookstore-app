import {
  formatDate,
  generateKey,
  handleErrors,
  stripWhiteSpace,
  validateEmail,
  validatePassword
} from './helper';

describe('utils : helper functions', () => {

  describe('formatDate', () => {
    it('returns a human readable date string', () => {
      expect(formatDate(new Date('2020-01-17 12:30'))).toBe('January 17 2020');
      expect(formatDate(new Date('1969-08-01 12:30'))).toBe('August 1 1969');
    });
  });
  
  describe('generateKey', () => {
    it('generates an appropriate, unique key', () => {
      expect(generateKey(0).length).toBeGreaterThan(5);
    });
  });

  describe('handleErrors', () => {
    
    it('should not throw error', () => {
      const response = { ok: true };
      expect(handleErrors(response)).toBe(response);
    });

    it('should throw error', () => {
      const response = { ok: false, statusText: 'testing' };
      // expect(handleErrors(response)).toThrow(Error);
      expect(() => {
        handleErrors(response);
      }).toThrow();
    });
  });

  describe('stripWhiteSpace', () => {
    it('replaces spaces with dashes', () => {
      expect(stripWhiteSpace('h e l l o')).toBe('h-e-l-l-o');
    });
  });

  describe('validateEmail', () => {

    it('returns false', () => {
      expect(validateEmail('h e l l o')).toBe(false);
    });

    it('returns true', () => {
      expect(validateEmail('hello@hello.com')).toBe(true);
    });
  });

  describe('validatePassword', () => {

    it('returns false', () => {
      expect(validatePassword('h e l l o', 'hi')).toBe(false);
      expect(validatePassword('', '')).toBe(false);
    });

    it('returns true', () => {
      expect(validatePassword('password1', 'password1')).toBe(true);
    });
  });

});