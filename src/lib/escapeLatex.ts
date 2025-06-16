const ESCAPE_MAP: Record<string, string> = {
  '\\': '\\textbackslash{}',
  '{': '\\{',
  '}': '\\}',
  '#': '\\#',
  '%': '\\%',
  '&': '\\&',
  '$': '\\$',
  '_': '\\_',
  '^': '\\^{}',
  '~': '\\~{}'
};

export function escapeLatex(str: string): string {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[\\{}#%&\$_^~]/g, ch => ESCAPE_MAP[ch] || ch);
}
