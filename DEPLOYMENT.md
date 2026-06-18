# Society of Commerce GitHub Pages Deployment

## Folder Structure

- `index.html`
- `about.html`
- `chapters.html`
- `events.html`
- `join.html`
- `contact.html`
- `structure.html`
- `documents.html`
- `locations.html`
- `chapter-starting-guide.html`
- `styles.css`
- `script.js`
- `CNAME`

## Deploy to GitHub Pages

1. Push this project to a GitHub repository.
2. In GitHub, open **Settings > Pages**.
3. Set the source to the branch that contains these files, usually `main`.
4. Select the root folder `/`.
5. Save and wait for GitHub Pages to publish the site.

## Connect `societyofcommerce.club`

1. Keep the included `CNAME` file in the repository root.
2. In the domain registrar DNS settings, create the GitHub Pages records:
   - `A` records for the apex domain pointing to GitHub Pages IP addresses.
   - Optional `CNAME` record for `www` pointing to the GitHub Pages hostname.
3. In **Settings > Pages**, enter `societyofcommerce.club` as the custom domain.
4. After DNS verifies, enable **Enforce HTTPS**.

Final DNS values should be verified against GitHub's current Pages documentation before launch.
