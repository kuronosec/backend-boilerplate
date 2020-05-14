# IPFS Node

This is a very simple IPFS server, which will provide a secure hash for accessing uploaded files,
this is essentially like a file store bucket, but with P2P capabilities.

### Run

```bash
$ make build-local run
```

This will build the IPFS container, include the config.sh file and then spin up a new instance and map all open ports
to your `localhost` host.
