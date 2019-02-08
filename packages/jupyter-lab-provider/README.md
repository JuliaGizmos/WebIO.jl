## Development Instructions
Frequently, when editing this package, it will be necessary to also edit the
`@webio/webio` package as well. If you just install
`@webio/jupyter-lab-provider`, it will pull in `@webio/webio` from NPM.
Instead, the following will make both packages editable.

```sh
jupyter-labextension link ~/.julia/dev/WebIO/packages/webio/
jupyter-labextension install ~/.julia/dev/WebIO/packages/jupyter-lab-provider 
```
q