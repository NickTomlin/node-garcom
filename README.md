Garcom
===

Rerun a command until it returns successfully or a timeout is reached. (Garçom means waiter in Portuguese)

Basic usage
---

```shell
npm i -g garcom
garcom <command>
```

Options
---

```shell
--message <string: ''> message to write to stderr on failure (defaults to not writing)
--wait <number: '0.5'> number of seconds to wait, e.g. 5
--delay <number: '5'> number of seconds to wait between runs of the given command
```


Examples
---

```shell
# we are waiting for a server to boot at localhost:80/my-endpoint. It succesfully boots under the 5 second limit
garcom curl localhost:80/my-endpoint && echo 'Our server is now running, lets do something cool!'
Our server is now running, let's do something cool!
echo $?
0

# we are waiting for a server to boot at localhost:80/my-endpoint. It does not succed :(
garcom curl localhost:80/my-endpoint && echo 'Our server is now running, lets do something cool!'
echo $?
1
```

Contributing
---

```shell
# clone repository
npm i
# Hack and add tests
npm t
# Pull request!
```
