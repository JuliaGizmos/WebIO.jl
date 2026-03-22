# Changelog for WebIO.jl

## Unreleased

### Added
- **Optional JSExpr integration**: Support for both old Julia (via `Requires.jl`) and new Julia (via extensions).
  - `src/WebIO.jl`: Conditional `@require` for JSExpr on older Julia versions.
  - `ext/WebIOJSExprExt.jl`: New extension module for Julia 1.9+ providing `WebIO.JSString(::JSExpr.JSString)` conversion.
  - Seamless interop between WebIO and JSExpr string types for consistent RPC serialization.

### Fixed
- **JSON v1.0 compatibility in `showjs`**: Made JavaScript serialization function compatible with both JSON 0.x and 1.x APIs.
  - `src/syntax.jl`: Split `showjs` implementation using `@static if !isdefined(JSON, :Object)` guard.
  - Old JSON API: Uses `JSON.show_json(io, JSEvalSerialization(), x)` with custom serializer.
  - New JSON API: Uses `JSON.json(io, x; pretty, kwargs...)` directly.

- **JSEvalSerialization struct dispatch**: Updated to work with both JSON versions.
  - Old JSON (0.x): `JSEvalSerialization <: JSON.Serializations.CommonSerialization` with `JSON.show_json` methods.
  - New JSON (1.x): `JSEvalSerialization <: JSON.JSONStyle` with `JSON.lower` methods.

- **Blink provider tests robustness**: Reduced flakiness in external URL resource tests.
  - `test/blink-tests.jl`: External URL tests now opt-out via `WEBIO_TEST_EXTERNAL_URLS` environment variable (`false` disables).
  - Local asset loading tests preserved to catch regression in HTML/CSS/JS bundling.

- **Missing HTTP provider methods**: Fixed regression where `show(::HTTP.Response, ...)` and other Mux/HTTP integration methods were inadvertently gated behind incompletely-scoped `@require` blocks.
  - `src/WebIO.jl`: Restored always-active `@require` hooks for Mux, Blink, IJulia, WebSockets providers.
  - JSExpr compatibility fallback now correctly scoped to old-Julia codepath only.

### Changed
- **Provider architecture alignment**: Core provider integration hooks for Mux, Blink, IJulia, and WebSockets are now registered unconditionally on all Julia versions, while JSExpr compatibility remains the only version-specific path.
- **Verbose JSON mode preservation**: `verbose_json[]` reference flag still applied in both JSON 0.x and 1.x code paths for formatted output control.

### Testing
- All WebIO provider tests pass with both JSON 0.x and 1.x.
- Blink provider tests pass with both JSON 0.x, JSExpr 0.5–1.0, and Blink with latest Electron.
- Optional JSExpr interop validated without JSExpr installed (graceful degradation).

### Compatibility
- Updated `Project.toml` to ensure JSON compat range covers 0.18–1.x.
- JSExpr now optional (weakdep) with same ~0.5–1.x range.

