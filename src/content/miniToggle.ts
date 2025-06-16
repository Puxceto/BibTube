declare const chrome: any;

export function createMiniToggle(): Promise<HTMLInputElement> {
  return new Promise(resolve => {
    const label = document.createElement('label');
    label.style.position = 'fixed';
    label.style.top = '110px';
    label.style.right = '20px';
    label.style.zIndex = '1000';
    label.style.color = '#fff';
    label.style.fontSize = '12px';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.style.marginRight = '4px';
    label.appendChild(input);
    label.append('Use timestamp');
    document.body.appendChild(label);

    if (chrome?.storage?.local) {
      chrome.storage.local.get('useTimestamp', (res: any) => {
        input.checked = !!res.useTimestamp;
        resolve(input);
      });
      input.addEventListener('change', () => {
        chrome.storage.local.set({ useTimestamp: input.checked });
      });
    } else {
      resolve(input);
    }
  });
}
