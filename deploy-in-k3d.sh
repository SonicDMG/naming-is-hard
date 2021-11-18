#!/usr/bin/env bash

echo 'creating k8s cluster'
k3d cluster create
echo 'building docker image'
./dockerbuild.sh
echo 'importing docker image into k8s'
k3d image import ghcr.io/sonicdmg/naming-is-hard
echo 'installing with helm'
helm install naming-is-hard charts/naming-is-hard
echo 'sleeping 10 seconds to give the app enough time to start'
sleep 10