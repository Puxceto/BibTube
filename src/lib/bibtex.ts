import { escapeLatex } from './escapeLatex';

export interface BibData {
  title: string;
  channel: string;
  year: number;
  url: string;
  note?: string;
}

export interface FormatOptions {
  biblatex?: boolean;
  includeAccessDate?: boolean;
}

export function formatBibTeX(data: BibData, options: FormatOptions = {}): string {
  const key = data.title.toLowerCase().replace(/\W+/g, '-').slice(0, 20) || 'video';
  const biblatex = !!options.biblatex;
  const includeAccess = options.includeAccessDate !== false;
  let entry = `@online{${key},\n` +
    `  title = {${escapeLatex(data.title)}},\n` +
    `  year = {${data.year}},\n` +
    `  url = {${data.url}},\n` +
    `  author = {${escapeLatex(data.channel)}}`;
  if (includeAccess) {
    const field = biblatex ? 'dateaccessed' : 'urldate';
    const today = new Date().toISOString().split('T')[0];
    entry += `,\n  ${field} = {${today}}`;
  }
  if (data.note) {
    const field = biblatex ? 'addendum' : 'note';
    entry += `,\n  ${field} = {${escapeLatex(data.note)}}`;
  }
  entry += `\n}`;
  return entry;
}
