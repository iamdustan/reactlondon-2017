import memoize from 'lodash.memoize';
import Prism from 'prismjs';

function highlightCode(code, lang) {
  if (Prism) {
    return Prism.highlight(code, Prism.languages[lang])
  } else {
    return code;
  }
}

function getHighlightedCodeLines(code, lang) {
  return highlightCode(code, lang).split('\n');
}

export default memoize(getHighlightedCodeLines);
