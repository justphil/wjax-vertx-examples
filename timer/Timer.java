
import org.vertx.java.core.Handler;
import org.vertx.java.platform.Verticle;
import org.vertx.java.core.logging.Logger;

public class Timer extends Verticle {

	public void start() {
		final Logger logger = container.logger();
      	
		long timerID = vertx.setPeriodic(1000, new Handler<Long>() {
		    int count;
		     
		    public void handle(Long timerID) {  
		        logger.info("In event handler " + count + " " + System.nanoTime() + "\n"); 
		        if (++count == 10) {
		            vertx.cancelTimer(timerID);
		        }          
		    }
		});
		logger.info("sleep start\n");
		try { 
			Thread.sleep(10000);
		} catch (Exception ex) {};
		logger.info("sleep stop\n");
	}
}