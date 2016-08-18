Garcom
===

Rerun a command until it returns successfully or a timeout is reached. (Garçom means waiter in Portuguese)

Basic usage
---

Note: Garcom requires node 4+

```shell
npm i -g garcom
garcom <timeout> [<options>] <command>

garcom 60 --message "We didn't make it in time :(" sh my-script.sh && echo "Worth the wait"
```

Options
---

Garcom has one required argument, the number of seconds to wait before timing out `garcom <timeout>`

```shell
--message <string: ''> message to write to stderr on failure (defaults to not writing)
--delay <number: 0.5> number of seconds to wait between runs of the given command
--invert <bool: false> if true, run command until it does _not_ exit succesfully
--silent <bool: false> write stderr and stdout of command to current process
```


Examples
---

```shell
# we are waiting for a server to boot at localhost:80/my-endpoint. It succesfully boots under the 5 second limit
garcom 30 curl localhost:80/my-endpoint && echo 'Our server is now running, lets do something cool!'
Our server is now running, let's do something cool!
echo $?
0

# we are waiting for a server to boot at localhost:80/my-endpoint. It does not succed :(
garcom 30 curl localhost:80/my-endpoint && echo 'Our server is now running, lets do something cool!'
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
