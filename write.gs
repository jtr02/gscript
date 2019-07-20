function write(args)
  var1=subwrd(args,1)
  ofile1=subwrd(args,2)

      'q file';line=sublin(result,5);  _xe=subwrd(line,3)
      'q file';line=sublin(result,5);  _ye=subwrd(line,6)

 _xs=1
 _ys=1

 y0=_ys;x0=_xs
 y1=_ye;x1=_xe
say ' '_xs ' '_xe ' ' _ys'  '_ye' ' 

'set x '_xs ' '_xe ' '
'set y '_ys ' '_ye ' '

 'define tempvar= 'var1' '

  xx=x0; 
  while(xx<=x1)
    yy=y0;
    while(yy<=y1)

      'set y 'yy
      'set x 'xx
#
      'q dim';line=sublin(result,3);  tlat=subwrd(line,6)
      'q dim';line=sublin(result,2);  tlon=subwrd(line,6)
      'q dim';line=sublin(result,5);  time=subwrd(line,6)

      'd tempvar ';line=sublin(result,1); aaaa=subwrd(line,4)
#
        result=write('ofile.txt',tlon"	"tlat"	"aaaa)
# 


     yy=yy+1
     endwhile


    xx=xx+1
   endwhile
#
#
# tt=tt+12
# endwhile
#
 result=close('ofile.txt')
#
'!mv ofile.txt 'ofile1'.xyz '

