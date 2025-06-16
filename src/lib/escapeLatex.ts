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
  return str.replace(/[\\{}#%&\$_^~]/g, ch => ESCAPE_MAP[ch] || ch);
}
