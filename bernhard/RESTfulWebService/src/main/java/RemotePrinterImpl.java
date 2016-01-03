public class RemotePrinterImpl implements RemotePrinter {
	private Jobs jobs = new Jobs();

	public synchronized int submitJob(String text) {
		Job job = new Job(text);
		jobs.addJob(job);
		return job.getId();
	}

	public boolean isComplete(int id) {
		Job job = jobs.getJob(id);
		return job == null ? false : job.isCompleted();
	}

	public String getPrinterStatus() {
		return jobs.getStatus();
	}

	public Jobs getJobs() {
		return jobs;
	}
}
