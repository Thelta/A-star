sigma.classes.graph.addMethod("primsAlgorithm", primsAlgorithm);

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

var nodeArray = nodes.values();
var edges = new Array();
var nodeEdgeMap = new buckets.Dictionary(function(object)
{
  return object.a > object.b ? object.b + " " + object.a : object.a + " " + object.b; 
});
for(i = 0; i < 99; i++)
{
  for(j = i + 1; j < 100; j++)
  {
    var lenX = nodeArray[i].x - nodeArray[j].x;
    var lenY = nodeArray[i].y - nodeArray[j].y;
    var weight = Math.sqrt(lenY * lenY + lenX * lenX);
    nodeEdgeMap.set({a: i, b: j}, edges.length);
    edges.push(new Edge(edges.length, i, j, weight));
  }
}


var locations = new Array();
s.bind('clickNode', function(e)
{
  switch(locations.length)
  {
    case 0:
    {
      locations.push(e.data.node);
      e.data.node.color = "#4286f4";
      s.refresh()
    }break;
    case 1:
    {
      s.graph.read({edges: edges});
      locations.push(e.data.node);
      e.data.node.color = "#59f442";

      s.graph.primsAlgorithm(e.data.node.id, nodeEdgeMap);
      s.refresh();
    }break;
  }
}); 