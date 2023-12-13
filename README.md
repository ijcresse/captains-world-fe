# Captain's World Frontend
Personal website for the lovely Captain, to post sake (日本酒) reviews and blog posts. Built for use with Captain's World Backend (and DB).
Supports login and authorized endpoints for posting sake.

# Local Setup
Add a .env file setting the VITE_IMAGES_DIR variable.

# Running locally
```
npm i
npm run dev
#be sure to run captains-world-be simultaneously
```

# Deploying to Production
```
npm run build
cp -r dist/* /path/to/deploy/dir
```
