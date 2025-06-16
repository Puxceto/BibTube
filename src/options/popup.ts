declare const chrome: any;

const biblatex = document.getElementById('biblatex') as HTMLInputElement;
const access = document.getElementById('access') as HTMLInputElement;

chrome.storage.local.get(['biblatexMode', 'includeAccessDate'], (res: any) => {
  biblatex.checked = !!res.biblatexMode;
  access.checked = res.includeAccessDate !== false;
});

[biblatex, access].forEach(el => {
  el.addEventListener('change', () => {
    chrome.storage.local.set({
      biblatexMode: biblatex.checked,
      includeAccessDate: access.checked
    });
  });
});
