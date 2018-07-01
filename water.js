


planck.testbed("Domino",function(testbed)
{
    var pl = planck;
    var Vec2 = pl.Vec2;
    var world = pl.World(Vec2(0,-10));

    var bottom = world.createBody();
    bottom.createFixture(pl.Edge(Vec2(-5,-15),Vec2(5,-15)),0.0);
    var left = world.createBody();
    left.createFixture(pl.Edge(Vec2(-10,10),Vec2(-5,-15)),0.0);
    var right = world.createBody();
    right.createFixture(pl.Edge(Vec2(10,10),Vec2(5,-15)),0.0);

    var h20_particles=1000;

    for (var i = 0;i<h20_particles;i++)
    {
        var part = world.createBody().setDynamic();
        var fd ={};
        fd.friction = 0.0001;
        part.createFixture(pl.Circle(0.1),fd);
        part.setPosition(Vec2(pl.Math.random(-30,30),pl.Math.random(50,200)));
        part.setMassData({mass : 1,center : Vec2(), I:1});
        part.render={fill:"#0000ff", stroke: "#0000ff"};
    }


    return world;
});
