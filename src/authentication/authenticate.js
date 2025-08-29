import sessionRepository, { KEY as SESSION_KEY } from "./sessionRepository.js";

/**
 * @external RouteHandlerMethod
 */

/**
 * @param {RouteHandlerMethod} handler
 * @param {{role: USER_ROLE}} options
 * @return {ReturnType<RouteHandlerMethod>}
 */
export default function authenticate(handler, options = {}) {
  return async function protection(req, res) {
    const sessionId = req.cookies[SESSION_KEY.SESSION_ID];
    if (!sessionId) {
      return res.status(401).send();
    }

    const user = await sessionRepository.get(sessionId);
    if (!user) {
      return res.status(401).send();
    }
    if (options.role && options.role !== user.role) {
      return res.status(403).send();
    }
    req.user = user;
    return handler(req, res);
  };
}
