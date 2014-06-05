define(['helpers/gl'], function(gl) {

	function createBuffer(vertices, itemSize) {
		buffer = gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		buffer.itemSize = itemSize;
		buffer.numItems = Math.ceil(vertices.length/itemSize);

		return buffer;
	}

	return createBuffer;
});
