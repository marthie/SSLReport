# SSLReport for servers
based on the code of [TestSSLServer](http://www.bolet.org/TestSSLServer/) by Thomas Pornin 

## Introduction

SSLReport is fetching public SSL/TLS information by connecting to a given host. Following data is fetched by SSLReport:

* Protocol versions
* Support for compression
* Cipher suites
* Certificates

The public SSL/TLS handshake information and the certificate within the host response is displayed on the system console or on a web interface. The information won't be evaluated by SSLreport but is free for the evaluation by individuals.

## Build SSLReport

SSLReport supports the maven build process. Get the source with git or download it as zip. SSLReport needs the dnsjava library by Brian Wellington. The dnsjava library is not available within maven central. You can download it at `http://dnsjava.org` and then import it to your local maven repository:

```
mvn install:install-file -Dfile=<path-to-file> -DgroupId=org.xbill -DartifactId=dnsjava -Dversion=2.1.7 -Dpackaging=jar
```
SSLReport was tested with dnsjava version 2.1.7.

Next run maven within the SSLReport folder:

```
mvn clean package
```

The maven-assembly plugin is used to make a single execution JAR and is bounded to the *package* lifecycle of maven.

*This code is tested with JDK 1.8u45 and JDK 1.7. Other java versions are untested!*

## Run SSLReport

### Get help

Get help on command line arguments by executing this command:

```
java -jar sslreport-<Version>.jar --help
```

### SSLReport system console

To get a SSL/TLS report output on system console from a given host execute this command:

```
java -jar sslreport-<Version>.jar [--webName|-wn]=<host> [[-p|--port]=<port>]
```

### SSLReport web interface

Start the embedded Jetty server to get access to the web interface by executing:

```
java -jar sslreport-<Version>.jar --server
```

With a http browser you can access the SSLReport web interface by the url: `http://localhost:8080/`
