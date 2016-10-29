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

var newParagraph = document.createElement('strong');
newParagraph.setAttribute("style", "color: red;");
newParagraph.textContent = "Please click to start node";
document.getElementById("interaction-info").appendChild(newParagraph);

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
for(i = 0; i < 99; i++)
{
  for(j = i + 1; j < nodeNo; j++)
  {
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
      newParagraph.textContent = "Please click to end node";
      s.refresh()
    }break;
    case 1:
    {
      document.getElementById("interaction-info").removeChild(newParagraph);
      s.graph.read({edges: edges});
      locations.push(e.data.node);
      e.data.node.color = "#59f442";

      s.graph.primsAlgorithm(e.data.node.id);

      s.graph.createRandomEdges();

      s.graph.changeWeightRandomly();


      var infoObject = s.graph.aStar(locations[0].id, e.data.node.id);
      s.refresh();

      var maxSizeDocument = document.createElement("p");
      maxSizeDocument.textContent = "Kuyruğun maksimimum büyüklüğü " + infoObject.maxSize;
      var totalDequeueDocument = document.createElement("p");
      totalDequeueDocument.textContent = "Kuyruktan çekilen eleman sayısı " + infoObject.totalDequeue;
      var timeDocument = document.createElement("p");
      timeDocument.textContent = "A*'ın çalışma süresi " + infoObject.time + " saniye";
      document.getElementById("interaction-info").appendChild(maxSizeDocument);
      document.getElementById("interaction-info").appendChild(totalDequeueDocument);
      document.getElementById("interaction-info").appendChild(timeDocument);
    }break;
  }
}); 


