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
    }
}

function KruskalAlgorithm(sortedEdges)
{
    var newEdges = new Array();
    var nodes = new Array();

    for(i = 0; i < sortedEdges.length; i++)
    {
        var edge = sortedEdges[i];
        if(!(nodes.includes(edge.source) && nodes.includes(edge.target)))
        {
            newEdges.push(edge);
            if(!nodes.includes(edge.source))
            {
                nodes.push(edge.source);
            }
            if(!nodes.includes(edge.target))
            {
                nodes.push(edge.target);
            }
        }
    }

    return newEdges;
}


function primsAlgorithm(startPoint, nodeEdgeMap)
{
    var nextNode = startPoint;
    var processedNodes = [nextNode];
    var edgeQueue = new buckets.PriorityQueue(function(a,b)
    {
        return -a.weight + b.weight;
    });
    for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)
    {
        if(i == nextNode)
        {
            continue;
        }
        edgeQueue.enqueue(this.allNeighborsIndex[nextNode][i][nodeEdgeMap.get({a: nextNode, b: i})]);
    }
    var newEdges = new Array();

    while(!edgeQueue.isEmpty())
    {
        var edge = edgeQueue.dequeue();
        var prevNode = nextNode;
        nextNode = edge.source == nextNode ? edge.target : edge.source;
        if(!processedNodes.includes(nextNode))
        {
            processedNodes.push(nextNode);
            newEdges.push(edge);
            for(i = 0; i < this.allNeighborsCount[nextNode] + 1; i++)
            {
                if(i == nextNode)
                {
                    continue;
                }
                edgeQueue.enqueue(this.allNeighborsIndex[nextNode][i][nodeEdgeMap.get({a: nextNode, b: i})]);
            }
        }        
    }
    this.clear();
    this.read({nodes: nodeArray, edges: newEdges});
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