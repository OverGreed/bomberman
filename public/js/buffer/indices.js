define(['helpers/gl'], function(gl) {

	function createBuffer(indices) {
		buffer = gl.createBuffer();

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
		
		buffer.itemSize = 1;
		buffer.numItems = Math.ceil(indices.length);

		return buffer;
	}

	return createBuffer;
});
