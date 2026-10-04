# Madison Avenue Motors — Evoque dealership site

A responsive, multi-page dealership site for Madison Avenue Motors, built with plain HTML, CSS and JavaScript. It is designed to help an independent premium-car dealer turn interest in the Range Rover Evoque into test-drive appointments and sales conversations.

The visual identity pairs a warm cognac hero and accent with charcoal panels, soft ivory backgrounds, and high-contrast dark text.

## View the site

Open `index.html` in a browser. There are no build steps or package dependencies. The vehicle imagery and web fonts are loaded from external services and require an internet connection.

Open `inventory.html` to browse and filter Evoque color photography, or `vehicle.html?paint=maroon` to view a color-specific vehicle detail page. Supported colors are `white`, `charcoal`, `maroon`, and `black`. Scroll reveals, gallery image transitions, and responsive color-filter animations use reduced-motion fallbacks when visitors request less motion.

## Site pages

- `index.html` — dealership landing page and enquiry form.
- `inventory.html` — filterable Evoque color gallery linking to vehicle details.
- `vehicle.html?paint=<color>` — color-specific Evoque detail page.

## How it supports the business

- **One clear conversion path:** “Arrange a test drive” and enquiry actions appear throughout the page, connecting product discovery directly to a sales conversation.
- **Higher-quality enquiries:** the form asks what the customer wants (a test drive, vehicle details, finance discussion or part exchange) so a salesperson can respond with context.
- **Less uncertainty before contact:** ownership guidance and a finance-options enquiry help visitors understand what to ask, without presenting an unverified payment offer.
- **More engaging browsing:** visitors can browse white, charcoal, maroon, and black Evoque photos, filter by color, and see sections reveal gently as they scroll.
- **A premium, independent-dealer position:** the editorial layout and personal-service copy differentiate a specialist showroom from a generic classified listing, while the affiliation notice avoids implying an official Land Rover site.
- **Responsive and accessible foundations:** semantic sections, keyboard skip link, labelled form controls, reduced-motion support and a mobile navigation make the concept usable across common devices.

## Before using this for a live dealership

The phone number ((212) 555-0142) and `.example` email address are reserved placeholders, not working business contact details. Replace them and confirm the showroom address before launch. Vehicle photos are from Wikimedia Commons and are credited by photographer, linked source, and CC BY-SA 4.0 license in the footer of every page. The photos do not indicate current inventory; confirm vehicle availability, specifications, and pricing with the dealership.

The enquiry form opens a prefilled email to `sales@madisonavenuemotors.example`; it does not submit to or store data on a server. Before launch, change the recipient in `script.js` and preferably connect the form to the dealership's CRM or a secure server-side lead endpoint. Add consent/privacy wording and an appropriate privacy notice for the market where the site operates.

For a production dealership site, connect a verified vehicle inventory feed, configure analytics and conversion tracking with consent, publish location and opening hours, and test enquiries on mobile and desktop. Keep listings and pricing current so every campaign leads to a vehicle the sales team can actually show.
