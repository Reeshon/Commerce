# Navigate to the project directory
cd /c:/Users/reesh/Commerce/my-bakery

# Build the project
npm run build

# Stage changes
git add .

# Commit changes
git commit -m "Update Firebase configuration and fix routing"

# Push to gh-pages branch
git checkout gh-pages
git merge main
git push origin gh-pages
