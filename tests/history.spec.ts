import { push, list, clear } from '../src/history/historyManager';

declare const chrome: any;

class MemStore {
  data: Record<string, any> = {};
  get(keys: string[], cb: (res: any) => void) {
    const res: any = {};
    keys.forEach(k => { res[k] = this.data[k]; });
    cb(res);
  }
  set(obj: any, cb?: () => void) {
    Object.assign(this.data, obj);
    cb && cb();
  }
}

beforeEach(() => {
  (global as any).chrome = { storage: { local: new MemStore() } };
});

test('keeps most recent 10 entries', async () => {
  for (let i = 1; i <= 12; i++) {
    await push('E' + i);
  }
  const items = await list();
  expect(items.length).toBe(10);
  expect(items[0]).toBe('E12');
  expect(items[9]).toBe('E3');
});

test('moving existing entry to front', async () => {
  await clear();
  await push('A');
  await push('B');
  await push('A');
  const items = await list();
  expect(items[0]).toBe('A');
  expect(items[1]).toBe('B');
});
