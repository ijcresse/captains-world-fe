# Captain's World Frontend
Personal website for the lovely Captain, to post sake (日本酒) reviews and blog posts. Built for use with Captain's World Backend (and DB).
Supports login and authorized endpoints for posting sake.

# Local Setup
Add an env variable named VITE_IMAGES_DIR pointing to your directory of uploaded images, via executing terminal or .env file.
```
npm i
npm run dev
```

# Deploying to Production
Export a VITE_IMAGES_DIR to terminal
```
npm run build
cp -r dist/* /path/to/deploy/dir
```
