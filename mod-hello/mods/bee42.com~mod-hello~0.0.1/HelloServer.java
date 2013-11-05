
import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.logging.Logger;

import java.util.Map;

public class HelloServer extends Verticle {

  public void start() {
    vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
      public void handle(HttpServerRequest req) {      	
      	Logger logger = container.logger();
      	logger.info(Thread.currentThread().getId());
      	
        req.response().headers().set("Content-Type", "text/plain");
        req.response().end("Hello World\n");
      }
    }).listen(8080);
  }
}
