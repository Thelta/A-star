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
    constructor(id, label, source, target, weight)
    {
        this.id = id;
        this.label = label;
        this.source = source;
        this.target = target;
        this.weight = weight;
    }
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