export function showToast(message: string): void {
  const div = document.createElement('div');
  div.textContent = message;
  div.style.position = 'fixed';
  div.style.bottom = '20px';
  div.style.right = '20px';
  div.style.background = 'rgba(0,0,0,0.8)';
  div.style.color = '#fff';
  div.style.padding = '8px';
  div.style.borderRadius = '4px';
  div.style.zIndex = '10000';
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 2000);
}
