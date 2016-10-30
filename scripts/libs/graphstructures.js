//nodeların durduğu yeri belirtmektedir.
class Point2d
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    toString()
    {
        return this.x + " " + this.y;
    }
}

class Node
{
    constructor(id, point, color)
    {
        this.id = id;
        this.label = id.toString();
        this.x = point.x;
        this.y = point.y;
        this.color = color;
        this.size = 1;
    }
}

class Edge
{
    constructor(id, source, target, weight)
    {
        this.id = id;
        this.label = Math.round(weight).toString();
        this.source = source;
        this.target = target;
        this.weight = weight;
        this.marked = false;
        this.color = "#000"
    }
}

//Kuyruğa sokma işlemi ile birlikte kuyruğun en büyük halini hesaplar.
function informerEnqueue(object)
{
    if(this.maxSize < this.size())
    {
        this.maxSize++;
    }

    return this.enqueue(object);
};

//Kuyruktan çıkartma işlemiyle beraber toplam kaç tane çıkarma işlemi yaptığını hesaplar. 
 function informerDequeue()
{
    this.totalDequeue += 1;
    return this.dequeue();
};

//iki node belirterek ikisinin edge'ini döndürür.
function getEdge(node1, node2)
{
    for(var edgeId in this.allNeighborsIndex[node1][node2]);
    return this.allNeighborsIndex[node1][node2][edgeId];
}

//İki node arasındaki edgein ağırlığını hesaplar
function getWeight(startNodeId, endNodeId)
{
    var lenX = this.nodes(startNodeId).x - this.nodes(endNodeId).x;
    var lenY = this.nodes(startNodeId).y - this.nodes(endNodeId).y;
    return Math.sqrt(lenY * lenY + lenX * lenX);
}

//Rastgele edge yaratır.
function createRandomEdges()
{
  var newEdges = new Array();
  
  //Yeni edgelerin alabilecek minimum id'yi hesaplar.
  var minId;  
  for(minId in this.edgesIndex);
  minId++;
  
  while(newEdges.length < nodeNo - 1)
  {
    var startNode = Math.round(100 * Math.random() - 0.5) ;
    var endNode = Math.round(100 * Math.random() - 0.5);

    if(startNode != endNode)
    {
      newEdges.push(new Edge(minId + newEdges.length, startNode, endNode, s.graph.getWeight(startNode, endNode)));
    }
  }

  this.read({edges: newEdges});
}

//Edgelerin ağırlıklarını değiştirir.
function changeWeightRandomly()
{
    for(i = 0; i < this.edgesArray.length; i++)
    {
        var randValue = (0.4 * Math.random() + 0.1) + 1;
        var newWeight = this.edgesArray[i].weight * randValue;
        this.edgesArray[i].weight = newWeight;
        this.edgesArray[i].label = Math.round(newWeight).toString();
    }
}

//MST hesaplama için kullanılan prim algoritması fonksiyonu
function primsAlgorithm(startPoint)
{
    var nextNode = startPoint;
    var processedNodes = [startPoint]; //Kullanılmış nodeların saklandığı array.

    var edgeQueue = new buckets.PriorityQueue(function(a,b) //Edgelerin koyulacağı queue
    {
        return b.edge.weight - a.edge.weight;
    });

    //nextNode'un bütün edgelerini queue'e ekler.
    for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)
    {
        if(i == nextNode)
        {
            continue;
        }
        edgeQueue.enqueue({source: i,
            edge: this.getEdge(i, nextNode)});
    }
    var newEdges = new Array();

    while(!edgeQueue.isEmpty())
    {
        var queueObject = edgeQueue.dequeue();
        var edge = queueObject.edge;
        nextNode = queueObject.source;
        if(!processedNodes.includes(nextNode)) 
        {
            processedNodes.push(nextNode);
            newEdges.push(edge);
            edge.marked = true;
            for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)   //Node'un kullanılmamış edgelerini queue'ya koy
            {
                if(i == nextNode)
                {
                    continue;
                }
                var putEdge = this.getEdge(i, nextNode);
                if(!putEdge.marked)
                {
                    edgeQueue.enqueue({source: i, edge: putEdge});
                }
            }
        }        
    }

    //ui'ya yeni edgeleri yükle.
    var totalEdges = this.edgesArray.length;
    for(i = 0; i < totalEdges; i++)
    {
        this.dropEdge(this.edgesArray[0].id);
    }
    this.read({edges: newEdges});
}

function aStar(startNode, endNode)
{
    var t0 = performance.now();
    var pathQueue = new buckets.PriorityQueue(function(a, b)    //pathlerin saklanacağı queue
    {
        return b.fcost - a.fcost;
    });
    pathQueue.maxSize = 0;
    pathQueue.totalDequeue = 0;
    pathQueue.informerDequeue = informerDequeue;
    pathQueue.informerEnqueue = informerEnqueue;

    var nextNode = startNode;
    for(var i in this.allNeighborsIndex[nextNode])  //node'un komşular olan bütün yolları ve o yolların fcostunu hesaplar.
    {
        i = parseInt(i, 10);
        pathQueue.informerEnqueue({
            fcost: this.getWeight(nextNode, i) + this.getWeight(i, endNode),
            nodes: [nextNode, i]
        });
    }

    var queueObject;
    var isFound = false;
    while(!isFound)
    {
        queueObject = pathQueue.informerDequeue();
        nextNode = queueObject.nodes[queueObject.nodes.length - 1];
        for(var i in this.allNeighborsIndex[nextNode])  //node'un komşular olan bütün yolları ve o yolların fcostunu hesaplar.
        {
            i = parseInt(i, 10);
            
            if(queueObject.nodes.includes(i))
            {
                continue;
            }   
            var newNodeArray = queueObject.nodes.slice();
            newNodeArray.push(i);
            pathQueue.informerEnqueue({
                fcost: queueObject.fcost + this.getWeight(i, endNode),
                nodes: newNodeArray
            });
        }
        if(queueObject.nodes.includes(endNode))
        {
            isFound = true;
        }
    }

    var t1 = performance.now();

    for(i = 0; i < queueObject.nodes.length - 1; i++)
    {
        this.nodes(queueObject.nodes[i]).color = "#59f442";
        this.getEdge(queueObject.nodes[i], queueObject.nodes[i + 1]).color = "#59f442";
    }

    return {time: t1 - t0, maxSize: pathQueue.maxSize, totalDequeue: pathQueue.totalDequeue};
}

