# postgres-node

**create a postgres database locally**

    psql
    postgres=# CREATE USER mike WITH PASSWORD 'password';
    postgres=# CREATE DATABASE test OWNER mike;

    -- use database
    \c test

    CREATE TABLE junk (
        name     varchar(40),
        a_number integer
    );
    GRANT ALL PRIVILEGES ON TABLE junk TO mike;

**ensure postgres configured for access**

    -- vi /var/lib/pgsql/data/postgresql.conf
    
    listen_addresses = '*'

    -- allow local login (order matters)
    -- vi /var/lib/pgsql/data/pg_hba.conf
    
    # access from OSE
    host all all 192.168.136.0/24 md5
    # "local" is for Unix domain socket connections only
    local   all             all                                     md5
    local   all             all                                     peer
    # IPv4 local connections:
    host    all             all             127.0.0.1/32            md5
    host    all             all             127.0.0.1/32            ident


**this sample node will connect and populate the test/junk db/table on OpenShift**

    oc new-project postgres-node --description="postgres-node" --display-name="postgres-node"

    oc create -f service.yaml

    oc create -f endpoint.yaml

    oc new-app registry.access.redhat.com/openshift3/nodejs-010-rhel7:latest~https://github.com/eformat/postgres-node

**Successfull run**

    virt:~/git/postgres-node$ oc logs postgres-node-4-ism92
    npm info it worked if it ends with ok
    npm info using npm@1.4.28
    npm info using node@v0.10.40
    npm info prestart test@1.0.0
    npm info start test@1.0.0
    
    > test@1.0.0 start /opt/app-root/src
    > node test.js
    
    connection string:postgres://mike:password@172.30.139.192:5432/test
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 10 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 9 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 8 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 7 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 6 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 5 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 4 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 3 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 2 }
    { name: 'Ted', a_number: 12 }
    { name: 'John', a_number: 1 }
    npm info poststart test@1.0.0
    npm info ok 

