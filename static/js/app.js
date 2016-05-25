var MAXROWSCOLS = 256;

function checkNumberInput(event) {
  event.preventDefault();
  var currentValue = event.target.value;

  if (event.charCode === 0 && event.keyCode === 8) currentValue = currentValue.slice(0, -1);
  if (event.charCode >= 48 && event.charCode <= 57) currentValue += event.key;

  if (currentValue > MAXROWSCOLS) currentValue = MAXROWSCOLS;

  event.target.value = currentValue;
}

function buildMap(terrain, cols, rows, hexRadius, points) {
  const width = cols*hexRadius*Math.sqrt(3)-hexRadius;
  const height = rows*1.5*hexRadius+0.5*hexRadius-hexRadius;

  const hexbin = d3.hexbin().radius(hexRadius);

  const svg = d3.select("#map").append("svg")
  	.attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + width + " " + height);

  /////////////////////////////////////////////////////////////////////////
  //////////////////// Draw hexagons and color them ///////////////////////
  /////////////////////////////////////////////////////////////////////////
  var count = 0;
  //Start drawing the hexagons
  svg.append("g")
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", function (d) {
  	  return "M" + d.x + "," + d.y + hexbin.hexagon();
    })
    .attr("data-pointX", function (p) {
      return p.i;
    })
    .attr("data-pointY", function(p) {
      return p.j;
    })
  	.attr("data-terrain", function() {
  		var type = terrain[count];
  		return type;
  	})
    .attr("stroke", function (d,i) {
  		return "#fff";
  	})
    .attr("stroke", "#111")
    .attr("stroke-width", "1px")
    .style("fill", function() {
  		switch (terrain[count]) {
  			case 'water':
  				count++;
  				return 'blue';
  				break;
  			case 'land':
  				count++;
  				return 'green';
  				break;
  			case 'mountain':
  				count++;
  				return 'yellow';
  				break;
  			case 'desert':
  				count++;
  				return 'grey';
  				break;
  			default:
  				count++;
  				return 'red';
  		}
  	})
    .append("title")
    .text(function(p) {
      return p.i + ", " + p.j;
    });
}
