#!/bin/bash -e
Rscript tools/main.R
git commit inst -m 'Resave distributed files (GitHub Action)' || echo "No distributed file to commit"
git commit R/sysdata.rda -m 'Resave data (GitHub Action)' || echo "No updates to R/sysdata.rda"

# Update `Config/Needs/website` deployment dependencies
Rscript ./.github/shinycoreci-steps/__update_website_deps.R
git commit DESCRIPTION -m 'Update website deps (GitHub Action)' || echo "No new website vignette dependencies to commit"
