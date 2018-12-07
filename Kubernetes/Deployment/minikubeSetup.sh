#!/bin/sh
kubectl create -f ./mysql/mysql-pv.yaml
kubectl create -f ./mysql/mysql-deployment.yaml
kubectl create -f ./spring/spring-deployment.yaml
kubectl create -f ./spring/spring-service.yaml
kubectl get services
minikube ip