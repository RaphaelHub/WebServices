import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Jobs {
	private List<Job> jobs = new ArrayList<Job>();
	private String status;

	public Jobs() {
		this.getStatus();
	}

	public void addJob(Job job) {
		jobs.add(job);
	}

	public Job getJob(int id) {
		for (Job job : jobs) {
			if (job.getId() == id) {
				return job;
			}
		}
		return null;
	}

	public String getStatus() {
		int completedJobs = 0;
		for (Job job : jobs) {
			if (job.isCompleted())
				completedJobs++;
		}
		StringBuilder sb = new StringBuilder();
		sb.append("There are ").append(jobs.size()).append(" jobs in the queue, ").append(completedJobs)
				.append(" of which are completed!");
		sb.toString();
		setStatus(sb.toString());
		return status;
	}

	@XmlElement
	public void setStatus(String status) {
		this.status = status;
	}
}
