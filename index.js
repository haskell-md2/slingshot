const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fps = 60
const dt = 1/fps

const w = canvas.width;
const h = canvas.height;


function die(){
    rocks = [];
    // for(let i = 0; i < rocks.length; i++){
    //     rocks[i] = null;
    //     print("rocks")
    // }
    current_rock = new Rock(w/2,h/2,20);
    rocks.push(current_rock);
}



class Slingshot{
    constructor(x,y,r){
        this._x = x;
        this._y = y;
        this._r = r;
    }

    drawItSelf(){
        ctx.beginPath();

       
 
        ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
        ctx.rect(w/2-10, h/2, 15,  h/2 + this._r);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this._x, this._y, this._r-1, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill()
        ctx.fillStyle = "black";

        
    }

    cordsInside(x,y){
        if ((x - this._x )**2 + (y - this._y )**2 <= this._r **2 ){
            return true;
        }
        return false;
    }

    changeR(r){
        this._r = r; 
    }
}


class Rock{
    constructor(x,y,r){

        this._startX = x;
        this._startY = y;

        this._isBlocked = true;

        this._xv = 10; //!!!
        this._yv = 10;
        this._g = 10;

        this._x = x;
        this._y = y;
        this._r = r;
    }

    drawItSelf(){

        this._move();
        this._checkBordersCollision();

        ctx.beginPath();
        ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);
        ctx.fill();

    }


    setX(x){
        this._x = x;
    }

    setY(y){
        this._y = y;
    }

    cordsInside(x,y){
        if ((x - this._x )**2 + (y - this._y )**2 <= this._r **2 ){
            return true;
        }
        return false;
    }

    startMove(){
     
        let k = document.getElementById("k").value;
        

        let dirx = -(this._x - this._startX);
        let diry = -(this._y - this._startY);

        let cos = dirx/ (Math.sqrt( Math.pow(dirx,2) +  Math.pow(diry,2)));
        let sin = (diry/ (Math.sqrt( Math.pow(dirx,2) +  Math.pow(diry,2))));
       
        let v = Math.sqrt( Math.pow(dirx,2) +  Math.pow(diry,2))*this._r/2 *k;
        this._xv = v*cos;
        this._yv = v*sin;
        
        this._isBlocked = false;
    }

    _move(){
        if(!this._isBlocked){
            this._x += this._xv * dt;
            this._y += this._yv * dt;
            this._yv += this._g;
        }
    }

    _checkBordersCollision(){
        if (this._x >= w){
            this._x = w;
            this._xv *= -1;
        }

        if (this._x <= 0){
            this._x = 0;
            this._xv *= -1;
        }

        if (this._y <= 0){
            this._y = 0;
            this._yv *= -1;
        }

        if (this._y >= h){
            this._y = h;
            this._yv *= -1;
        }
    }

    destroy(){

    }
}






let cy = new Slingshot(w/2,h/2,100);
let current_rock = new Rock(w/2,h/2,20);

let rocks = []
rocks.push(current_rock);

let mouseIsDown = false;

canvas.onmousedown = (e)=>{
    
    if (current_rock.cordsInside(e.offsetX,e.offsetY)){
        mouseIsDown = true;
    }
}

canvas.onmousemove = (e)=>{
    if(mouseIsDown){

        if(cy.cordsInside(e.offsetX,e.offsetY)){

            current_rock.setX(e.offsetX);
            current_rock.setY(e.offsetY);
        }else{
          
            current_rock.startMove();
            mouseIsDown = false;

            current_rock = new Rock(w/2,h/2,20);
            rocks.push(current_rock);
        }
    }
}

canvas.onmouseup = (e)=>{
    if(mouseIsDown) {
        current_rock.startMove();
        mouseIsDown = false;

        current_rock = new Rock(w/2,h/2,20);
        rocks.push(current_rock);
    }
}


function changeRad(r){
    cy.changeR(r);
}


function render(){
    ctx.clearRect(0,0,w,h)

    cy.drawItSelf();
    
    rocks.forEach((el)=>{
        el.drawItSelf();
    })
 
}



setInterval(()=>{
    
    render();
},1000*dt)


function print(txt){
    console.log(txt);
}


function clear(){
    print("rocks")
    // for(let i = 0; i < rocks.length; i++){
    //     rocks[i] = null;
    //     print("rocks")
    // }
    // current_rock = new Rock(w/2,h/2,20);
    // rocks.push(current_rock);
}