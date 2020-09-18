// Replace this with your favorite way of rendering HTML/CSS and
// run notification.dismiss() when you remove the element to
// notify the queue
export function renderNotification(notification) {
  const levels = {
    info: {
      icon: 'ⓘ',
      color: '#5b79de'
    },
    warning: {
      icon: '⚠',
      color: '#f0ad4e'
    },
    error: {
      icon: '⛔',
      color: '#d9534f'
    }
  };

  // Create notification element
  const icon = document.createElement('span');
  icon.textContent = levels[notification.level].icon;
  icon.style.color = '#fff';
  icon.style.lineHeight = '1.2';

  const message = document.createElement('span');
  message.textContent = notification.message;
  message.style.color = '#fff';

  const button = document.createElement('button');
  button.textContent = '×';
  button.style.color = '#fff';
  button.style.position = 'absolute';
  button.style.top = '0.2em';
  button.style.right = '0';
  button.style.border = 'none';
  button.style.background = 'none';
  button.style.cursor = 'pointer';

  const element = document.createElement('div');
  element.style.position = 'fixed';
  element.style.top = '1em';
  element.style.right = '-100%';
  element.style.boxSizing = 'border-box';
  element.style.maxWidth = 'calc(100vw - 2em)';
  element.style.transition = 'right 500ms ease-in-out';
  element.style.background = levels[notification.level].color;
  element.style.fontWeight = 'bold';
  element.style.borderRadius = '0.2em';
  element.style.boxShadow = '0 0.2em 0.3em #888';
  element.style.padding = '1em 1.5em 1em 1em';
  element.style.display = 'grid';
  element.style.gridTemplateColumns = 'auto auto';
  element.style.gridGap = '0.5em';

  element.appendChild(icon);
  element.appendChild(message);
  element.appendChild(button);

  document.body.appendChild(element);

  // Animate element to visible
  setTimeout(() => element.style.right = '1em', 0);

  function close() {
    // Animate element
    element.style.transition = 'right 250ms ease-in-out';
    element.style.right = '-100%';

    // Remove element after animation
    setTimeout(() => {
      // If element was not removed already
      if (element.parentElement) {
        element.parentElement.removeChild(element);
        notification.dismiss();
      }
    }, 600);
  }

  // Close automatically after 7 seconds
  setTimeout(close, 7000);

  // Close on button click
  button.addEventListener('click', close, {once: true});
}
