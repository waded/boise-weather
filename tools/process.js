#!/usr/bin/env node

var split = require('split');

process.stdin.setEncoding('binary'); // ISO-8859

// This is the pipe I use to turn EasyWeather.txt files
// (http://www.proweatherstation.com/easyweather/easyweather.htm)
// into CSV that works in Excel and other agents I'm working on
process.stdin.resume();
process.stdin.pipe(split()).on('data', function(line) {
	line = line.trim();
	if (line.length)
	{
		process.stdout.write(
			line
			// EasyWeather defaults to tab-separated, sometimes I remember to
			// choose comma but sometimes I don't
			.replace(/\t/, ',')

			// Remove degree symbols in the header
			.replace(/°/g, '')

			// Expect an initial "No" column, and remove it beacuse it's not
			// useful. It ends up resetting to 0 when freeing memory on the
			// weather station.
			.replace(/^No,/, '')
			.replace(/^[0-9]*,/, '')

			// EasyWeather uses dd-mm-yyyy. I prefer mm/dd/yyyy.
			.replace(/^([0-9]*)-([0-9]*)-([0-9]*)/, '$2/$1/$3,')

			.concat('\n')
		);
	};
});