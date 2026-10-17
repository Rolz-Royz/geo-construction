// Geo Construction LLC — site configuration.
//
// ⚠️  EVERY VALUE BELOW IS A PLACEHOLDER. None of it is confirmed by the owner.
//     Replace it here before launch; script.js pushes these values into the
//     header, hero, service-area CTA, quote form, footer, floating call button
//     and the structured-data block, so this file is the only place to edit.
//
//     index.html carries the same values inline as a no-JS fallback. If you
//     change them here and forget the HTML, the site still shows the right
//     number to visitors, and the console prints a warning on localhost telling
//     you exactly which strings in index.html are now stale.
window.GEO_CONFIG = {
  // Display form, exactly as it should read on screen.
  phone: '(801) 555-0199',
  // Dialable form for tel: links. Digits and a leading +, nothing else.
  tel: '+18015550199',
  email: 'info@geoconstructionutah.com',

  // Flip to false once the owner confirms the real phone and email.
  // While true, the pre-launch warning stays on in local development.
  contactIsPlaceholder: true,

  // Where the quote form posts. Paste a Formspree / Netlify Forms / Web3Forms
  // URL here and the form submits to it, reporting success only when the server
  // actually accepts the request.
  //
  // While this is empty the form NEVER claims the request was received. It
  // validates, then hands the visitor their own filled-in text or email draft
  // so the lead reaches you instead of being silently discarded.
  formEndpoint: ''
};
