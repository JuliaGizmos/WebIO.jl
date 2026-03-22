module WebIOJSExprExt

import WebIO, JSExpr

WebIO.JSString(js::JSExpr.JSString) = WebIO.JSString(js.s)

end