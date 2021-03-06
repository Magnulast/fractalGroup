juliaIterate = function(jul, real,imag, power){
  var iterations = 0;
  var zr = real;
  var zi = imag;
  var zr_next, zi_next, z_pow;
	
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
    z_pow = intPower(zr, zi, power)
    zr_next = z_pow[0] + jul.__.CR;
    zi_next = z_pow[1] + jul.__.CI;
    zr = zr_next;
    zi = zi_next;
    if ( zr > 4 ) return iterations;
    if ( zi > 4 ) return iterations;
  }
  return iterations;
}

var cosh = function(x){
  return (Math.pow(Math.E, x) + Math.pow(Math.E, -x)) / 2;
};

var sinh = function(x){
  return (Math.pow(Math.E, x) - Math.pow(Math.E, -x)) / 2;
};

juliaCosIterate = function(jul, real,imag){
  var iterations = 0;
  var zr = real;
  var zi = imag;
  var zr_next, zi_next, z_pow;
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
    zr_next = Math.sin(real) * cosh(imag) + jul.__.CR;
    zi_next = Math.cos(real) * sinh(imag) + jul.__.CI;
    zr = zr_next;
    zi = zi_next;
    if ( Math.abs(zr) > 4 ) return iterations;
    if ( Math.abs(zi) > 4 ) return iterations;
  }
  return iterations;
}
/*
barnsleysIterate = function(jul, real,imag){
 // var iterations = 0;
  var zr = real;
  var zi = imag;
  var zr_next, zi_next, z_pow;
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
    zr_next = jul.__.CR*(zr - zr/Math.abs(zr))- jul.__.CI*zi;
    zi_next = jul.__.CI*(zr - zr/Math.abs(zr))- jul.__.CR*zi;
    zr = zr_next;
    zi = zi_next;
    if ( zr^2 + zi^2 > 4 ) return iterations;
  }
  return iterations;
}
*/
mandelbrotIterate = function(jul, real, imag, power){
  var iterations = 0;
  var zr = 0;
  var zi = 0;
  var zr_next, zi_next, z_pow;
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
   z_pow = intPower(zr, zi, power);
    zr_next = z_pow[0] + real;
    zi_next = z_pow[1] +imag;
    zr = zr_next;
    zi = zi_next;
    if ( zr > 4 ) return iterations;
    if ( zi > 4 ) return iterations;
  }
  return iterations;
}

tricornIterate = function(jul, real, imag){
  var iterations = 0;
  var zr = 0;
  var zi = 0;
  var zr_next, zi_next, z_pow;
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
    z_pow = intPower(zr, -zi, 2)
    zr_next = z_pow[0] + real;
    zi_next = z_pow[1] +imag;
    zr = zr_next;
    zi = zi_next;
    if ( zr > 4 ) return iterations;
    if ( zi > 4 ) return iterations;
  }
  return iterations;
}

burningShipIterate = function(jul, real, imag){
  var iterations = 0;
  var zr = 0;
  var zi = 0;
  var zr_next, zi_next, z_pow;
  while (true) {
    iterations++;
    if ( iterations > jul.__.maxIter ) return 0;
    z_pow = intPower(Math.abs(zr), Math.abs(zi), 2)
    zr_next = z_pow[0] + real;
    zi_next = z_pow[1] +imag;
    zr = zr_next;
    zi = zi_next;
    if ( zr > 4 ) return iterations;
    if ( zi > 4 ) return iterations;
  }
  return iterations;
}

newtonColor = function(jul, x,y)
{
  var iterations = 0;
  var thresh = jul.__.newtonThresh;
  while(true)
  {
    iterations++;
    var x2 = x*x;
    var x3 = x2*x;
    var x4 = x3*x;
    var x6 = x3*x3;
    var y2 = y*y;
    var y4 = y2*y2;
    var y6 = y2*y4;
    var denom = 4*Math.pow((x2 + y2),3);
    var rtemp = x*(3*y2+y6+x6 +3*x4*y2-x2 +3*x2*y4);
    rtemp /= denom;
    var itemp = y*(3*x2+y6 +3*x2*y4-y2 +x6 + 3*x4*y2);
    itemp /= denom;
    x = x - rtemp;
    y = y - itemp;
    if ( x > 1-thresh && x < 1 + thresh )
      return makeColorString(jul, 255,0,0,iterations);
    if ( x < -1+thresh && x > -1-thresh )
      return makeColorString(jul,0,255,0,iterations);
    if ( y > 1-thresh && y < 1+thresh )
      return makeColorString(jul,0,0,255,iterations);
    if ( y < -1+thresh && y > -1-thresh )
      return makeColorString(jul,255,255,0,iterations);
    if ( iterations >= jul.__.maxIter )
      return "rgb(0,0,0)";
  }
}

makeColorString = function(jul, r,g,b,i)
{
  i /= jul.__.maxIter-20;
  i*=255;
  i *= jul.__.newtonContrast;
  i = Math.floor(i);

  if ( i > 255 ) i = 255;
  if ( i < 0 ) i = 0;
  if(r>0) r-= i;
  if(g>0) g-= i;
  if(b>0) b-= i;
  var str = "rgb(" + r + "," + g + "," + b + ")";
  return str;
}

intPower = function(real, imag, n){
  if(n==0) return [1,0];
  if(n==1) return [real, imag];
  var z2 = multiply(real, imag, real, imag);
  if(n==2) return z2;
  var z3 = multiply(real, imag, z2[0], z2[1]);
  if(n==3) return z3;
  var z4 = multiply(z2[0], z2[1], z2[0], z2[1]);
  if(n==4) return z4;
  var z8 = multiply(z4[0], z4[1], z4[0], z4[1]);
  if(n==8) return z8;
  return z2
}

multiply = function(r1, i1, r2, i2) {
  return [r1*r2 - i1*i2, r1*i2 + i1*r2]
}