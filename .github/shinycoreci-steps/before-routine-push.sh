#!/bin/bash -e
Rscript tools/main.R
git add inst || echo "No distributed files to update"
git commit -m 'Resave data (GitHub Action)' || echo "No distributed file to commit"

# Update `Config/Needs/website` deployment dependencies
Rscript ./.github/shinycoreci-steps/__update_website_deps.R
git commit DESCRIPTION -m 'Update website deps (GitHub Action)' || echo "No new website vignette dependencies to commit"
