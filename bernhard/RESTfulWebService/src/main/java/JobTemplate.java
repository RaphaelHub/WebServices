import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class JobTemplate {
	private String text;

	public JobTemplate() {}
	
	public JobTemplate(String text) {
		setText(text);
	}
	
	public String getText() {
		return text;
	}

	@XmlElement
	public void setText(String text) {
		this.text = text;
	}
}
