import { list } from '../history/historyManager';

const btn = document.getElementById('download') as HTMLButtonElement;

btn.addEventListener('click', async () => {
  const entries = await list();
  if (!entries.length) return;
  const blob = new Blob([entries.join('\n\n')], { type: 'text/x-bibtex' });
  const url = URL.createObjectURL(blob);
  const today = new Date().toISOString().split('T')[0];
  const filename = `bibtube_${today}.bib`;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 100);
});
