package de.thiemann.ssltest;

import java.io.IOException;
import java.io.InputStream;

/*
 * A custom stream which expects SSL/TLS records (no encryption) and
 * rebuilds the encoded data stream. Incoming records MUST have the expected
 * type (e.g. "handshake"); alert messages are skipped.
 */
public class InputRecord extends InputStream {

	private static final int MAX_RECORD_LEN = 16384;
	private static final int ALERT = 21;
	
	private InputStream in;
	private byte[] buffer = new byte[MAX_RECORD_LEN + 5];
	private int ptr, end;
	private int version;
	private int type;
	private int expectedType;

	InputRecord(InputStream in) {
		this.in = in;
		ptr = 0;
		end = 0;
	}

	void setExpectedType(int expectedType) {
		this.expectedType = expectedType;
	}

	int getVersion() {
		return version;
	}

	private void refill() throws IOException {
		for (;;) {
			Util.readFully(in, buffer, 0, 5);
			type = buffer[0] & 0xFF;
			version = Util.dec16be(buffer, 1);
			end = Util.dec16be(buffer, 3);
			Util.readFully(in, buffer, 0, end);
			ptr = 0;
			if (type != expectedType) {
				if (type == ALERT) {
					/*
					 * We just ignore alert messages.
					 */
					continue;
				}
				throw new IOException("unexpected record type: " + type);
			}
			return;
		}
	}

	public int read() throws IOException {
		while (ptr == end) {
			refill();
		}
		return buffer[ptr++] & 0xFF;
	}

	public int read(byte[] buf, int off, int len) throws IOException {
		while (ptr == end) {
			refill();
		}
		int clen = Math.min(end - ptr, len);
		System.arraycopy(buffer, ptr, buf, off, clen);
		ptr += clen;
		return clen;
	}
}
