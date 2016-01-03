import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import org.joda.time.DateTime;

@XmlRootElement
public class Job {
	private static Integer count = 0;
	private int id;
	private String text;
	private DateTime timestamp;
	boolean completed;
	
	public Job() {}
	
	public Job(String text) {
		synchronized (Job.count) {
			this.setId(count++);
			this.setText(text);
			this.timestamp = new DateTime();
			this.setCompleted(false);
		}
	}

	public int getId() {
		return id;
	}

	@XmlElement
	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	@XmlElement
	public void setText(String text) {
		this.text = text;
	}

	public boolean isCompleted() {
		setCompleted(timestamp.plusSeconds(10).isBefore(new DateTime()));
		return this.completed;
	}

	@XmlElement
	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
}
