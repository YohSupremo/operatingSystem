# Windows OS and Server Installation Website

Static HTML website featuring:
- Navigation menu: Home, Windows OS, Windows Server, Activities, About
- Embedded YouTube videos (playable directly in the webpage)
- "Watch on YouTube" buttons for each video
- Description and step-by-step learning notes per video

## Run locally

1. Open the project folder in VS Code.
2. Open `index.html` directly in a browser, or use the VS Code Live Server extension.

## Publish via GitHub Pages

1. Create a new GitHub repository and push this project.
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, set:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (or `master`) and `/ (root)`
4. Save and wait for GitHub Pages to build.
5. Access your site at:
   - `https://<your-github-username>.github.io/<your-repository-name>/`

## Files

- `index.html` – website structure and sections
- `styles.css` – visual design and responsive layout
- `script.js` – video data and dynamic card rendering
