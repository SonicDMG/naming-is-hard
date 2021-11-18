#!/usr/bin/env bash

./dockerbuild.sh
echo 'deleting pod to relaunch the service with a new pull of the image'
k3d image import ghcr.io/sonicdmg/naming-is-hard
echo 'deleting pod to relaunch the service with a new pull of the image'
kubectl delete pod $(kubectl get pods -l app.kubernetes.io/name=naming-is-hard -o custom-columns=NAME:metadata.name --no-headers)
echo 'trying to see if pod restarted'
sleep 20