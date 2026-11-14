/* Grey~Spell — íconos propios (SVG 24×24). Sin emojis en la interfaz. */
(function () {
  const L = d => '<path d="' + d + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  const F = (d, c) => '<path d="' + d + '" fill="' + (c || 'currentColor') + '"/>';
  const C = (cx, cy, r, fill) => '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" ' + (fill ? 'fill="' + fill + '"' : 'fill="none" stroke="currentColor" stroke-width="2"') + '/>';
  const FLAME = 'M12 2c1 3.5 5.2 5.6 5.2 11.2a5.2 5.2 0 0 1-10.4 0c0-2.6 1.2-4.2 2.6-5.2.2 1.7 1 2.7 2 3.1-.3-3.5.2-6.6.6-9.1z';
  const FLAME_IN = 'M12.1 12.2c.8 1.5 2.6 2.4 2.6 4.4a2.6 2.6 0 0 1-5.2 0c0-1.3.7-2.2 1.3-2.7.2.8.6 1.1 1 1.3-.1-1.2.1-2.2.3-3z';
  const I = {
    flame: F(FLAME, 'var(--flame)') + F(FLAME_IN, 'var(--gold)'),
    croissant: '<path d="M2.5 15.5C2.5 10 6.8 6 12 6s9.5 4 9.5 9.5c-1.6-1-3.2-1.4-4.8-1.2L15 9.6l-1.7 4.3a8 8 0 0 0-2.6 0L9 9.6l-1.7 4.7c-1.6-.2-3.2.2-4.8 1.2z" fill="var(--tan)" stroke="var(--gem)" stroke-width="1.4" stroke-linejoin="round"/>',
    star: F('M12 2.6l2.9 6 6.5.8-4.8 4.5 1.2 6.5L12 17.3l-5.8 3.1 1.2-6.5-4.8-4.5 6.5-.8z', 'var(--gold)'),
    bolt: F('M13.5 2 4.5 13.5h6.8l-1 8.5 9.2-11.8h-7z', 'var(--gold)'),
    ice: '<g style="color:var(--tear)">' + L('M12 2v20M3.3 7l17.4 10M20.7 7 3.3 17M9 3.8l3 2 3-2M9 20.2l3-2 3 2M4 11l2.5 1L4 13M20 11l-2.5 1L20 13') + '</g>',
    gem: F('M6.5 3h11l4.5 6-10 12L2 9z', 'var(--tear)') + '<path d="M2 9h20M9.5 3 7.5 9 12 21l4.5-12-2-6" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="1.2" stroke-linejoin="round"/>',
    heart: F('M12 21s-8.5-5.4-8.5-11.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6C20.5 15.6 12 21 12 21z', 'var(--red)'),
    heartbreak: F('M12 21s-8.5-5.4-8.5-11.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.5 2.6C20.5 15.6 12 21 12 21z', 'var(--red)') + '<path d="M12 7l-1.5 4 3 2-2 4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/>',
    target: C(12, 12, 9) + C(12, 12, 5) + C(12, 12, 1.6, 'currentColor'),
    brain: L('M9 4.5A3 3 0 0 0 6 7.4a3 3 0 0 0-2 5.1 3 3 0 0 0 2 5 3 3 0 0 0 3 2.5h3v-15zM15 4.5a3 3 0 0 1 3 2.9 3 3 0 0 1 2 5.1 3 3 0 0 1-2 5 3 3 0 0 1-3 2.5h-3M9 9.5h1.5M9 14.5h1.5M15 9.5h-1.5M15 14.5h-1.5'),
    timer: C(12, 13.5, 7.5) + L('M12 9.5v4l2.5 2M9.5 2.5h5M12 2.5V6M18.5 6.5l1.5-1.5'),
    grid: '<rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M3 9.5h18M3 15h18M9 4v16'),
    hash: L('M5 9h15M4 15h15M10.5 3.5l-2 17M16 3.5l-2 17'),
    lips: L('M2.5 12c3-4 5.5-5.2 9.5-3.2 4-2 6.5-.8 9.5 3.2-3 4-6 5.8-9.5 5.8S5.5 16 2.5 12zM2.5 12h19'),
    alert: L('M12 3.5 2.5 20h19zM12 10v4.5M12 17.2v.3'),
    map: L('M3 6.5l6-3 6 3 6-3v14l-6 3-6-3-6 3zM9 3.5v14M15 6.5v14'),
    cap: L('M2 9.5l10-5 10 5-10 5zM6 11.5v4.5c3 2.6 9 2.6 12 0v-4.5M22 9.5v5.5'),
    sun: C(12, 12, 4) + L('M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4'),
    moon: L('M20 14.5A8.2 8.2 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'),
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M3 10h18M8 3v4M16 3v4M7.5 14h2M11 14h2M14.5 14h2M7.5 17.5h2'),
    gear: C(12, 12, 3.2) + L('M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1') + C(12, 12, 6.5),
    pen: L('M4 20l4.2-1L19 8.2 15.8 5 5 15.8zM13.8 7l3.2 3.2'),
    megaphone: L('M3 10v4h3.5l8.5 5V5l-8.5 5zM18.5 9a4 4 0 0 1 0 6'),
    tophat: '<rect x="7" y="3.5" width="10" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M2.5 15.5h19M7 11.5h10'),
    palette: L('M12 3a9 9 0 1 0 0 18c1.6 0 2.2-1 2.2-2s-1-1.4-1-2.4 1-1.6 2-1.6h2.3a4.5 4.5 0 0 0 4.5-4.5C22 6.5 17.5 3 12 3z') + C(7.5, 11, 1.3, 'currentColor') + C(10, 7, 1.3, 'currentColor') + C(15, 7, 1.3, 'currentColor'),
    crown: F('M3 8l4.6 4L12 5l4.4 7L21 8l-2 11H5z', 'var(--gold)'),
    steps: '<ellipse cx="8" cy="8" rx="2.6" ry="4" fill="currentColor"/><ellipse cx="16" cy="15" rx="2.6" ry="4" fill="currentColor"/><circle cx="8" cy="14.5" r="1.3" fill="currentColor"/><circle cx="16" cy="21" r="1.3" fill="currentColor"/>',
    sparkle: F('M12 2l2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3z', 'var(--gold)'),
    rocket: L('M12 2.5c4 3 5.2 8 3.2 12.5H8.8C6.8 10.5 8 5.5 12 2.5zM8.8 15l-3 3 .8 3 3-1.8M15.2 15l3 3-.8 3-3-1.8') + C(12, 9, 1.6),
    mountain: L('M2 20 9 7.5l4 6 2.5-3.5L22 20z'),
    chest: '<g class="chest-b"><rect x="3" y="11" width="18" height="10" rx="2" fill="var(--tan)" stroke="var(--gem)" stroke-width="1.5"/><rect x="10.3" y="12.5" width="3.4" height="4" rx="1" fill="var(--gold)" stroke="var(--gem)" stroke-width="1"/></g><g class="chest-l"><path d="M3 11.2C3 7 6.5 4.5 12 4.5S21 7 21 11.2z" fill="var(--gem)" stroke="var(--gem)" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 5.8v5.4M17 5.8v5.4" stroke="var(--gold)" stroke-width="1.6"/></g>',
    gift: '<rect x="3.5" y="9" width="17" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M2.5 9h19M12 9v12M12 9c-1-3-5-5-6-3s3 3 6 3zM12 9c1-3 5-5 6-3s-3 3-6 3z'),
    postcard: '<rect x="2.5" y="5" width="19" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' + '<rect x="15" y="7.5" width="4" height="4.5" rx=".6" fill="currentColor"/>' + L('M5.5 9h6M5.5 12.5h6M5.5 16h10'),
    shield: F('M12 2l8.5 3.2v6.2c0 5.2-3.6 9.2-8.5 10.6-4.9-1.4-8.5-5.4-8.5-10.6V5.2z', 'currentColor'),
    image: '<rect x="3" y="4.5" width="18" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + C(8.5, 9.5, 1.8) + L('M3.5 18l5.5-5.5 4 4 3-3 4.5 4.5'),
    mute: F('M3 9h4l5-4v14l-5-4H3z') + L('M16 9.5l5 5M21 9.5l-5 5'),
    micoff: '<rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor"/>' + L('M5 11a7 7 0 0 0 11.8 5M19 11v.5M12 18v3M3 3l18 18'),
    clipboard: '<rect x="5" y="4.5" width="14" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="2"/>' + '<rect x="8.5" y="2.5" width="7" height="4" rx="1.2" fill="currentColor"/>' + L('M8.5 11h7M8.5 15h5'),
    checkc: C(12, 12, 9.5, 'var(--ok)') + '<path d="M7.5 12.3l3 3 6-6.3" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
    hand: L('M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v7M14 10.5V6a1.5 1.5 0 0 1 3 0v8.5c0 4-2.8 7-6.5 7-3 0-5-1.6-6-4.5l-1.6-4.2a1.5 1.5 0 0 1 2.7-1.3L8 14'),
    people: C(9, 8, 3.5) + C(17, 9, 2.6) + L('M2.5 20c.6-4 3.3-6 6.5-6s5.9 2 6.5 6M15.5 14.2c2.8-.3 5.3 1.3 6 4.8'),
    fork: L('M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 0-3 3-3 7h3v11'),
    house: L('M3 11l9-7 9 7M5 9.5V20h14V9.5M10 20v-5h4v5'),
    shirt: L('M8 3 3 6l2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 0 1-8 0z'),
    city: L('M3 21V9h6v12M9 21V4h8v17M17 21v-9h4v9M2 21h20M12 8h2M12 12h2M12 16h2'),
    clock: C(12, 12, 9) + L('M12 7v5l3.5 2'),
    ball: C(12, 12, 9) + L('M12 7.5l3.8 2.8-1.4 4.4H9.6l-1.4-4.4zM12 3v4.5M15.8 10.3l4.4-1.5M14.4 14.7l2.7 3.8M9.6 14.7l-2.7 3.8M8.2 10.3 3.8 8.8'),
    cloudsun: L('M7 19h9.5a3.8 3.8 0 0 0 .3-7.6 5 5 0 0 0-9.5 1.2A3.2 3.2 0 0 0 7 19zM15 6.5A3.5 3.5 0 0 1 20.5 10M17 2.5v1.5M21.5 6l-1.2.8'),
    plane: L('M2.5 12.5 21 4.5l-5 16-4.5-6zM11.5 14.5l4-4'),
    medkit: '<rect x="3" y="6.5" width="18" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M9 6.5V4h6v2.5M12 10.5v6M9 13.5h6'),
    briefcase: '<rect x="3" y="7.5" width="18" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M8.5 7.5V5h7v2.5M3 13h18'),
    coffee: L('M4 8h13v5.5A6.5 6.5 0 0 1 10.5 20h0A6.5 6.5 0 0 1 4 13.5zM17 10h1.8a2.2 2.2 0 0 1 0 4.4H17M8 2.5v3M12 2.5v3'),
    balloon: L('M12 3a6 6 0 0 1 6 6c0 4-3 7-6 8-3-1-6-4-6-8a6 6 0 0 1 6-6zM11 17h2l-1 1.5zM12 18.5c0 1.5-1.2 2-1.2 3'),
    tree: L('M12 2.5 5 12h4l-3 5h12l-3-5h4zM12 17v4.5'),
    phone: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/>' + L('M11 18.2h2'),
    news: L('M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4'),
    cloud: L('M6 18.5h11a4.5 4.5 0 0 0 .5-9A6 6 0 0 0 6 11.5a3.5 3.5 0 0 0 0 7z'),
    columns: L('M3 9l9-5 9 5M4 9h16M6.5 9v9M10.5 9v9M13.5 9v9M17.5 9v9M3 20.5h18'),
    leaf: L('M5 19.5c0-9 6-14.5 15-14.5 0 9-5.5 15-14.5 15zM5 19.5l8-8'),
    chart: L('M3 3.5v17h17.5M7 15l4-4 3 3 6-7'),
    ballot: L('M4 10.5h16v10H4zM8 10.5V3.5h8v7M10 7h4'),
    flask: L('M9 3h6M10 3v6.2L4.6 18.8A1.5 1.5 0 0 0 6 21h12a1.5 1.5 0 0 0 1.4-2.2L14 9.2V3M7.2 15h9.6'),
    coin: C(12, 12, 9) + L('M12 6.5v11M15 9.2c0-.9-1.3-1.5-3-1.5s-3 .7-3 2 1.3 1.6 3 2 3 .8 3 2-1.3 2-3 2-3-.6-3-1.5'),
    mask: L('M3 6c3 1 6 1 9 0 3 1 6 1 9 0 0 7.5-3.2 12.5-9 13.5C6.2 18.5 3 13.5 3 6zM7 10.5h2.2M14.8 10.5H17M9 15c2 1.2 4 1.2 6 0'),
    scale: L('M12 3v18M7.5 21h9M4 7h16M4 7l-2.5 6a2.5 2.5 0 0 0 5 0zM20 7l-2.5 6a2.5 2.5 0 0 0 5 0z'),
    gavel: L('M14 3.5l6.5 6.5M10.5 7l6.5 6.5M12.3 5.2 6.2 11.3l6.5 6.5 6.1-6.1M9.5 14.5 3 21M13 21h8'),
    bulb: L('M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z'),
    castle: L('M3 21V8h3v3h3V8h2.5v3h3V8h2.5v3H20V8h1v13zM10 21v-4a2 2 0 0 1 4 0v4M2 21h20'),
    handshake: L('M2 11l4-4 4 2 3-2 3.5 1L22 11M6.5 12.5l4.5 4.5c.8.8 2 .8 2.8 0l4.7-4.7M10 15.5l-1.8 1.8M13 16.8l-1.3 1.3'),
    quote: L('M4.5 11.5h4.5v6.5H4.5v-6.5c0-3.4 1.2-5.4 4.5-6.5M15 11.5h4.5v6.5H15v-6.5c0-3.4 1.2-5.4 4.5-6.5'),
    pin: L('M12 21.5s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z') + C(12, 9.5, 2.5),
    smile: C(12, 12, 9) + L('M8 14.5c2.2 2.2 5.8 2.2 8 0M9 9.5v.5M15 9.5v.5'),
    swords: L('M4 4l9 9M20 4l-9 9M4 20l4-4M20 20l-4-4M6.5 17.5l-2-2M17.5 17.5l2-2'),
    book2: L('M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5zM4 20.5A2.5 2.5 0 0 0 6.5 23H20M8.5 7.5h7'),
    music: L('M9 18V5l11-2v13') + C(6.5, 18, 2.5) + C(17.5, 16, 2.5),
    trophy2: F('M7 3h10v5a5 5 0 0 1-10 0z', 'var(--gold)') + L('M7 5H4a3 3 0 0 0 3 4.5M17 5h3a3 3 0 0 1-3 4.5M12 13v4M8 21h8M9.5 17h5'),
    level: F('M12 2l8.5 3.2v6.2c0 5.2-3.6 9.2-8.5 10.6-4.9-1.4-8.5-5.4-8.5-10.6V5.2z', 'var(--acc)') + F('M12 7.2l1.5 3 3.3.5-2.4 2.3.6 3.3L12 14.8l-3 1.5.6-3.3-2.4-2.3 3.3-.5z', '#fff'),
    voice: F('M3 9h4l5-4v14l-5-4H3z') + L('M15.5 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11')
  };
  window.GSI = I;
  window.GSFLAME = [FLAME, FLAME_IN];
  /* Banderas dibujadas (30×20) */
  const FL = {
    fr: '<rect width="10" height="20" fill="#2A49C8"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#E0393E"/>',
    pt: '<rect width="30" height="20" fill="#1F9A50"/><path d="M15 2.6 27 10 15 17.4 3 10z" fill="#F7D21E"/><circle cx="15" cy="10" r="4.3" fill="#203F9E"/><path d="M10.9 9.4c2.6-.7 5.6-.2 8.2 1.3" stroke="#fff" stroke-width=".9" fill="none"/>',
    sv: '<rect width="30" height="20" fill="#1F64B4"/><rect x="9" width="4" height="20" fill="#F9CF2E"/><rect y="8" width="30" height="4" fill="#F9CF2E"/>',
    ru: '<rect width="30" height="7" fill="#fff"/><rect y="6.6" width="30" height="6.8" fill="#2649B8"/><rect y="13.3" width="30" height="6.7" fill="#D7302C"/>'
  };
  window.GSF = id => '<svg class="flag" viewBox="0 0 30 20" aria-hidden="true">' + (FL[id] || '') + '<rect x=".5" y=".5" width="29" height="19" rx="2" fill="none" stroke="rgba(0,0,0,.18)"/></svg>';
  /* Ícono por unidad (mismo orden temático en los cuatro cursos) */
  window.GSUICON = ['hand', 'people', 'fork', 'hash', 'house', 'shirt', 'city', 'clock', 'ball', 'cloudsun', 'gift', 'plane', 'medkit', 'briefcase', 'pen', 'coffee',
    'balloon', 'tree', 'phone', 'heart', 'news', 'cloud', 'quote', 'columns', 'leaf', 'chart', 'palette', 'ballot', 'flask', 'smile', 'coin', 'map',
    'mask', 'scale', 'book2', 'gavel', 'bulb', 'castle', 'handshake', 'music', 'sparkle', 'brain', 'news', 'rocket', 'megaphone', 'pin', 'people', 'trophy2'];
})();
