/**
 * Intercepts /.well-known/search for GET, QUERY, POST, HEAD and OPTIONS.
 *
 * Implemented as Nitro middleware (not a TanStack route) so the RFC 10008
 * QUERY method is handled in production and `vite preview`, including on the
 * Vercel preset. The Vite dev server uses a matching plugin in vite.config.ts
 * because Nitro middleware is not registered in `vite dev`.
 */
import { handleAgentSearchRequest, SEARCH_PATH } from "../../src/lib/agent-search";

interface AgentSearchEvent {
  url: URL;
  req: Request;
}

export default async function agentSearchMiddleware(
  event: AgentSearchEvent,
  next: () => unknown | Promise<unknown>,
): Promise<unknown> {
  if (event.url.pathname !== SEARCH_PATH) return next();
  return handleAgentSearchRequest(event.req, event.url);
}
