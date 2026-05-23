#!/bin/bash

set -eou pipefail

echo "----------"
echo "⛵️ deploying ..."
echo "----------"
scp bin/deploy-remote.sh frankfurt:~/
echo "----------"
echo "✅ scp"
echo "----------"
ssh -t frankfurt "~/deploy-remote.sh"
echo "----------"
echo "✅ deploy complete"
echo "----------"