sigma.classes.graph.addMethod("primsAlgorithm", primsAlgorithm);
sigma.classes.graph.addMethod("getWeight", getWeight);
sigma.classes.graph.addMethod("createRandomEdges", createRandomEdges);
sigma.classes.graph.addMethod("changeWeightRandomly", changeWeightRandomly);
sigma.classes.graph.addMethod("getEdge", getEdge);
sigma.classes.graph.addMethod("aStar", aStar);

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
    labelThreshold: 0,
    edgeColor: "default"   
  }
});

var nodeNo = 100;

var c = document.getElementById("instructions");
var ctx = c.getContext("2d");
ctx.font = "60px Arial";
ctx.fillText("Select starting node",10,50);

var nodes = buckets.Dictionary();
while(nodes.size() < nodeNo)
{
    var point = new Point2d(Math.round(Math.random() * nodeNo) , Math.round(Math.random() * nodeNo));
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
  for(j = i + 1; j < nodeNo; j++)
  {
    nodeEdgeMap.set({a: i, b: j}, edges.length);
    edges.push(new Edge(edges.length, i, j, s.graph.getWeight(i, j)));
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
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.fillText("Select destination node", 10, 50);
      s.refresh()
    }break;
    case 1:
    {
      ctx.clearRect(0, 0, c.width, c.height);
      s.graph.read({edges: edges});
      locations.push(e.data.node);
      e.data.node.color = "#59f442";

      s.graph.primsAlgorithm(e.data.node.id, nodeEdgeMap);

      s.graph.createRandomEdges();

      s.graph.changeWeightRandomly();
      s.graph.aStar(locations[0].id, e.data.node.id);
      s.refresh();
    }break;
  }
}); 


