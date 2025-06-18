import { formatBibTeX, BibData, FormatOptions } from '../lib/bibtex';
import { formatTime } from '../lib/time';
import { createMiniToggle } from './miniToggle';
import { showToast } from './toast';
import { push as pushHistory } from '../history/historyManager';

declare const chrome: any;

function injectStyles() {
  if (document.getElementById('bibtube-style')) return;
  const style = document.createElement('style');
  style.id = 'bibtube-style';
  style.textContent = `
    .bibtube-btn {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 1000;
      padding: 6px 8px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background: #cc0000;
      color: #fff;
    }
    @media (prefers-color-scheme: dark) {
      .bibtube-btn {
        background: #ff4e45;
        color: #fff;
      }
    }
  `;
  document.head.appendChild(style);
}

function createButton() {
  injectStyles();
  const btn = document.createElement('button');
  btn.textContent = 'Copy BibTeX';
  btn.title = 'Generate BibTeX entry';
  btn.className = 'bibtube-btn';
  return btn;
}

function getBibData(): BibData {
  const titleMeta = document.querySelector('meta[name="title"]') as HTMLMetaElement | null;
  let title = titleMeta?.content || document.title.replace(/ - YouTube$/, '');
  try {
    title = decodeURIComponent(title);
  } catch {
    // ignore decoding errors
  }
  if (!title) {
    const titleEl = document.querySelector('h1 yt-formatted-string');
    title = (titleEl?.textContent || '').trim();
  }

  const channelEl = document.querySelector('ytd-channel-name a');
  const channel = (channelEl?.textContent || '').trim();

  const dateMeta = document.querySelector('meta[itemprop="datePublished"]') as HTMLMetaElement | null;
  const year = dateMeta ? new Date(dateMeta.content).getFullYear() : new Date().getFullYear();

  return { title, channel, year, url: location.href };
}

function getFormatOptions(): Promise<FormatOptions> {
  return new Promise(resolve => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['biblatexMode', 'includeAccessDate'], (res: any) => {
        resolve({
          biblatex: !!res.biblatexMode,
          includeAccessDate: res.includeAccessDate !== false
        });
      });
    } else {
      resolve({ biblatex: false, includeAccessDate: true });
    }
  });
}

async function main() {
  const toggle = await createMiniToggle();
  const btn = createButton();
  btn.addEventListener('click', () => copyBib(toggle));
  chrome.runtime?.onMessage?.addListener((msg: any) => {
    if (msg.action === 'copy-bib') copyBib(toggle);
  });
  document.body.appendChild(btn);
}

async function copyBib(toggle: HTMLInputElement) {
  const data = getBibData();
  if (toggle.checked) {
    const video = document.querySelector('video') as HTMLVideoElement | null;
    if (video) {
      const sec = Math.floor(video.currentTime);
      const url = new URL(data.url);
      url.searchParams.set('t', `${sec}s`);
      data.url = url.toString();
      data.note = `Time = ${formatTime(sec)}`;
    }
  }
  const opts = await getFormatOptions();
  const entry = formatBibTeX(data, opts);
  await pushHistory(entry);
  navigator.clipboard.writeText(entry).then(() => {
    showToast('Copied!');
  });
}

main();
