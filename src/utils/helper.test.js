import {
  generateKey,
  handleErrors,
  stripWhiteSpace,
  validateEmail,
  validatePassword
} from './helper';

describe('utils : helper functions', () => {

  describe('generateKey', () => {
    it('generates an appropriate, unique key', () => {
      expect(generateKey(0).length).toBeGreaterThan(5);
    });
  });

  describe('generateKey', () => {
    
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

  describe('generateKey', () => {
    it('generates an appropriate, unique key', () => {
      expect(generateKey(0).length).toBeGreaterThan(5);
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