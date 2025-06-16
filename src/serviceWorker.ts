chrome.commands.onCommand.addListener(async (command: string) => {
  if (command === 'copy-bib') {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    for (const tab of tabs) {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { action: 'copy-bib' });
      }
    }
  }
});
