import sessionRepository, { KEY as SESSION_KEY } from "./sessionRepository.js";

/**
 * @typedef {UserSession} SecurityContext
 */

/**
 * @readonly
 * @enum {string}
 */
export const KEY = {
  SECURITY_CONTEXT: "user",
};

/**
 * @param {FastifyInstance} fastify
 */
export default function authenticator(fastify) {
  fastify.decorateRequest(KEY.SECURITY_CONTEXT, (req) => {
    const sessionId = req.cookies[SESSION_KEY.SESSION_ID];
    if (!sessionId) {
      return null;
    }

    return sessionRepository.get(sessionId);
  });
}
