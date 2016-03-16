# postgres-node

   oc new-project postgres-node --description="postgres-node" --display-name="postgres-node"

   oc create -f service.yaml

   oc create -f endpoint.yaml

   oc new-app registry.access.redhat.com/openshift3/nodejs-010-rhel7:latest~https://github.com/eformat/postgres-node

   
