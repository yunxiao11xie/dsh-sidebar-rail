window.__ModuleLoader__.load({
  id: 'dsh-sidebar-rail',
  factory() {
    const STYLE_ID = 'dsh-sidebar-rail-style';

    // CSS-module prefix of the shipped sidebar (@deepseek-ai/dsh-client-ui-sidebar,
    // SidebarRoot.module.css). The prefix rotates between DSH builds, so the rule
    // set is emitted once per known prefix; append the next one when DSH bumps.
    const SIDEBAR_PREFIXES = ['csseja_', 'wtg9ga_', 'OgAdAW_'];

    // Width of the icon rail. The brand row, the New Session bar and the footer
    // are indented by the same track so the content column keeps one left edge.
    const ICON_COLUMN_WIDTH = 44;

    function cssForPrefix(P) {
      const scope = `.${P}root:not(.${P}collapsed)`;
      return `
/* ── Icon rail ─────────────────────────────────────────────────────────────
   The scroll viewport is a 3-track grid (4px gutter | content | trailing
   gap); the panel list and the workspace area sit in the content track on
   separate rows. Re-cut the tracks into [icons | sessions] and place both
   blocks side by side on one row, so the panel entries become a vertical icon
   rail and the session list keeps the remaining width. Wide mode only: the
   collapsed rail already is an icon column. */
${scope} .${P}scrollArea {
  grid-template-columns: ${ICON_COLUMN_WIDTH}px minmax(0, 1fr) calc(var(--dsh-sidebar-inline-padding) - 2px) !important;
  grid-template-rows: 8px minmax(0, 1fr) !important;
}
${scope} .${P}scrollArea::before {
  grid-row: 1 !important;
  grid-column: 1 / -1 !important;
}
${scope} .${P}scrollArea::after {
  display: none !important;
}
${scope} .${P}panelList {
  grid-column: 1 !important;
  grid-row: 2 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  gap: 6px !important;
  /* The viewport pulls itself 4px left (its own gutter track); centre the
     rail on that track so the icons sit flush with the sidebar padding. */
  margin: 0 0 0 4px !important;
  padding: 0 !important;
  align-self: start !important;
}
${scope} .${P}regionArea {
  grid-column: 2 !important;
  grid-row: 2 !important;
  min-height: 0 !important;
}
/* Every entry becomes a 36px square button: label hidden, glyph centred. */
${scope} .${P}panelList > .${P}panelEntry {
  flex: none !important;
  width: 36px !important;
  max-width: 36px !important;
  border-inline: 0 !important;
  border-radius: var(--dsw-radius-md) !important;
}
${scope} .${P}panelList .${P}panelRow {
  width: 36px !important;
  height: 36px !important;
  min-height: 36px !important;
  padding: 0 !important;
  border-inline: 0 !important;
  justify-content: center !important;
  gap: 0 !important;
}
${scope} .${P}panelList .${P}panelTitle {
  display: none !important;
}
/* Hover label. Each panel row keeps its title in aria-label, but the shipped
   Tooltip is disabled in wide mode because the label text is normally
   visible. Here the text is hidden, so surface the same attribute as a bubble
   on hover/focus, styled with the shipped tooltip tokens. */
${scope} .${P}panelList .${P}panelRow {
  position: relative !important;
}
${scope} .${P}panelList .${P}panelRow::after {
  content: attr(aria-label);
  position: absolute;
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
  z-index: 60;
  pointer-events: none;
  white-space: nowrap;
  padding: 3px 7px;
  border-radius: var(--dsw-radius-sm, 4px);
  background: var(--dsw-alias-tooltip-bg, rgba(20, 20, 20, 0.92));
  color: var(--dsw-alias-tooltip-label, #fff);
  font-size: 13px;
  line-height: 20px;
  opacity: 0;
  visibility: hidden;
}
${scope} .${P}panelList .${P}panelRow:hover::after,
${scope} .${P}panelList .${P}panelRow:focus-visible::after {
  opacity: 1;
  visibility: visible;
}
/* The unpin pin has no room in a 36px cell; the More menu still unpins. */
${scope} .${P}panelList .${P}panelUnpin {
  display: none !important;
}
/* The More launcher anchors a 288px menu; keep its anchor inside the track. */
${scope} .${P}panelList .${P}moreAnchor {
  width: 36px !important;
  align-items: center !important;
}
/* The rail only re-cuts the scroll viewport. The brand row, the New Session
   bar and the footer sit outside it and would still start at the sidebar's
   left edge; indent them by the same track. The footer's own layout stays
   with the shipped styles and whatever plugin owns a widget there (the
   cost-meter balance panel re-lays the footer itself). */
${scope} > .${P}logoRow,
${scope} > .${P}newSessionRow,
${scope} > .${P}footArea {
  margin-left: ${ICON_COLUMN_WIDTH}px !important;
}
`;
    }

    function css() {
      return SIDEBAR_PREFIXES.map((p) => cssForPrefix(p)).join('\n');
    }

    function installStyles() {
      let el = document.getElementById(STYLE_ID);
      if (!el) {
        el = document.createElement('style');
        el.id = STYLE_ID;
        document.head.appendChild(el);
      }
      el.textContent = css();
    }

    function removeStyles() {
      const el = document.getElementById(STYLE_ID);
      if (el) el.remove();
    }

    return {
      inject: [],
      apply(ctx) {
        installStyles();
        ctx.effect(() => () => removeStyles(), 'sidebar-rail: styles');
      },
    };
  },
});
