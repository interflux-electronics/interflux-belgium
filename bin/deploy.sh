#!/bin/bash

set -eou pipefail

echo "----------"
echo "Deploying ..."
echo "----------"
scp bin/deploy-remote.sh frankfurt:~/
echo "----------"
ssh -t frankfurt "~/deploy-remote.sh"
echo "----------"
echo "Deploy complete ⛵️"
echo "----------"
