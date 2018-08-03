var path, position, max;
var count = 0;
var grow = false;

var raster = new Raster('pankti');
raster.visible = false;
raster.on('load', resetSpiral);

var text = new PointText({
  justification: 'right',
  fontSize: 12,
});

function onFrame(event) {
  if (grow) {
    if (raster.loaded && (view.center - position).length < max) {
      for (var i = 0, l = count / 50 + 1; i < l; i++) {
        growSpiral();
      }
      path.smooth();
    } else {
      grow = false;
    }
  }
}

function growSpiral() {
  count++;
  var vector = new Point({
    angle: count * 5,
    length: count / 100,
  });
  var rot = vector.rotate(90);
  var color = raster.getAverageColor(position + vector / 2);
  var value = color ? (1 - color.gray) * 3.7 : 0;
  rot.length = Math.max(value, 0.2);
  path.add(position + vector - rot);
  path.insert(0, position + vector + rot);
  position += vector;
}

function resetSpiral() {
  grow = true;

  // Transform the raster, so it fills the view:
  raster.fitBounds(view.bounds);

  if (path) path.remove();

  position = view.center;
  count = 0;
  path = new Path({
    fillColor: 'darkslategray',
    closed: false,
  });

  position = view.center;
  max = Math.min(raster.bounds.width, raster.bounds.height) * 0.5;
}

function onResize() {
  if (raster.loaded) resetSpiral();
  text.point = view.bounds.bottomRight - [30, 30];
}

function onKeyDown(event) {
  if (event.key == 'space') {
    path.selected = !path.selected;
  }
}

tool.fixedDistance = 25;

// function onMouseMove(event) {
// 	// Create a circle shaped path with its center point
// 	// at the point in the middle between the current mouse
// 	// position and the position when the last onMouseDrag
// 	// event was fired:
// 	var path = new Path.Circle({
// 		center: event.middlePoint,
// 		radius: 10,
// 	});

// 	// Get the average color of the pixels that fall within
// 	// the shape of the path:
// 	path.fillColor = raster.getAverageColor(path);
// }

// tool.minDistance = 10;
// tool.maxDistance = 45;

