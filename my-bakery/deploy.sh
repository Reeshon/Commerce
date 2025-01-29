#!/bin/bash
# Build the project
npm run build

# Navigate into the build output directory
cd dist

# Add .nojekyll to bypass GitHub Page's default behavior
touch .nojekyll

# Stage and commit changes
git add .
git commit -m "Deploy updates"

# Push to gh-pages branch
git push origin gh-pages
