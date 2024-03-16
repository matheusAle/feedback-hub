import { Observable } from "@/utils/observable";
import { RouteHandler } from "fastify";

export const createHandleFromObservable = <T>(
  observable: Observable<T>,
): RouteHandler => {
  return (req, reply) => {
    const headers = {
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache,no-transform",

      //cors headers
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    };

    reply.raw.writeHead(200, headers);
    reply.raw.write("\n");

    const subs = observable.subscribe((value) => {
      const event = JSON.stringify(value);
      reply.raw.write(
        ["type: event", "id: " + Date.now(), "data: " + event, ""].join("\n") +
          "\n",
      );
    });

    req.raw.on("close", () => {
      subs();
    });
  };
};
