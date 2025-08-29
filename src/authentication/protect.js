import { KEY } from "./authenticator.js";

/**
 * @external RouteHandlerMethod
 */

/**
 * @param {RouteHandlerMethod} handler
 * @param {{role: USER_ROLE}} options
 * @return {ReturnType<RouteHandlerMethod>}
 */
export default function protect(handler, options = {}) {
  return function protection(req, res) {
    const user = req[KEY.SECURITY_CONTEXT];
    if (!user) {
      return res.status(401).send();
    }
    if (options.role && options.role !== user.role) {
      return res.status(403).send();
    }
    return handler(req, res);
  };
}
