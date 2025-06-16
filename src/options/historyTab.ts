import { list } from '../history/historyManager';

declare const chrome: any;

const optBtn = document.getElementById('optBtn') as HTMLButtonElement;
const histBtn = document.getElementById('histBtn') as HTMLButtonElement;
const optionsTab = document.getElementById('optionsTab') as HTMLElement;
const historyTab = document.getElementById('historyTab') as HTMLElement;
const historyList = document.getElementById('historyList') as HTMLUListElement;

function show(tab: 'options' | 'history') {
  if (tab === 'options') {
    optionsTab.style.display = 'block';
    historyTab.style.display = 'none';
  } else {
    optionsTab.style.display = 'none';
    historyTab.style.display = 'block';
    renderHistory();
  }
}

optBtn.addEventListener('click', () => show('options'));
histBtn.addEventListener('click', () => show('history'));

document.addEventListener('DOMContentLoaded', () => show('options'));

async function renderHistory() {
  const items = await list();
  historyList.innerHTML = '';
  items.forEach(entry => {
    const li = document.createElement('li');
    const pre = document.createElement('pre');
    pre.textContent = entry;
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => navigator.clipboard.writeText(entry));
    li.append(pre, btn);
    historyList.appendChild(li);
  });
}
