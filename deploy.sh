#!/bin/bash
minikube stop
minikube delete
minikube start --vm-driver=virtualbox

OPS_DIR=$(cd `dirname $0` && pwd)

cd $OPS_DIR/k8s
kubectl create -f pod-mongo.yaml
sleep 5

cd $OPS_DIR/app
eval $(minikube docker-env)
docker build . -t app:0.0.1
sleep 5

cd $OPS_DIR/k8s
kubectl create -f pod_app.yaml
sleep 5

kubectl get all
minikube service app --url
