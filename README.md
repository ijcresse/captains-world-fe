# Captain's World Frontend
Personal website for the lovely Captain, to post sake (日本酒) reviews and blog posts. Built for use with Captain's World Backend (and DB).
Supports login and authorized endpoints for posting sake.

# Local Setup
```
npm i
npm run dev
```

# Deploying to Production
```
#update package.json version on build! important to prevent caching issues!
vite build #automatically ensures NODE_ENV is PROD
cp -r dist/* /path/to/deploy/dir
```
