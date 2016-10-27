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
    }
}

function primsAlgorithm(startPoint, nodeEdgeMap)
{
    var nextNode = startPoint;
    var processedNodes = [startPoint];

    var edgeQueue = new buckets.PriorityQueue(function(a,b)
    {
        return b.edge.weight - a.edge.weight;
    });

    for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)
    {
        if(i == nextNode)
        {
            continue;
        }
        edgeQueue.enqueue({source: i,
            edge: this.allNeighborsIndex[nextNode][i][nodeEdgeMap.get({a: nextNode, b: i})]});
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
            for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)
            {
                if(i == nextNode)
                {
                    continue;
                }
                var putEdge = this.allNeighborsIndex[nextNode][i][nodeEdgeMap.get({a: nextNode, b: i})];
                if(!putEdge.marked)
                {
                    edgeQueue.enqueue({source: i, edge: putEdge});
                }
            }
        }        
    }

    var totalEdges = this.edgesArray.length;
    for(i = 0; i < totalEdges; i++)
    {
        this.dropEdge(this.edgesArray[0].id);
    }
    this.read({edges: newEdges});
}

buckets.Queue.prototype.maxSize = 0;
buckets.Queue.prototype.totalDequeue = 0;
buckets.Queue.prototype.informerEnqueue = function()
{
    if(maxSize < buckets.Queue.size())
    {
        maxSize += 1;
    }

    return buckets.Queue.enqueue();
};

buckets.Queue.prototype.informerDequeue = function()
{
    totalDequeue += 1;
    return buckets.Queue.dequeue();
};
