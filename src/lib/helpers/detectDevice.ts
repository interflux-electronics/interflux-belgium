import { UAParser } from 'ua-parser-js';

export function detectDevice(userAgent: string | null | undefined) {
  const parser = new UAParser(userAgent || '');
  const result = parser.getResult();

  return {
    type: result.device.type || 'desktop'
  };
}
