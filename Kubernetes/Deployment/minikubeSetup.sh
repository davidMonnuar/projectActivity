#!/bin/sh
kubectl create -f ./MySQL/mysql-pv.yaml
kubectl create -f ./MySQL/mysql-deployment.yaml
kubectl create -f ./Spring/spring-deployment.yaml
kubectl create -f ./Spring/spring-service.yaml
kubectl get services
minikube ip
