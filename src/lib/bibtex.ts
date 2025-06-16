export interface BibData {
  title: string;
  channel: string;
  year: number;
  url: string;
}

const latexMap: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '%': '\\%',
  '&': '\\&',
  '$': '\\$',
  '#': '\\#',
  '_': '\\_',
  '^': '\\^{}',
  '~': '\\~{}'
};

export function escapeLaTeX(str: string): string {
  return str.replace(/[\\{}%&$#_^~]/g, ch => latexMap[ch] || ch);
}

export function formatBibTeX(data: BibData): string {
  const key = data.title.toLowerCase().replace(/\W+/g, '-').slice(0, 20) || 'video';
  return `@online{${key},\n` +
    `  title = {${escapeLaTeX(data.title)}},\n` +
    `  year = {${data.year}},\n` +
    `  url = {${data.url}},\n` +
    `  author = {${escapeLaTeX(data.channel)}}\n` +
    `}`;
}
