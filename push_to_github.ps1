# Set the GitHub repository URL
$remote = "https://github.com/Reeshon/Commerce.git"

# Initialize git repository if it doesn't exist
if (!(Test-Path -Path ".git")) {
    git init
    Write-Host "Initialized a new Git repository."
}

# Add all files to staging
git add .

# Commit changes
$commitMessage = Read-Host "Enter commit message" -Default "Initial commit"
git commit -m "$commitMessage"

# Set remote origin if not set
$existingRemote = git remote -v | Select-String "origin"

if (-not $existingRemote) {
    git remote add origin $remote
    Write-Host "Added remote origin: $remote"
}

# Pull the latest changes from the remote repository
git pull origin main --rebase

# Push to GitHub
git push -u origin main

Write-Host "Files pushed to GitHub successfully."