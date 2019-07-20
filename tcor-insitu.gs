function tcor(args) 
var1=subwrd(args,1)
var2=subwrd(args,2)
t1=subwrd(args,3)
t2=subwrd(args,4)


'q file';line=sublin(result,5); xx=subwrd(line,3)
'q file';line=sublin(result,5); yy=subwrd(line,6)

say 'xgrid= 'xx '  ygrid= 'yy

'co'
#'set x -20'
#'set y -20'
#'d 'var1' ';line=sublin(result,5); undef1=subwrd(line,4)
#'d 'var2' ';line=sublin(result,5); undef2=subwrd(line,4)

undef1=undef()
undef2=undef()

say 'undef1= 'undef1 '  undef2= 'undef2


'set fwrite 'var1'-'var2'-tcorr.bin'

yg=1; while (yg <= yy) ; 'set y 'yg

xg=1; while (xg <= xx) ; 'set x 'xg
'co'
'd 'var1' ';line=sublin(result,1); uv1=subwrd(line,4)
'd 'var2' ';line=sublin(result,1); uv2=subwrd(line,4)

say 'ygrid= ' yg ' xgrid= 'xg ' var1= ' uv1 ' var2= 'uv2
if (uv1 != undef1 & uv2 != undef2 )
'fw'
'd tcorr('var1','var2',t='t1',t='t2')'
say cal tcorr
else
'fw'
'd 'undef1' '
say undef
endif

xg=xg+1; endwhile
yg=yg+1; endwhile

'df'
'co'



function undef()
*
* Get undef value from the default .ctl file.
*
'q ctlinfo'
if(result='No Files Open')
return 'unknown'
endif

lines=1
while(1)
lin=sublin(result,lines)
if(subwrd(lin,1)='undef'|subwrd(lin,1)='UNDEF')
return subwrd(lin,2)
endif
lines=lines+1
endwhile


