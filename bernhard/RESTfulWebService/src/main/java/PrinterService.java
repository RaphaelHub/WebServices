import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

@Path("/printer/")
@Consumes({ "application/xml", "application/json" })
@Produces({ "application/xml", "application/json" })
public class PrinterService {
	RemotePrinter printer = new RemotePrinterImpl();

	@POST
	@Path("/jobs/")
	public Response submitJob(String text) {
		Job job = null;
		try {
			JAXBContext jaxbJobTemplateContext = JAXBContext.newInstance(JobTemplate.class);
			Unmarshaller jaxbUnmarshaller = jaxbJobTemplateContext.createUnmarshaller();
			ByteArrayInputStream bais = new ByteArrayInputStream(text.getBytes());
			JobTemplate template = (JobTemplate) jaxbUnmarshaller.unmarshal(bais);
			int id = printer.submitJob(template.getText());
			job = printer.getJobs().getJob(id);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Job.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.marshal(job, baos);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return Response.ok(new String(baos.toByteArray())).build();
	}

	@GET
	@Path("/jobs/{id}")
	public Response isComplete(@PathParam("id") int id) {
		Job job = printer.getJobs().getJob(id);
		boolean completed = job.isCompleted();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Job.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.marshal(job, baos);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return Response.ok(new String(baos.toByteArray())).build();
	}

	@GET
	public Response getPrinterStatus() {
		String status = printer.getJobs().getStatus();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance(Jobs.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			jaxbMarshaller.marshal(printer.getJobs(), baos);
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return Response.ok(new String(baos.toByteArray())).build();
	}
}
