import {$} from '@core/Dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type], resizable');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'column' ? 'bottom' : 'right';
  let calcSize;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-2000px',
  })

  document.onmousemove = (e) => {
    if (type === 'column') {
      const delta = e.pageX - coords.right;
      calcSize = `${coords.width + delta}px`;
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom;
      calcSize = `${coords.height + delta}px`;
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type === 'column') {
      $root.findAll(`[data-column="${$parent.data.column}"]`)
          .forEach((el) => el.style.width = calcSize)
    } else {
      $parent.css({height: calcSize});
    }

    $resizer.css({
      bottom: 0,
      opacity: 0,
      right: 0,
    })
  };
}
