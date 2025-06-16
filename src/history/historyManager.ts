const KEY = 'history';

declare const chrome: any;

function getStore(): Promise<string[]> {
  return new Promise(resolve => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get([KEY], (res: any) => {
        resolve(Array.isArray(res[KEY]) ? res[KEY] as string[] : []);
      });
    } else {
      resolve([]);
    }
  });
}

function setStore(items: string[]): Promise<void> {
  return new Promise(resolve => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ [KEY]: items }, resolve);
    } else {
      resolve();
    }
  });
}

export async function push(entry: string): Promise<void> {
  const items = await getStore();
  const idx = items.indexOf(entry);
  if (idx !== -1) items.splice(idx, 1);
  items.unshift(entry);
  if (items.length > 10) items.length = 10;
  await setStore(items);
}

export async function list(): Promise<string[]> {
  return getStore();
}

export async function clear(): Promise<void> {
  await setStore([]);
}
