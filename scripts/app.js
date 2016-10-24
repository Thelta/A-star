s = new sigma({
  graph: {
      nodes: [],
      edges: []
  },
  renderer: {
    // IMPORTANT:
    // This works only with the canvas renderer, so the
    // renderer type set as "canvas" is necessary here.
    container: document.getElementById('container'),
    type: 'canvas'
  },
  settings: {
    labelThreshold: 0
  }
});

var nodes = buckets.Dictionary();
while(nodes.size() < 100)
{
    var point = new Point2d(Math.round(Math.random() * 100) , Math.round(Math.random() * 100));
    if(!nodes.containsKey(point))
    {
        var node = new Node(nodes.size(), point, "#f00");
        nodes.set(point, node);
    }
}

s.graph.read({nodes: nodes.values()});
s.refresh();