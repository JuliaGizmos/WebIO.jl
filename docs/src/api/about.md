# About This Reference

Each section in this reference is divided into three subsections.

### Public API
These are the bits of the WebIO API that are `export`ed and are meant for direct end-user consumption.

### Internal API
These are the bits of the API that are not exported but are also not considered implementation details.
Frequently, libraries that are built on top of WebIO will extend methods like [`WebIO.render`](@ref) which are considered part of the internal API.

### Private API
These are the bits of the API that are considered implementation details.
These pieces of the API may be modified, created, or removed without notice.
They are documented here for completeness only.
