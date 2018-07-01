planck.testbed('Race', function(testbed) {
    testbed.y = -20;
  
    var pl = planck, Vec2 = pl.Vec2;
    testbed.background = "#000000";
    var world = new pl.World();
  
    world.setGravity(Vec2(0.0, 0.0));
  
    var ground = world.createBody(Vec2(0.0, 0.0));
  
    var fd = {};
    fd.density = 0.0;
    fd.restitution = 0.4;

    ground.createFixture(pl.Edge(Vec2(-55.0, -10.0), Vec2(-55.0, 50.0)),fd);
    ground.createFixture(pl.Edge(Vec2(55.0, -10.0), Vec2(55.0, 50.0)),fd);
    ground.createFixture(pl.Edge(Vec2(-55.0, 50.0), Vec2(55.0, 50.0)),fd);
    ground.createFixture(pl.Edge(Vec2(-55.0, -10.0), Vec2(55.0, -10.0)),fd);

    var j = -10
    for (var i = -45; i< 55; i = i + 10)
    {
        ground.createFixture(pl.Edge(Vec2(i, -10.0 + j), Vec2(i, 50.0 + j)),fd);
        ground.render = {fill : "#8B4513", stroke : "#A0522D"};
        if (j == 10) j = -10;
        else j = 10; 
    }


    var poly1 = pl.Polygon([Vec2(-1.0,0.0),Vec2(0.0,-2.0),Vec2(0.0,-0.5)]);
    var poly2 = pl.Polygon([Vec2(1.0,0.0),Vec2(0.0,-2.0),Vec2(0.0,-0.5)]);

    var ship1=world.createBody({type:'dynamic',angularDamping:2.0,linearDumping:0.5,position:Vec2(0.0,2.0),angle:Math.PI});
    ship1.createFixture(poly1,2.0);
    ship1.createFixture(poly2,2.0);
    ship1.render = {fill: "#0000ff", stroke: "#0011ff"}
    ship1.setPosition(Vec2(-52,-10));


    var ship2=world.createBody({type:'dynamic',angularDamping:2.0,linearDumping:0.5,position:Vec2(0.0,2.0),angle:Math.PI});
    ship2.createFixture(poly1,2.0);
    ship2.createFixture(poly2,2.0);
    ship2.render = {fill: "#00ff00", stroke: "#00ff55"}
    ship2.setPosition(Vec2(-50,-10));

    for (var i=0;i<100;i++)
    {
        var ball = world.createBody().setDynamic();
        ball.createFixture(pl.Circle(0.5));
        ball.setPosition(Vec2(pl.Math.random(-55,55),pl.Math.random(-10,50)));
        ball.setMassData({mass:1,center:Vec2(),I:1});
        ball.render = {fill: "#ff0000", stroke: "#ff0000"}

    }


    
    testbed.step=function(){
        if (testbed.activeKeys.right && !testbed.activeKeys.left)
        {
            ship1.applyAngularImpulse(-0.1,true);
        }
        else if (!testbed.activeKeys.right && testbed.activeKeys.left)
        {
            ship1.applyAngularImpulse(0.1,true);

        }

        if (testbed.activeKeys.up)
        {
            var f = ship1.getWorldVector(Vec2(0,-1));
            var p = ship1.getWorldPoint(Vec2(0,2));
            ship1.applyLinearImpulse(f,p,true);
            
        }

        if (testbed.activeKeys['J'] && !testbed.activeKeys['G'])
        {
            ship2.applyAngularImpulse(-0.1,true);
        }
        else if (!testbed.activeKeys['J'] && testbed.activeKeys['G'])
        {
            ship2.applyAngularImpulse(0.1,true);

        }

        if (testbed.activeKeys['Y'])
        {
            var f = ship2.getWorldVector(Vec2(0,-1));
            var p = ship2.getWorldPoint(Vec2(0,2));
            ship2.applyLinearImpulse(f,p,true);
            
        }
    };

    return world;
});