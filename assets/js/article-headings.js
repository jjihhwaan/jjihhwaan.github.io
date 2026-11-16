(() => {
  document.querySelectorAll('.reading-post article > .content h2').forEach(heading => {
    if (heading.querySelector('.section-number')) return;
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.textContent.trim()) continue;
      const match = node.textContent.match(/^(\s*)(\d+[.)])\s+/);
      if (!match) return;
      const badge = document.createElement('span');
      badge.className = 'section-number';
      badge.textContent = match[2];
      const remaining = document.createTextNode(' ' + node.textContent.slice(match[0].length));
      node.replaceWith(document.createTextNode(match[1]), badge, remaining);
      return;
    }
  });
})();
