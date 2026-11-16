(() => {
  const dialog = document.getElementById('fields-dialog');
  const trigger = document.querySelector('[data-study-fields]');
  if (!dialog || !trigger || typeof dialog.showModal !== 'function') return;

  let opener;
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.setAttribute('aria-controls', 'fields-dialog');
  trigger.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = document.activeElement;
    dialog.showModal();
    document.body.classList.add('game-modal-open');
    dialog.querySelector('[data-close]').focus();
  });
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.classList.remove('game-modal-open');
    if (opener?.isConnected) opener.focus();
  });
  let backdropDown = false;
  const outside = event => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right ||
      event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', event => {
    backdropDown = event.target === dialog && outside(event);
  });
  dialog.addEventListener('click', event => {
    if (backdropDown && event.target === dialog && outside(event)) dialog.close();
    backdropDown = false;
  });
})();
