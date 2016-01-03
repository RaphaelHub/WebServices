public interface RemotePrinter {
	/**
	 * Submit a new print job.
	 * 
	 * @param text
	 *            the text to be printed
	 * @return the id of the print job.
	 */
	public int submitJob(String text);

	/**
	 * Check the job's completion status.
	 * 
	 * @param id
	 *            the job id
	 * @return <code>true</code> if the job is complete and <code>false</code>
	 *         otherwise.
	 * 
	 * @throws RemoteException
	 *             if a remote exception occurs
	 */
	public boolean isComplete(int id);

	/**
	 * Queries the printer status.
	 * 
	 * @return printer status in a human readable form.
	 * @throws RemoteException
	 *             if a remote exception occurs
	 */
	public String getPrinterStatus();

	public Jobs getJobs();
}
