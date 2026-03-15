#!/bin/bash

set -eou pipefail

cd /var/www/prototype.interflux.com
sudo -u interflux bash -lc "git pull"

echo "----------"
echo "✅ Pulled latest production code"
echo "----------"

sudo -u interflux bash -lc "npm run build"

echo "----------"
echo "✅ Build complete"
echo "----------"

sudo systemctl restart prototype.interflux.com

sudo systemctl status prototype.interflux.com

echo "----------"
echo "✅ Daemon restarted"
echo "----------"