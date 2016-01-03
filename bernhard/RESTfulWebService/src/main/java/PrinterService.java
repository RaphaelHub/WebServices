import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path("/printer/")
public class PrinterService {
	RemotePrinter printer = new RemotePrinterImpl();

	@POST
	@Path("/jobs/")
	@Consumes({ "application/xml", "application/json" })
	@Produces({ "application/xml", "application/json" })
	public Response submitJob(JobTemplate template) {
		int id = printer.submitJob(template.getText());
		Job job = printer.getJobs().getJob(id);
		return Response.ok(job).build();
	}

	@GET
	@Path("/jobs/{id}")
	@Produces({ "application/xml", "application/json" })
	public Response isComplete(@PathParam("id") int id) {
		Job job = printer.getJobs().getJob(id);
		//boolean completed = job.isCompleted();
		return Response.ok(job).build();
	}

	@GET
	@Produces({ "application/xml", "application/json" })
	public Response getPrinterStatus() {
		//String status = printer.getJobs().getStatus();
		return Response.ok(printer.getJobs()).build();
	}
}
