function tv(args) 
var=subwrd(args,1)
t1=subwrd(args,2)
t2=subwrd(args,3)
c1=subwrd(args,4)
c2=subwrd(args,5)
cc=subwrd(args,6)

'set x 1'
'set t 't1' 't2'  '
'set ylint 'cc' '
'set vrange 'c1' 'c2' '
*'set grid off'
'set cmark 0'
' set cthick 5'
'd tloop(ave('var',t-2,t+2) ) ' 



