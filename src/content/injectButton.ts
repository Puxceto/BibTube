import { formatBibTeX, BibData } from '../lib/bibtex';
import { formatTime } from '../lib/time';
import { createMiniToggle } from './miniToggle';

function createButton() {
  const btn = document.createElement('button');
  btn.textContent = 'Copy BibTeX';
  btn.title = 'Generate BibTeX entry';
  btn.style.position = 'fixed';
  btn.style.top = '80px';
  btn.style.right = '20px';
  btn.style.zIndex = '1000';
  btn.style.padding = '6px 8px';
  btn.style.background = '#cc0000';
  btn.style.color = '#fff';
  btn.style.border = 'none';
  btn.style.borderRadius = '4px';
  btn.style.cursor = 'pointer';
  return btn;
}

function getBibData(): BibData {
  const titleMeta = document.querySelector('meta[name="title"]') as HTMLMetaElement | null;
  const title = titleMeta?.content || document.title.replace(/ - YouTube$/, '');

  const channelEl = document.querySelector('ytd-channel-name a');
  const channel = (channelEl?.textContent || '').trim();

  const dateMeta = document.querySelector('meta[itemprop="datePublished"]') as HTMLMetaElement | null;
  const year = dateMeta ? new Date(dateMeta.content).getFullYear() : new Date().getFullYear();

  return { title, channel, year, url: location.href };
}

async function main() {
  const toggle = await createMiniToggle();
  const btn = createButton();
  btn.addEventListener('click', () => {
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
    const entry = formatBibTeX(data);
    navigator.clipboard.writeText(entry).then(() => {
      alert('Copied!');
    });
  });
  document.body.appendChild(btn);
}

main();
